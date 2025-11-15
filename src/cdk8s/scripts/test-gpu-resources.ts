#!/usr/bin/env bun

const YAML_FILE = "dist/torvalds.k8s.yaml";
const EXPECTED_VALUE = 1;

// Services that should have Intel GPU resources
const GPU_SERVICES = ["plex", "pokemon"];

async function testGpuResources() {
  console.log("🧪 Testing Intel GPU resource allocation...");

  try {
    // Build first
    console.log("🔨 Building YAML files...");
    const buildProcess = Bun.spawn(["bun", "run", "build"], {
      cwd: process.cwd(),
      stdio: ["inherit", "inherit", "inherit"],
    });
    const buildStatus = await buildProcess.exited;
    if (buildStatus !== 0) {
      console.error(`❌ Build failed with exit code ${buildStatus.toString()}`);
      process.exit(1);
    }
    console.log("✅ Build completed\n");

    const file = Bun.file(YAML_FILE);
    // Check if file exists using Bun API
    if (!(await file.exists())) {
      console.error(`❌ File ${YAML_FILE} does not exist after build.`);
      process.exit(1);
    }
    const content = await file.text();

    let errors = 0;
    let successes = 0;

    // Find all Intel GPU resource references
    const gpuResourcePattern = /gpu\.intel\.com\/i915:\s*(.+)/g;
    const matches = [...content.matchAll(gpuResourcePattern)];

    if (matches.length === 0) {
      console.error("❌ No Intel GPU resources found in the generated YAML");
      errors++;
    } else {
      console.log(`📊 Found ${matches.length.toString()} Intel GPU resource(s)`);

      for (const match of matches) {
        if (!match[1]) {
          throw new Error(`No match found for ${match.toString()}`);
        }
        const value = match[1].trim();
        const lineNumber = content.substring(0, match.index).split("\n").length;

        if (value === EXPECTED_VALUE.toString()) {
          console.log(`✅ Line ${lineNumber.toString()}: gpu.intel.com/i915: ${value} (correct)`);
          successes++;
        } else {
          console.error(
            `❌ Line ${lineNumber.toString()}: gpu.intel.com/i915: ${value} (should be ${EXPECTED_VALUE.toString()})`,
          );
          errors++;
        }
      }
    }

    // Check for specific services
    for (const service of GPU_SERVICES) {
      const servicePattern = new RegExp(`name: torvalds-${service}[\\s\\S]*?gpu\\.intel\\.com\\/i915:\\s*(.+?)`, "g");
      const serviceMatch = servicePattern.exec(content);

      if (serviceMatch?.[1]) {
        const value = serviceMatch[1].trim();
        if (value === EXPECTED_VALUE.toString()) {
          console.log(`✅ Service ${service}: Intel GPU correctly set to ${value}`);
        } else {
          console.error(`❌ Service ${service}: Intel GPU incorrectly set to ${value}`);
          errors++;
        }
      } else {
        console.error(`❌ Service ${service}: Intel GPU resource not found`);
        errors++;
      }
    }

    // Check for problematic patterns
    const problematicPatterns = [
      /gpu\.intel\.com\/i915:\s*null/g,
      /gpu\.intel\.com\/i915:\s*0\s*$/g,
      /gpu\.intel\.com\/i915:\s*'0'/g,
      /gpu\.intel\.com\/i915:\s*"0"/g,
    ];

    for (const pattern of problematicPatterns) {
      const matches = [...content.matchAll(pattern)];
      if (matches.length > 0) {
        console.error(`❌ Found ${matches.length.toString()} problematic pattern(s): ${pattern.source}`);
        errors++;
      }
    }

    console.log(`\n📈 Results: ${successes.toString()} successes, ${errors.toString()} errors`);

    if (errors > 0) {
      console.error("❌ GPU resource test failed!");
      process.exit(1);
    } else {
      console.log("✅ All GPU resource tests passed!");
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

await testGpuResources();
