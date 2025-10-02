#!/usr/bin/env bun

import { existsSync, readdirSync, statSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";

/**
 * Test Helm chart structure, linting, and template rendering.
 * This script replicates the shell-based Helm testing logic in TypeScript.
 */
async function testHelmChart(): Promise<void> {
  try {
    console.log("🔍 Testing Helm chart...");
    console.log("");

    // Check if packaged chart exists
    console.log("📦 Checking packaged chart...");
    const files = readdirSync(".");
    const tgzFiles = files.filter((file) => file.endsWith(".tgz"));

    if (tgzFiles.length === 0) {
      console.log("❌ No packaged chart found");
      process.exit(1);
    }

    const chartFile = tgzFiles[0];
    console.log(`✅ Packaged chart found: ${chartFile}`);

    // Extract the chart for testing
    console.log("");
    console.log("📦 Extracting chart for testing...");
    execSync(`tar -xzf ${chartFile}`, { stdio: "inherit" });

    // Find the extracted directory (it should be the only directory)
    const entries = readdirSync(".");
    const directories = entries.filter((entry) => {
      const stat = statSync(entry);
      return (
        stat.isDirectory() && entry !== "node_modules" && !entry.startsWith(".")
      );
    });

    if (directories.length === 0) {
      console.log("❌ No extracted directory found!");
      process.exit(1);
    }

    const chartDir = directories[0];
    console.log(`Found extracted directory: ${chartDir}`);
    process.chdir(chartDir);

    // Check if Chart.yaml exists and is valid
    console.log("📋 Validating Chart.yaml...");
    if (!existsSync("Chart.yaml")) {
      console.log("❌ Chart.yaml not found!");
      process.exit(1);
    }
    console.log("✅ Chart.yaml found");

    // Check if chart has templates (CDK8s manifests)
    console.log("📂 Checking templates directory...");
    if (!existsSync("templates")) {
      console.log("❌ Templates directory not found!");
      process.exit(1);
    }

    const templatesDir = "templates";
    const templateFiles = readdirSync(templatesDir).filter(
      (file) => file.endsWith(".yaml") || file.endsWith(".yml"),
    );
    const templateCount = templateFiles.length;
    console.log(`✅ Found ${templateCount} template files`);

    // Run helm lint
    console.log("");
    console.log("🔍 Running helm lint...");
    try {
      execSync("helm lint .", { stdio: "inherit" });
      console.log("✅ Helm lint passed");
    } catch (error) {
      console.log("❌ Helm lint failed");
      process.exit(1);
    }

    // Run helm template to test rendering
    console.log("");
    console.log("🎨 Testing template rendering...");
    try {
      execSync("helm template test-release . > /dev/null", { stdio: "pipe" });
      console.log("✅ Template rendering successful");
    } catch (error) {
      console.log("❌ Template rendering failed");
      process.exit(1);
    }

    console.log("");
    console.log("🎉 All Helm tests passed!");
  } catch (error) {
    console.error("❌ Unexpected error during Helm testing:", error);
    process.exit(1);
  }
}

// Run the test if this script is executed directly
if (import.meta.main) {
  await testHelmChart();
}
