import { parseAllDocuments } from "yaml";
import type { ImageRef } from "./types.js";
import { parseImageString } from "./types.js";

/**
 * Extract all container images from a Helm chart by rendering templates
 *
 * Uses `helm template` to render actual K8s manifests and extract ALL images,
 * including those in init containers, sidecars, and CRD specs.
 */
export async function extractAllImages(
  chartName: string,
  registryUrl: string,
  version: string,
  values?: Record<string, unknown>,
): Promise<ImageRef[]> {
  const manifests = await renderHelmTemplate(chartName, registryUrl, version, values);
  const images = extractImagesFromManifests(manifests);
  return deduplicateImages(images);
}

/**
 * Render Helm chart to YAML manifests using helm template
 */
async function renderHelmTemplate(
  chartName: string,
  registryUrl: string,
  version: string,
  values?: Record<string, unknown>,
): Promise<unknown[]> {
  const repoName = `temp-${chartName.replace(/[^a-zA-Z0-9]/g, "-")}-${Date.now()}`;

  try {
    // Add the helm repo
    const addProc = Bun.spawn(["helm", "repo", "add", repoName, registryUrl], {
      stdout: "pipe",
      stderr: "pipe",
    });
    await addProc.exited;

    // Update repo
    const updateProc = Bun.spawn(["helm", "repo", "update", repoName], {
      stdout: "pipe",
      stderr: "pipe",
    });
    await updateProc.exited;

    // Build helm template command
    const templateArgs = [
      "template",
      "release-name",
      `${repoName}/${chartName}`,
      "--version",
      version,
    ];

    // Add values if provided
    if (values) {
      const valuesJson = JSON.stringify(values);
      templateArgs.push("--set-json", valuesJson);
    }

    // Run helm template
    const templateProc = Bun.spawn(["helm", ...templateArgs], {
      stdout: "pipe",
      stderr: "pipe",
    });

    const output = await new Response(templateProc.stdout).text();
    const exitCode = await templateProc.exited;

    if (exitCode !== 0) {
      const stderr = await new Response(templateProc.stderr).text();
      throw new Error(`helm template failed: ${stderr}`);
    }

    // Parse all YAML documents
    const documents = parseAllDocuments(output);
    const manifests: unknown[] = [];

    for (const doc of documents) {
      if (doc.toJS()) {
        manifests.push(doc.toJS());
      }
    }

    return manifests;
  } finally {
    // Clean up repo
    const removeProc = Bun.spawn(["helm", "repo", "remove", repoName], {
      stdout: "pipe",
      stderr: "pipe",
    });
    await removeProc.exited;
  }
}

/**
 * Extract all images from parsed K8s manifests
 */
function extractImagesFromManifests(manifests: unknown[]): ImageRef[] {
  const images: ImageRef[] = [];

  for (const manifest of manifests) {
    if (!manifest || typeof manifest !== "object") continue;

    const obj = manifest as Record<string, unknown>;

    // Extract from standard workload resources
    const kind = obj["kind"] as string | undefined;
    const spec = obj["spec"] as Record<string, unknown> | undefined;

    if (spec) {
      switch (kind) {
        case "Deployment":
        case "StatefulSet":
        case "DaemonSet":
        case "ReplicaSet":
          extractFromPodTemplateSpec(spec["template"], images);
          break;

        case "Job":
          extractFromPodTemplateSpec(spec["template"], images);
          break;

        case "CronJob": {
          const jobTemplate = spec["jobTemplate"] as Record<string, unknown> | undefined;
          if (jobTemplate?.["spec"]) {
            const jobSpec = jobTemplate["spec"] as Record<string, unknown>;
            extractFromPodTemplateSpec(jobSpec["template"], images);
          }
          break;
        }

        case "Pod":
          extractFromPodSpec(spec, images);
          break;

        // CRD-specific patterns
        case "Prometheus":
        case "Alertmanager":
        case "ThanosRuler":
          // Prometheus Operator CRDs have image directly in spec
          extractCRDImage(spec, images);
          break;

        default:
          // Try generic extraction for unknown types
          extractImagesRecursively(spec, images);
      }
    }
  }

  return images;
}

/**
 * Extract images from a PodTemplateSpec
 */
function extractFromPodTemplateSpec(template: unknown, images: ImageRef[]): void {
  if (!template || typeof template !== "object") return;

  const templateObj = template as Record<string, unknown>;
  const spec = templateObj["spec"] as Record<string, unknown> | undefined;

  if (spec) {
    extractFromPodSpec(spec, images);
  }
}

/**
 * Extract images from a PodSpec
 */
function extractFromPodSpec(podSpec: Record<string, unknown>, images: ImageRef[]): void {
  // Main containers
  const containers = podSpec["containers"] as unknown[] | undefined;
  if (Array.isArray(containers)) {
    for (const container of containers) {
      extractContainerImage(container, images);
    }
  }

  // Init containers
  const initContainers = podSpec["initContainers"] as unknown[] | undefined;
  if (Array.isArray(initContainers)) {
    for (const container of initContainers) {
      extractContainerImage(container, images);
    }
  }

  // Ephemeral containers
  const ephemeralContainers = podSpec["ephemeralContainers"] as unknown[] | undefined;
  if (Array.isArray(ephemeralContainers)) {
    for (const container of ephemeralContainers) {
      extractContainerImage(container, images);
    }
  }
}

/**
 * Extract image from a container spec
 */
function extractContainerImage(container: unknown, images: ImageRef[]): void {
  if (!container || typeof container !== "object") return;

  const containerObj = container as Record<string, unknown>;
  const imageStr = containerObj["image"] as string | undefined;

  if (imageStr) {
    const parsed = parseImageString(imageStr);
    if (parsed) {
      images.push(parsed);
    }
  }
}

/**
 * Extract image from Prometheus Operator CRDs
 */
function extractCRDImage(spec: Record<string, unknown>, images: ImageRef[]): void {
  // Direct image field (Prometheus, Alertmanager)
  const image = spec["image"] as string | undefined;
  if (image) {
    const parsed = parseImageString(image);
    if (parsed) {
      images.push(parsed);
    }
  }

  // Thanos sidecar
  const thanos = spec["thanos"] as Record<string, unknown> | undefined;
  if (thanos?.["image"]) {
    const parsed = parseImageString(thanos["image"] as string);
    if (parsed) {
      images.push(parsed);
    }
  }

  // Config reloader
  const configReloader = spec["configReloaderImage"] as string | undefined;
  if (configReloader) {
    const parsed = parseImageString(configReloader);
    if (parsed) {
      images.push(parsed);
    }
  }

  // Containers array (some CRDs have this)
  const containers = spec["containers"] as unknown[] | undefined;
  if (Array.isArray(containers)) {
    for (const container of containers) {
      extractContainerImage(container, images);
    }
  }
}

/**
 * Recursively extract images from any object structure
 * Used as fallback for unknown resource types
 */
function extractImagesRecursively(obj: unknown, images: ImageRef[], depth = 0): void {
  // Prevent infinite recursion
  if (depth > 10) return;

  if (!obj || typeof obj !== "object") return;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      extractImagesRecursively(item, images, depth + 1);
    }
    return;
  }

  const record = obj as Record<string, unknown>;

  // Check for image field
  if (typeof record["image"] === "string") {
    const parsed = parseImageString(record["image"]);
    if (parsed) {
      images.push(parsed);
    }
  }

  // Recurse into nested objects
  for (const value of Object.values(record)) {
    if (value && typeof value === "object") {
      extractImagesRecursively(value, images, depth + 1);
    }
  }
}

/**
 * Deduplicate images by repository and tag
 */
function deduplicateImages(images: ImageRef[]): ImageRef[] {
  const seen = new Map<string, ImageRef>();

  for (const image of images) {
    const key = `${image.registry ?? ""}/${image.repository}:${image.tag}`;
    if (!seen.has(key)) {
      seen.set(key, image);
    }
  }

  return Array.from(seen.values());
}

/**
 * Diff two sets of images to find changes
 */
export function diffImages(
  oldImages: ImageRef[],
  newImages: ImageRef[],
): {
  added: ImageRef[];
  removed: ImageRef[];
  updated: Array<{
    repository: string;
    registry?: string;
    oldTag: string;
    newTag: string;
  }>;
} {
  const oldMap = new Map<string, ImageRef>();
  const newMap = new Map<string, ImageRef>();

  // Key by repository (ignore tag for comparison)
  for (const img of oldImages) {
    const key = `${img.registry ?? ""}/${img.repository}`;
    oldMap.set(key, img);
  }

  for (const img of newImages) {
    const key = `${img.registry ?? ""}/${img.repository}`;
    newMap.set(key, img);
  }

  const added: ImageRef[] = [];
  const removed: ImageRef[] = [];
  const updated: Array<{
    repository: string;
    registry?: string;
    oldTag: string;
    newTag: string;
  }> = [];

  // Find added and updated
  for (const [key, newImg] of newMap) {
    const oldImg = oldMap.get(key);
    if (!oldImg) {
      added.push(newImg);
    } else if (oldImg.tag !== newImg.tag) {
      updated.push({
        repository: newImg.repository,
        registry: newImg.registry,
        oldTag: oldImg.tag,
        newTag: newImg.tag,
      });
    }
  }

  // Find removed
  for (const [key, oldImg] of oldMap) {
    if (!newMap.has(key)) {
      removed.push(oldImg);
    }
  }

  return { added, removed, updated };
}
