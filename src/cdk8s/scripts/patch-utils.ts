/**
 * Utility functions for Grafana template replacement
 * Extracted for reuse in tests and the patch script
 */

export type GrafanaReplacement = {
  pattern: string;
  replacement: string;
  sedPattern: string;
};

/**
 * Regex pattern to match Grafana template placeholders
 * Matches: __GRAFANA_TPL_START__<variable_name>__GRAFANA_TPL_END__
 * Captures the variable name in group 1
 */
const GRAFANA_PLACEHOLDER_REGEX = /__GRAFANA_TPL_START__(\w+)__GRAFANA_TPL_END__/g;

/**
 * Creates a replacement string for a Grafana template variable
 */
function createReplacementString(variableName: string): string {
  return `{{ print "{{" }}${variableName}{{ print "}}" }}`;
}

/**
 * Applies all Grafana template replacements using a single regex pattern
 * This is more generic than maintaining a list of variable names
 */
export function applyGrafanaReplacements(content: string): string {
  return content.replace(GRAFANA_PLACEHOLDER_REGEX, (_match, variableName: string) => {
    return createReplacementString(variableName);
  });
}

/**
 * Legacy export for backward compatibility with sed fallback
 * Generates replacements for any variables found in the content
 */
export function getGrafanaReplacements(content: string): GrafanaReplacement[] {
  const replacements: GrafanaReplacement[] = [];
  const matches = [...content.matchAll(GRAFANA_PLACEHOLDER_REGEX)];
  // Extract variable names from regex matches
  // The regex always captures group 1, so m[1] will always be a string
  const variableNames = matches.map((m) => m[1]).filter((val) => val !== undefined);
  const uniqueVariables = new Set(variableNames);

  for (const variableName of uniqueVariables) {
    const pattern = `__GRAFANA_TPL_START__${variableName}__GRAFANA_TPL_END__`;
    const replacement = createReplacementString(variableName);
    // Escape special characters for sed pattern
    const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escapedReplacement = replacement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const sedPattern = `s/${escapedPattern}/${escapedReplacement}/g`;

    replacements.push({ pattern, replacement, sedPattern });
  }

  return replacements;
}

/**
 * @deprecated Use applyGrafanaReplacements() instead
 * Kept for backward compatibility
 */
export const grafanaReplacements: GrafanaReplacement[] = [];

/**
 * Counts how many times a pattern appears in content
 */
export function countPatternOccurrences(content: string, pattern: string): number {
  const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = content.match(new RegExp(escapedPattern, "g"));
  return matches?.length ?? 0;
}
