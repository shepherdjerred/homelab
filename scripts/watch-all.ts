#!/usr/bin/env bun

import { watch } from "fs";
import { spawn } from "child_process";
import { resolve } from "path";

const PROJECT_ROOT = process.cwd();
const CDK8S_DIR = resolve(PROJECT_ROOT, "src/cdk8s");
const HA_DIR = resolve(PROJECT_ROOT, "src/ha");
const HELM_TYPES_DIR = resolve(PROJECT_ROOT, "src/helm-types");

const debounceTime = 1000; // 1 second debounce

let activeTimeouts = new Map<string, NodeJS.Timeout>();
let activeProcesses = new Set<string>();

console.log("🔍 Watching entire homelab project for changes...");
console.log(`📁 CDK8s: ${CDK8S_DIR}`);
console.log(`📁 Home Assistant: ${HA_DIR}`);
console.log(`📁 Helm Types: ${HELM_TYPES_DIR}`);

interface TaskConfig {
  name: string;
  command: string;
  args: string[];
  cwd: string;
  description: string;
  patterns: RegExp[];
}

const tasks: TaskConfig[] = [
  {
    name: "cdk8s-build",
    command: "bun",
    args: ["run", "build"],
    cwd: CDK8S_DIR,
    description: "Building CDK8s",
    patterns: [/src\/cdk8s\/.*\.(ts|tsx|js|jsx|json)$/]
  },
  {
    name: "cdk8s-lint",
    command: "bun",
    args: ["run", "lint"],
    cwd: CDK8S_DIR,
    description: "Linting CDK8s",
    patterns: [/src\/cdk8s\/.*\.(ts|tsx|js|jsx)$/]
  },
  {
    name: "ha-build",
    command: "bun",
    args: ["run", "build"],
    cwd: HA_DIR,
    description: "Building Home Assistant",
    patterns: [/src\/ha\/.*\.(ts|tsx|js|jsx|json)$/]
  },
  {
    name: "ha-lint",
    command: "bun",
    args: ["run", "lint"],
    cwd: HA_DIR,
    description: "Linting Home Assistant",
    patterns: [/src\/ha\/.*\.(ts|tsx|js|jsx)$/]
  },
  {
    name: "helm-types-generate",
    command: "bun",
    args: ["run", "generate"],
    cwd: HELM_TYPES_DIR,
    description: "Generating Helm types",
    patterns: [/src\/helm-types\/.*\.(ts|tsx|js|jsx)$/, /src\/versions\.ts$/]
  },
  {
    name: "helm-validate",
    command: "/home/linuxbrew/.linuxbrew/bin/dagger",
    args: ["call", "test-helm"],
    cwd: PROJECT_ROOT,
    description: "Validating Helm chart",
    patterns: [/src\/cdk8s\/.*\.(ts|tsx|js|jsx|json)$/] // Helm depends on CDK8s output
  }
];

function runTask(task: TaskConfig) {
  if (activeProcesses.has(task.name)) {
    console.log(`⏳ ${task.description} already in progress, skipping...`);
    return;
  }

  activeProcesses.add(task.name);
  console.log(`🔨 ${task.description}...`);

  const process = spawn(task.command, task.args, {
    cwd: task.cwd,
    stdio: "inherit",
  });

  process.on("close", (code) => {
    activeProcesses.delete(task.name);
    if (code === 0) {
      console.log(`✅ ${task.description} completed successfully`);
    } else {
      console.log(`❌ ${task.description} failed with exit code ${code}`);
    }
    console.log("👀 Waiting for changes...");
  });

  process.on("error", (error) => {
    activeProcesses.delete(task.name);
    console.error(`❌ Failed to start ${task.description}:`, error);
    console.log("👀 Waiting for changes...");
  });
}

function scheduleTask(task: TaskConfig, filename: string) {
  const timeoutKey = `${task.name}-${filename}`;

  // Clear existing timeout for this task/file combo
  if (activeTimeouts.has(timeoutKey)) {
    clearTimeout(activeTimeouts.get(timeoutKey)!);
  }

  const timeout = setTimeout(() => {
    runTask(task);
    activeTimeouts.delete(timeoutKey);
  }, debounceTime);

  activeTimeouts.set(timeoutKey, timeout);
}

function handleFileChange(eventType: string, filename: string) {
  if (!filename) return;

  const fullPath = resolve(PROJECT_ROOT, filename);

  // Ignore certain files/directories globally
  const ignoredPatterns = [
    /node_modules/,
    /\.git/,
    /dist/,
    /build/,
    /\.cache/,
    /\.DS_Store/,
    /thumbs\.db/,
    /\.log$/,
    /\.lock$/,
    /\.vscode/,
    /\.dagger/
  ];

  const shouldIgnore = ignoredPatterns.some(pattern =>
    pattern.test(filename)
  );

  if (shouldIgnore) return;

  console.log(`📝 File ${eventType}: ${filename}`);

  // Check which tasks should run for this file
  for (const task of tasks) {
    const shouldRun = task.patterns.some(pattern => pattern.test(filename));
    if (shouldRun) {
      console.log(`   ⚡ Scheduling: ${task.description}`);
      scheduleTask(task, filename);
    }
  }
}

// Watch the entire project directory
const watcher = watch(
  PROJECT_ROOT,
  { recursive: true },
  handleFileChange
);

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Stopping all watchers...");
  watcher.close();

  // Clear all timeouts
  for (const timeout of activeTimeouts.values()) {
    clearTimeout(timeout);
  }
  activeTimeouts.clear();

  // Note: We can't easily kill the active processes here,
  // but they should finish naturally

  process.exit(0);
});

console.log("👀 Watching for changes... (Press Ctrl+C to stop)");
console.log("🚀 Available tasks:");
for (const task of tasks) {
  console.log(`   • ${task.description} (${task.name})`);
}
