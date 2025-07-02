#!/usr/bin/env -S bun

import { readFile } from "fs/promises";
import cdk8sVersions from "../../src/cdk8s/src/versions";
import daggerVersions from "../src/versions";

/**
 * Test script to validate that versions.ts files have properly formatted
 * Renovate comments that match the custom manager regex pattern.
 *
 * This ensures all managed dependencies will be detected by Renovate.
 */

async function getRenovateRegexes(): Promise<RegExp[]> {
  const renovateConfig = JSON.parse(await readFile("renovate.json", "utf-8"));
  const customManagers = renovateConfig.customManagers || [];

  for (const manager of customManagers) {
    if (manager.description === "Update versions.ts" && manager.matchStrings) {
      return manager.matchStrings.map(
        (regexString: string) => new RegExp(regexString, "g")
      );
    }
  }

  throw new Error(
    "Could not find versions.ts custom manager regex in renovate.json"
  );
}

// Pattern that indicates a dependency is intentionally not managed by Renovate
const EXCLUSION_COMMENT_PATTERN = "not managed by renovate";

interface VersionEntry {
  file: string;
  line: number;
  property: string;
  value: string;
  hasRenovateComment: boolean;
  renovateComment?: string;
  matchesRegex: boolean;
  isExcluded: boolean;
  exclusionReason?: string;
}

async function parseVersionsFile(
  filePath: string,
  renovateRegexes: RegExp[]
): Promise<VersionEntry[]> {
  const content = await readFile(filePath, "utf-8");
  const lines = content.split("\n");
  const entries: VersionEntry[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Match single-line property definitions: "property": "value" or property: "value" (including empty strings)
    const quotedMatch = line.match(/^"(.+?)":\s*"(.*?)",?$/);
    const unquotedMatch = line.match(/^([a-zA-Z0-9_/-]+):\s*"(.*?)",?$/);

    // Match multi-line property definitions: property: (without value on same line)
    const multiLineMatch = line.match(/^([a-zA-Z0-9_/".-]+):\s*$/);

    let property = "";
    let value = "";
    let propertyLine = i;

    if (quotedMatch || unquotedMatch) {
      // Single-line format
      const propertyMatch = quotedMatch || unquotedMatch;
      if (propertyMatch) {
        [, property, value] = propertyMatch;
      }
    } else if (multiLineMatch) {
      // Multi-line format - property name on this line, value on next line(s)
      property = multiLineMatch[1];

      // Look for the value on the next few lines
      for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
        const valueLine = lines[j].trim();
        const valueMatch = valueLine.match(/^"(.*?)",?$/);
        if (valueMatch) {
          value = valueMatch[1];
          break;
        }
      }

      if (!value) continue; // Skip if we couldn't find the value
    } else {
      continue; // Skip lines that don't match any property format
    }

    // Look for renovate comment or exclusion comment in previous lines (up to 3 lines back)
    // Iterate backwards to prioritize the closest comment to the property
    let renovateComment = "";
    let hasRenovateComment = false;
    let isExcluded = false;
    let exclusionReason = "";

    for (let j = propertyLine - 1; j >= Math.max(0, propertyLine - 3); j--) {
      const prevLine = lines[j].trim();
      if (prevLine.includes("// renovate:")) {
        renovateComment = prevLine;
        hasRenovateComment = true;
        break; // Found closest renovate comment
      }

      // Check for exclusion pattern
      if (prevLine.includes(EXCLUSION_COMMENT_PATTERN)) {
        isExcluded = true;
        exclusionReason = EXCLUSION_COMMENT_PATTERN;
        break; // Found closest exclusion comment
      }
    }

    // Test if the combination matches any of the regexes
    let matchesRegex = false;
    if (hasRenovateComment) {
      const testString = `${renovateComment}\n"${property}": "${value}"`;
      const testStringUnquoted = `${renovateComment}\n${property}: "${value}"`;

      for (const regex of renovateRegexes) {
        regex.lastIndex = 0; // Reset regex state
        if (regex.test(testString) || regex.test(testStringUnquoted)) {
          matchesRegex = true;
          break;
        }
      }
    }

    entries.push({
      file: filePath,
      line: propertyLine + 1,
      property,
      value,
      hasRenovateComment,
      renovateComment,
      matchesRegex,
      isExcluded,
      exclusionReason,
    });
  }

  return entries;
}

function getVersionsObject(filePath: string): Record<string, string> {
  // Use static imports to get the versions object
  if (filePath === "src/cdk8s/src/versions.ts") {
    return cdk8sVersions;
  } else if (filePath === ".dagger/src/versions.ts") {
    return daggerVersions;
  } else {
    throw new Error(`Unknown versions file: ${filePath}`);
  }
}

function countActualDependencies(filePath: string): number {
  return Object.keys(getVersionsObject(filePath)).length;
}

function getActualProperties(filePath: string): string[] {
  return Object.keys(getVersionsObject(filePath));
}

async function main() {
  console.log("🔍 Testing Renovate regex patterns in versions.ts files...");

  // Get the regex patterns from renovate.json
  const renovateRegexes = await getRenovateRegexes();
  console.log(`📋 Using ${renovateRegexes.length} regex pattern(s):`);
  renovateRegexes.forEach((regex, i) => {
    console.log(`   ${i + 1}: ${regex.source}`);
  });

  const versionFiles = ["src/cdk8s/src/versions.ts", ".dagger/src/versions.ts"];

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const filePath of versionFiles) {
    console.log(`\n📄 Analyzing ${filePath}...`);

    try {
      const entries = await parseVersionsFile(filePath, renovateRegexes);
      let fileErrors = 0;
      let fileWarnings = 0;

      for (const entry of entries) {
        if (!entry.hasRenovateComment && !entry.isExcluded) {
          console.log(
            `❌ ${entry.property} (line ${entry.line}): Missing Renovate comment`
          );
          fileErrors++;
        } else if (entry.hasRenovateComment && !entry.matchesRegex) {
          console.log(
            `❌ ${entry.property} (line ${entry.line}): Renovate comment doesn't match regex pattern`
          );
          console.log(`   Comment: ${entry.renovateComment}`);
          console.log(`   Property: "${entry.property}": "${entry.value}"`);
          fileErrors++;
        } else if (entry.hasRenovateComment && entry.matchesRegex) {
          console.log(`✅ ${entry.property}: Properly formatted for Renovate`);
        } else if (entry.isExcluded && !entry.hasRenovateComment) {
          console.log(
            `ℹ️  ${entry.property}: Excluded from Renovate management (${entry.exclusionReason})`
          );
        } else if (entry.isExcluded && entry.hasRenovateComment) {
          console.log(
            `⚠️  ${entry.property}: Has Renovate comment but is marked as excluded (${entry.exclusionReason})`
          );
          fileWarnings++;
        }
      }

      // Validate that detected count matches actual dependency count
      const actualCount = countActualDependencies(filePath);
      const detectedCount = entries.length;

      // Get actual property names from the TypeScript object
      const actualProperties = getActualProperties(filePath);
      const detectedProperties = entries.map((e) =>
        e.property.replace(/^"(.*)"$/, "$1")
      ); // Remove quotes from property names

      console.log(`\n📊 ${filePath} Summary:`);
      console.log(`   Total dependencies: ${detectedCount}`);
      console.log(`   Actual dependencies in TS: ${actualCount}`);
      console.log(
        `   Managed by Renovate: ${entries.filter((e) => e.hasRenovateComment && e.matchesRegex).length}`
      );
      console.log(
        `   Excluded from Renovate: ${entries.filter((e) => e.isExcluded).length}`
      );

      // Check if detected count matches actual count
      if (detectedCount !== actualCount) {
        console.log(
          `❌ Dependency count mismatch: detected ${detectedCount} but actual TS object has ${actualCount} properties`
        );
        console.log(
          `   This suggests the regex parsing is missing some dependencies or the TS file has malformed entries`
        );

        // Show missing dependencies
        const missingDeps = actualProperties.filter(
          (prop: string) => !detectedProperties.includes(prop)
        );
        const extraDeps = detectedProperties.filter(
          (prop: string) => !actualProperties.includes(prop)
        );

        if (missingDeps.length > 0) {
          console.log(`   Missing from detection: [${missingDeps.join(", ")}]`);
        }
        if (extraDeps.length > 0) {
          console.log(
            `   Detected but not in TS object: [${extraDeps.join(", ")}]`
          );
        }

        fileErrors++;
      } else {
        console.log(
          `✅ Dependency count validation: ${detectedCount}/${actualCount} properties detected correctly`
        );
      }

      console.log(`   Errors: ${fileErrors}`);
      console.log(`   Warnings: ${fileWarnings}`);

      totalErrors += fileErrors;
      totalWarnings += fileWarnings;
    } catch (error) {
      console.error(`❌ Failed to analyze ${filePath}:`, error);
      totalErrors++;
    }
  }

  console.log(`\n🎯 Overall Results:`);
  console.log(`   Total errors: ${totalErrors}`);
  console.log(`   Total warnings: ${totalWarnings}`);

  if (totalErrors > 0) {
    console.log(`\n❌ Test failed with ${totalErrors} errors`);
    console.log(`\n💡 To fix errors:`);
    console.log(`   1. Add Renovate comments for dependencies missing them`);
    console.log(
      `   3. Follow the pattern: // renovate: datasource=X versioning=Y`
    );
    console.log(
      `   4. Check the regex pattern in renovate.json customManagers`
    );
    process.exit(1);
  }

  if (totalWarnings > 0) {
    console.log(`\n⚠️  Test completed with ${totalWarnings} warnings`);
  } else {
    console.log(`\n🎉 All Renovate patterns are properly formatted!`);
  }
}

// Run the test
main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
