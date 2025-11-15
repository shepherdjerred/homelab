import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { applyGrafanaReplacements, getGrafanaReplacements } from "./patch-utils.ts";

describe("Grafana template replacement", () => {
  describe("Single replacements", () => {
    test("should replace disk placeholder", () => {
      const input = "__GRAFANA_TPL_START__disk__GRAFANA_TPL_END__";
      const result = applyGrafanaReplacements(input);
      expect(result).toBe('{{ print "{{" }}disk{{ print "}}" }}');
    });

    test("should replace device_model placeholder", () => {
      const input = "__GRAFANA_TPL_START__device_model__GRAFANA_TPL_END__";
      const result = applyGrafanaReplacements(input);
      expect(result).toBe('{{ print "{{" }}device_model{{ print "}}" }}');
    });

    test("should replace environment placeholder", () => {
      const input = "__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__";
      const result = applyGrafanaReplacements(input);
      expect(result).toBe('{{ print "{{" }}environment{{ print "}}" }}');
    });

    test("should replace workflow placeholder", () => {
      const input = "__GRAFANA_TPL_START__workflow__GRAFANA_TPL_END__";
      const result = applyGrafanaReplacements(input);
      expect(result).toBe('{{ print "{{" }}workflow{{ print "}}" }}');
    });
  });

  describe("Multiple replacements in one string", () => {
    test("should replace multiple placeholders", () => {
      const input =
        "__GRAFANA_TPL_START__disk__GRAFANA_TPL_END__ (__GRAFANA_TPL_START__device_model__GRAFANA_TPL_END__)";
      const result = applyGrafanaReplacements(input);
      expect(result).toBe('{{ print "{{" }}disk{{ print "}}" }} ({{ print "{{" }}device_model{{ print "}}" }})');
    });

    test("should replace all placeholders in complex string", () => {
      const input = `Legend: __GRAFANA_TPL_START__disk__GRAFANA_TPL_END__ - __GRAFANA_TPL_START__environment__GRAFANA_TPL_END__ - __GRAFANA_TPL_START__workflow__GRAFANA_TPL_END__`;
      const result = applyGrafanaReplacements(input);
      expect(result).toContain('{{ print "{{" }}disk{{ print "}}" }}');
      expect(result).toContain('{{ print "{{" }}environment{{ print "}}" }}');
      expect(result).toContain('{{ print "{{" }}workflow{{ print "}}" }}');
      expect(result).not.toContain("__GRAFANA_TPL_START__");
    });
  });

  describe("JSON string replacement", () => {
    test("should replace placeholders in JSON string", () => {
      const jsonString = JSON.stringify({
        legendFormat:
          "__GRAFANA_TPL_START__disk__GRAFANA_TPL_END__ (__GRAFANA_TPL_START__device_model__GRAFANA_TPL_END__)",
      });
      const result = applyGrafanaReplacements(jsonString);
      expect(result).toContain('{{ print "{{" }}disk{{ print "}}" }}');
      expect(result).toContain('{{ print "{{" }}device_model{{ print "}}" }}');
      expect(result).not.toContain("__GRAFANA_TPL_START__disk__GRAFANA_TPL_END__");
    });

    test("should handle multiline JSON with placeholders", () => {
      const multilineJson = `{
  "legendFormat": "__GRAFANA_TPL_START__disk__GRAFANA_TPL_END__",
  "expr": "some_query",
  "description": "__GRAFANA_TPL_START__device_model__GRAFANA_TPL_END__"
}`;
      const result = applyGrafanaReplacements(multilineJson);
      expect(result).toContain('{{ print "{{" }}disk{{ print "}}" }}');
      expect(result).toContain('{{ print "{{" }}device_model{{ print "}}" }}');
      expect(result).not.toContain("__GRAFANA_TPL_START__");
    });
  });

  describe("YAML embedded JSON replacement", () => {
    test("should replace placeholders in YAML with embedded JSON", () => {
      const yamlContent = `apiVersion: v1
kind: ConfigMap
metadata:
  name: smartctl-dashboard
data:
  smartctl.json: |
    {
      "panels": [
        {
          "targets": [
            {
              "legendFormat": "__GRAFANA_TPL_START__disk__GRAFANA_TPL_END__ (__GRAFANA_TPL_START__device_model__GRAFANA_TPL_END__)"
            }
          ]
        }
      ]
    }`;
      const result = applyGrafanaReplacements(yamlContent);
      expect(result).toContain('{{ print "{{" }}disk{{ print "}}" }}');
      expect(result).toContain('{{ print "{{" }}device_model{{ print "}}" }}');
      expect(result).not.toContain("__GRAFANA_TPL_START__disk__GRAFANA_TPL_END__");
    });
  });

  describe("Edge cases", () => {
    test("should handle empty string", () => {
      expect(applyGrafanaReplacements("")).toBe("");
    });

    test("should handle string without placeholders", () => {
      const input = "No placeholders here";
      expect(applyGrafanaReplacements(input)).toBe(input);
    });

    test("should handle string with partial placeholder", () => {
      const input = "__GRAFANA_TPL_START__disk";
      expect(applyGrafanaReplacements(input)).toBe(input); // Should not match partial
    });

    test("should replace multiple occurrences of same placeholder", () => {
      const input = "__GRAFANA_TPL_START__disk__GRAFANA_TPL_END__ and __GRAFANA_TPL_START__disk__GRAFANA_TPL_END__";
      const result = applyGrafanaReplacements(input);
      const matches = result.match(/{{ print "{{" }}disk{{ print "}}" }}/g);
      expect(matches?.length).toBe(2);
    });
  });

  describe("Generic pattern matching", () => {
    test("should work with any variable name", () => {
      const testVariables = [
        "environment",
        "job_name",
        "device",
        "model_name",
        "instance",
        "schedule",
        "namespace",
        "workflow",
        "error_type",
        "disk",
        "device_model",
        "new_variable", // Test that it works with new variables too
        "custom_var",
      ];

      for (const variableName of testVariables) {
        const input = `__GRAFANA_TPL_START__${variableName}__GRAFANA_TPL_END__`;
        const result = applyGrafanaReplacements(input);
        expect(result).toBe(`{{ print "{{" }}${variableName}{{ print "}}" }}`);
      }
    });

    test("should generate replacements dynamically from content", () => {
      const content =
        "__GRAFANA_TPL_START__disk__GRAFANA_TPL_END__ and __GRAFANA_TPL_START__device_model__GRAFANA_TPL_END__";
      const replacements = getGrafanaReplacements(content);

      expect(replacements.length).toBe(2);
      expect(replacements.some((r) => r.pattern.includes("disk"))).toBe(true);
      expect(replacements.some((r) => r.pattern.includes("device_model"))).toBe(true);
    });
  });
});

describe("File-based replacement (integration test)", () => {
  let testDir: string;
  let testFile: string;

  beforeEach(async () => {
    testDir = `${Bun.env["TMPDIR"] ?? "/tmp"}/patch-test-${String(Date.now())}`;
    const testDirPath = testDir;
    // Create temp directory
    await Bun.$`mkdir -p ${testDirPath}`.quiet();
    testFile = `${testDirPath}/test-apps.k8s.yaml`;
  });

  afterEach(async () => {
    // Clean up temp directory
    try {
      await Bun.$`rm -rf ${testDir}`.quiet();
    } catch {
      // Ignore cleanup errors
    }
  });

  test("should replace placeholders in file content", async () => {
    const content = `data:
  smartctl.json: |
    {
      "legendFormat": "__GRAFANA_TPL_START__disk__GRAFANA_TPL_END__"
    }`;

    await Bun.write(testFile, content);

    let fileContent = await Bun.file(testFile).text();
    fileContent = applyGrafanaReplacements(fileContent);
    await Bun.write(testFile, fileContent);

    const result = await Bun.file(testFile).text();
    expect(result).toContain('{{ print "{{" }}disk{{ print "}}" }}');
    expect(result).not.toContain("__GRAFANA_TPL_START__disk__GRAFANA_TPL_END__");
  });

  test("should handle large file with multiple replacements", async () => {
    const content = Array(100)
      .fill(0)
      .map(
        (_, i) =>
          `  panel${String(i)}: "__GRAFANA_TPL_START__disk__GRAFANA_TPL_END__ (__GRAFANA_TPL_START__device_model__GRAFANA_TPL_END__)"`,
      )
      .join("\n");

    await Bun.write(testFile, content);

    let fileContent = await Bun.file(testFile).text();
    fileContent = applyGrafanaReplacements(fileContent);
    await Bun.write(testFile, fileContent);

    const result = await Bun.file(testFile).text();
    const diskMatches = result.match(/{{ print "{{" }}disk{{ print "}}" }}/g);
    const deviceModelMatches = result.match(/{{ print "{{" }}device_model{{ print "}}" }}/g);

    expect(diskMatches?.length).toBe(100);
    expect(deviceModelMatches?.length).toBe(100);
    expect(result).not.toContain("__GRAFANA_TPL_START__");
  });
});
