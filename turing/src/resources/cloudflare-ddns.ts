import {
  Deployment,
  Ingress,
  IngressBackend,
  PersistentVolumeAccessMode,
  PersistentVolumeClaim,
  PersistentVolumeMode,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { ApiObject, Chart, JsonPatch, Size } from "npm:cdk8s";

export function createCloudflareDdnsDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "cloudflare-ddns", {
    replicas: 1,
  });

  // TODO: mount config, creds, etc.
  deployment.addContainer({
    image: "timothyjmiller/cloudflare-ddns",
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
  });
}
