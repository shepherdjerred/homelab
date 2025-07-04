#!/usr/bin/env bun

import { $ } from "bun";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

/**
 * Entity state mappings - defines which entities should have their state
 * converted from `string` to specific union types
 */
const ENTITY_STATE_MAPPINGS = {
  "vacuum.roomba": ["error", "docked", "charging", "paused", "returning", "cleaning", "idle", "unavailable"],
} as const;

/**
 * Generate types using @digital-alchemy/type-writer
 */
async function generateTypes() {
  console.log("🔄 Generating types with @digital-alchemy/type-writer...");

  try {
    await $`bunx @digital-alchemy/type-writer`;
    console.log("✅ Types generated successfully");
  } catch (error) {
    console.error("❌ Failed to generate types:", error);
    process.exit(1);
  }
}

/**
 * Post-process registry.mts to convert state strings to unions
 */
function postProcessRegistry() {
  console.log("🔄 Post-processing registry.mts...");

  const registryPath = join(process.cwd(), "src/hass/registry.mts");

  try {
    let content = readFileSync(registryPath, "utf-8");

    // Process each entity in the mapping
    for (const [entityId, states] of Object.entries(ENTITY_STATE_MAPPINGS)) {
      const unionType = states.map((state) => `"${state}"`).join(" | ");

      // Create a regex to match the entity definition and replace state: string
      const entityPattern = new RegExp(`("${entityId.replace(/\./g, "\\.")}":\\s*{[^}]*?)state:\\s*string;`, "s");

      const replacement = `$1state: ${unionType};`;

      if (entityPattern.test(content)) {
        content = content.replace(entityPattern, replacement);
        console.log(`✅ Updated state type for ${entityId}`);
      } else {
        console.log(`⚠️  Could not find entity ${entityId} in registry.mts`);
      }
    }

    // Write the updated content back to the file
    writeFileSync(registryPath, content, "utf-8");
    console.log("✅ Registry post-processing completed");
  } catch (error) {
    console.error("❌ Failed to post-process registry:", error);
    process.exit(1);
  }
}

/**
 * Validate that the post-processing worked correctly
 */
function validateProcessing() {
  console.log("🔄 Validating post-processing...");

  const registryPath = join(process.cwd(), "src/hass/registry.mts");

  try {
    const content = readFileSync(registryPath, "utf-8");

    let allValid = true;

    for (const [entityId, states] of Object.entries(ENTITY_STATE_MAPPINGS)) {
      const unionType = states.map((state) => `"${state}"`).join(" | ");
      const expectedPattern = new RegExp(
        `"${entityId.replace(/\./g, "\\.")}":\\s*{[^}]*?state:\\s*${unionType.replace(/[|()]/g, "\\$&")};`,
        "s",
      );

      if (expectedPattern.test(content)) {
        console.log(`✅ ${entityId} state type is correct`);
      } else {
        console.log(`❌ ${entityId} state type validation failed`);
        allValid = false;
      }
    }

    if (allValid) {
      console.log("✅ All validations passed");
    } else {
      console.log("❌ Some validations failed");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Failed to validate processing:", error);
    process.exit(1);
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log("🚀 Starting Home Assistant type generation and post-processing...");

  // Step 1: Generate types
  await generateTypes();

  // Step 2: Post-process registry
  postProcessRegistry();

  // Step 3: Validate processing
  validateProcessing();

  console.log("🎉 Type generation and post-processing completed successfully!");
}

// Execute if run directly
if (import.meta.main) {
  main().catch((error: unknown) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });
}
