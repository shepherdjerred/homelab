#!/usr/bin/env bun

import { watch } from "fs";
import { spawn } from "child_process";
import { resolve } from "path";

const PROJECT_ROOT = process.cwd();
const CDK8S_DIR = resolve(PROJECT_ROOT, "src/cdk8s");
const debounceTime = 2000; // 2 seconds debounce for helm validation (slower)

let validateTimeout: NodeJS.Timeout | null = null;
let isValidating = false;

console.log("🔍 Watching for changes that affect Helm chart...");
console.log(`📁 Watching CDK8s directory: ${CDK8S_DIR}`);

function runHelmValidation() {
  if (isValidating) {
    console.log("⏳ Helm validation already in progress, skipping...");
    return;
  }

  isValidating = true;
  console.log("🔨 Building CDK8s first...");

  // First build the CDK8s project
  const buildProcess = spawn("bun", ["run", "build"], {
    cwd: CDK8S_DIR,
    stdio: "inherit",
  });

  buildProcess.on("close", (buildCode) => {
    if (buildCode !== 0) {
      isValidating = false;
      console.log(`❌ CDK8s build failed with exit code ${buildCode}, skipping helm validation`);
      console.log("👀 Waiting for changes...");
      return;
    }

    console.log("✅ CDK8s build completed, running Helm validation...");

    // Then run helm validation
    const helmProcess = spawn("/home/linuxbrew/.linuxbrew/bin/dagger", ["call", "test-helm"], {
      cwd: PROJECT_ROOT,
      stdio: "inherit",
    });

    helmProcess.on("close", (helmCode) => {
      isValidating = false;
      if (helmCode === 0) {
        console.log("✅ Helm chart validation completed successfully");
      } else {
        console.log(`❌ Helm chart validation failed with exit code ${helmCode}`);
      }
      console.log("👀 Waiting for changes...");
    });

    helmProcess.on("error", (error) => {
      isValidating = false;
      console.error("❌ Failed to start Helm validation process:", error);
      console.log("👀 Waiting for changes...");
    });
  });

  buildProcess.on("error", (error) => {
    isValidating = false;
    console.error("❌ Failed to start build process:", error);
    console.log("👀 Waiting for changes...");
  });
}

function debouncedValidation() {
  if (validateTimeout) {
    clearTimeout(validateTimeout);
  }

  validateTimeout = setTimeout(() => {
    runHelmValidation();
  }, debounceTime);
}

// Watch the CDK8s source directory (since helm chart depends on CDK8s output)
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

    // Only trigger on TypeScript files and configuration files
    if (!/\.(ts|tsx|js|jsx|json|yaml|yml)$/.test(filename)) return;

    console.log(`📝 CDK8s file ${eventType}: ${filename}`);
    debouncedValidation();
  }
);

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Stopping Helm watcher...");
  watcher.close();
  if (validateTimeout) {
    clearTimeout(validateTimeout);
  }
  process.exit(0);
});

console.log("👀 Watching for changes... (Press Ctrl+C to stop)");
