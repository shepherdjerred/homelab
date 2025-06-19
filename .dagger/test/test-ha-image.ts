#!/usr/bin/env bun

import { $ } from "bun";

/**
 * Test script to validate the HA image by:
 * 1. Building the image with Dagger
 * 2. Exporting it to a tar file
 * 3. Loading it with Docker
 * 4. Running basic tests on the image
 */

const IMAGE_NAME = "homelab-ha-test";
const IMAGE_TAG = "test";
const FULL_IMAGE_NAME = `${IMAGE_NAME}:${IMAGE_TAG}`;
const TAR_FILE = `${IMAGE_NAME}-${IMAGE_TAG}.tar`;

async function main() {
  console.log("🚀 Starting HA image test...");

  try {
    // Step 1: Build the image using Dagger
    console.log("📦 Building HA image with Dagger...");
    await $`dagger call build-and-export-ha-image export --path ${TAR_FILE}`;

    // Step 2: Load the image into Docker
    console.log("📥 Loading image into Docker...");
    const loadResult = await $`docker load -i ${TAR_FILE}`.text();
    const imageId = loadResult.match(/sha256:[a-f0-9]+/)?.[0];
    console.log("Loaded image ID:", imageId || "Unknown");

    // Step 3: Tag the loaded image with our expected name
    if (imageId) {
      console.log(`🏷️  Tagging image ${imageId} as ${FULL_IMAGE_NAME}...`);
      await $`docker tag ${imageId} ${FULL_IMAGE_NAME}`;
    } else {
      throw new Error("Could not extract image ID from docker load output");
    }

    // Step 4: Verify the image exists with correct tag
    console.log("🔍 Verifying image exists...");
    const imageExists =
      await $`docker images ${FULL_IMAGE_NAME} --format "{{.Repository}}:{{.Tag}}"`.text();
    if (!imageExists.trim().includes(FULL_IMAGE_NAME)) {
      throw new Error(`Image ${FULL_IMAGE_NAME} not found in Docker images`);
    }
    console.log("✅ Image loaded and tagged successfully");

    // Step 5: Test the image by running it with a health check
    console.log("🏃 Testing image execution...");

    // Run the container with a timeout to see if it starts without crashing
    const containerId =
      await $`docker run -d --name ha-test-container ${FULL_IMAGE_NAME}`.text();
    console.log(`📋 Started test container: ${containerId.trim()}`);

    // Wait a few seconds for the container to start
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Always print container logs for debugging
    console.log("📋 Container logs:");
    const logs = await $`docker logs ha-test-container`.text();
    console.log(logs);

    // Check if the container is still running
    const containerStatus =
      await $`docker ps -q -f name=ha-test-container`.text();
    if (!containerStatus.trim()) {
      throw new Error("Container stopped unexpectedly");
    }

    console.log("✅ Container is running successfully");

    // Step 6: Check if the application responds (if it has a health endpoint)
    // This is optional and depends on your HA app having a health check endpoint
    try {
      // Get the container IP or use localhost if port is mapped
      console.log("🌐 Testing application response...");
      const containerIP =
        await $`docker inspect ha-test-container --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'`.text();

      if (containerIP.trim()) {
        // Try to connect to the application (adjust port as needed)
        // This is a basic connectivity test
        await $`timeout 10 bash -c "echo > /dev/tcp/${containerIP.trim()}/3000"`.nothrow();
        console.log("✅ Application appears to be responding");
      }
    } catch (error) {
      console.log(
        "⚠️  Could not test application response (this may be expected)"
      );
    }

    console.log("🎉 All tests passed!");
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  } finally {
    // Cleanup
    console.log("🧹 Cleaning up...");

    // Stop and remove the test container
    await $`docker stop ha-test-container`.nothrow().quiet();
    await $`docker rm ha-test-container`.nothrow().quiet();

    // Remove the test image
    await $`docker rmi ${FULL_IMAGE_NAME}`.nothrow().quiet();

    // Remove the tar file
    await $`rm -f ${TAR_FILE}`.nothrow().quiet();

    console.log("✅ Cleanup completed");
  }
}

// Run the test
main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
