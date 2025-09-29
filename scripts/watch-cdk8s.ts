#!/usr/bin/env bun

import { watch } from "fs";
import { spawn } from "child_process";
import { resolve } from "path";

const CDK8S_DIR = resolve(process.cwd(), "src/cdk8s");
const debounceTime = 1000; // 1 second debounce

let buildTimeout: NodeJS.Timeout | null = null;
let isBuilding = false;

console.log("🔍 Watching for CDK8s file changes...");
console.log(`📁 Watching directory: ${CDK8S_DIR}`);

function runBuild() {
  if (isBuilding) {
    console.log("⏳ Build already in progress, skipping...");
    return;
  }

  isBuilding = true;
  console.log("🔨 Building CDK8s project...");

  const buildProcess = spawn("bun", ["run", "build"], {
    cwd: CDK8S_DIR,
    stdio: "inherit",
  });

  buildProcess.on("close", (code) => {
    isBuilding = false;
    if (code === 0) {
      console.log("✅ CDK8s build completed successfully");
    } else {
      console.log(`❌ CDK8s build failed with exit code ${code}`);
    }
    console.log("👀 Waiting for changes...");
  });

  buildProcess.on("error", (error) => {
    isBuilding = false;
    console.error("❌ Failed to start build process:", error);
    console.log("👀 Waiting for changes...");
  });
}

function debouncedBuild() {
  if (buildTimeout) {
    clearTimeout(buildTimeout);
  }

  buildTimeout = setTimeout(() => {
    runBuild();
  }, debounceTime);
}

// Watch the CDK8s source directory
const watcher = watch(
  CDK8S_DIR,
  { recursive: true },
  (eventType, filename) => {
    if (!filename) return;

    // Ignore certain files/directories
    const ignoredPatterns = [
      /node_modules/,
      /\.git/,
      /dist/,
      /build/,
      /\.cache/,
      /\.DS_Store/,
      /thumbs\.db/,
      /\.log$/,
      /\.lock$/
    ];

    const shouldIgnore = ignoredPatterns.some(pattern =>
      pattern.test(filename)
    );

    if (shouldIgnore) return;

    console.log(`📝 File ${eventType}: ${filename}`);
    debouncedBuild();
  }
);

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Stopping file watcher...");
  watcher.close();
  if (buildTimeout) {
    clearTimeout(buildTimeout);
  }
  process.exit(0);
});

console.log("👀 Watching for changes... (Press Ctrl+C to stop)");
