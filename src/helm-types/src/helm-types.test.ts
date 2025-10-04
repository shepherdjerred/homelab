import { describe, test, expect } from "bun:test";
import { convertToTypeScriptInterface, generateTypeScriptCode, parseYAMLComments } from "./helm-types";
import type { JSONSchemaProperty } from "./helm-types";

describe("YAML Comment Parsing - Real Helm Chart Examples", () => {
  test("should correctly associate comments with properties at different indent levels (minecraft tty bug)", () => {
    // Real example from minecraft helm chart that was incorrectly associating comments
    const yaml = `    loadBalancerClass:
    loadBalancerIP:
    # loadBalancerSourceRanges: []
    ## Set the externalTrafficPolicy in the Service to either Cluster or Local
    # externalTrafficPolicy: Cluster

  ## set this to false to not have colorized logs
  tty: true

  extraPorts:`;

    const comments = parseYAMLComments(yaml);

    // tty should only get its own comment, not the comments from the deeper nested properties
    expect(comments.get("tty")).toBe("set this to false to not have colorized logs");
    expect(comments.get("tty")).not.toContain("loadBalancerSourceRanges");
    expect(comments.get("tty")).not.toContain("externalTrafficPolicy");
  });

  test("should parse single line comments", () => {
    const yaml = `# This is a comment
key: value`;
    const comments = parseYAMLComments(yaml);
    expect(comments.get("key")).toBe("This is a comment");
  });

  test("should handle multi-line comments", () => {
    const yaml = `# Line 1
# Line 2
# Line 3
key: value`;
    const comments = parseYAMLComments(yaml);
    expect(comments.get("key")).toContain("Line 1");
    expect(comments.get("key")).toContain("Line 2");
    expect(comments.get("key")).toContain("Line 3");
  });

  test("should clean up # and -- markers", () => {
    const yaml = `# -- This is a helm comment
## Another comment
key: value`;
    const comments = parseYAMLComments(yaml);
    expect(comments.get("key")).toBe("This is a helm comment\nAnother comment");
  });

  test("should handle nested keys correctly", () => {
    const yaml = `# Parent comment
parent:
  # Child comment
  child: value`;
    const comments = parseYAMLComments(yaml);
    expect(comments.get("parent")).toBe("Parent comment");
    expect(comments.get("parent.child")).toBe("Child comment");
  });

  test("should handle inline comments", () => {
    const yaml = `key: value  # This is an inline comment`;
    const comments = parseYAMLComments(yaml);
    expect(comments.get("key")).toBe("This is an inline comment");
  });

  test("should not associate deeply nested comments with shallow keys (argo-cd example)", () => {
    const yaml = `server:
  service:
    type: ClusterIP
    port: 80
    # Comment at port level
    targetPort: 8080
    # loadBalancerIP: ""
    # loadBalancerSourceRanges: []

# Top level comment for nextKey
nextKey: value`;

    const comments = parseYAMLComments(yaml);

    // nextKey should only get the top level comment
    expect(comments.get("nextKey")).toBe("Top level comment for nextKey");
    expect(comments.get("nextKey")).not.toContain("loadBalancerIP");
    expect(comments.get("nextKey")).not.toContain("loadBalancerSourceRanges");
  });

  test("should handle multiple nested levels with proper comment association", () => {
    const yaml = `# Level 1 comment
level1:
  # Level 2 comment
  level2:
    # Level 3 comment
    level3: value
    # Another level 3 comment
    another3: value2
  # Back to level 2
  level2b: value3`;

    const comments = parseYAMLComments(yaml);

    expect(comments.get("level1")).toBe("Level 1 comment");
    expect(comments.get("level1.level2")).toBe("Level 2 comment");
    expect(comments.get("level1.level2.level3")).toBe("Level 3 comment");
    expect(comments.get("level1.level2.another3")).toBe("Another level 3 comment");
    expect(comments.get("level1.level2b")).toBe("Back to level 2");
  });

  test("should filter out YAML examples from comments", () => {
    const yaml = `# This is documentation
# hostAliases:
# - ip: "1.2.3.4"
#   hostnames:
#   - "example.com"
# Use this to add host aliases
key: value`;

    const comments = parseYAMLComments(yaml);

    // Should only include prose, not YAML examples
    expect(comments.get("key")).toContain("This is documentation");
    expect(comments.get("key")).toContain("Use this to add host aliases");
    expect(comments.get("key")).not.toContain("hostAliases:");
    expect(comments.get("key")).not.toContain("- ip:");
  });

  test("should filter out policy rules but keep prose from comments", () => {
    const yaml = `policy.csv: ''
# Policy rules are in the form:
# p, subject, resource, action, object, effect
# Role definitions and bindings are in the form:
# g, subject, inherited-subject
# policy.csv: |
# p, role:org-admin, applications, *, */*, allow
# p, role:org-admin, clusters, get, *, allow
# g, your-github-org:your-team, role:org-admin
# OIDC scopes to examine during rbac enforcement (in addition to \`sub\` scope).
# The scope value can be a string, or a list of strings.
scopes: "[groups]"`;

    const comments = parseYAMLComments(yaml);

    // All comments between policy.csv and scopes get associated with scopes
    // This includes both the policy rules explanation AND the OIDC prose
    expect(comments.get("scopes")).toContain("Policy rules are in the form:");
    expect(comments.get("scopes")).toContain("Role definitions and bindings are in the form:");
    expect(comments.get("scopes")).toContain("OIDC scopes to examine");
    expect(comments.get("scopes")).toContain("The scope value can be a string");

    // Should filter out the example rules that could break JSDoc (containing */*)
    expect(comments.get("scopes")).not.toContain("p, role:org-admin");
    expect(comments.get("scopes")).not.toContain("g, your-github-org");
  });

  test("should handle commented-out keys mixed with documentation", () => {
    const yaml = `# Configure the service
# type: LoadBalancer
# ^ Use LoadBalancer for external access
service:
  type: ClusterIP`;

    const comments = parseYAMLComments(yaml);

    expect(comments.get("service")).toContain("Configure the service");
    // The type: LoadBalancer line should be filtered as an example
  });

  test("should handle actual argo-cd scopes field with proper indentation", () => {
    // This is the exact structure from argo-cd values.yaml
    const yaml = `  rbac:
    create: true
    annotations: {}

    policy.default: ''

    policy.csv: ''
    # Policy rules are in the form:
    #  p, subject, resource, action, object, effect
    # Role definitions and bindings are in the form:
    #  g, subject, inherited-subject
    # policy.csv: |
    #   p, role:org-admin, applications, *, */*, allow
    #   p, role:org-admin, clusters, get, *, allow
    #   p, role:org-admin, repositories, *, *, allow
    #   p, role:org-admin, logs, get, *, allow
    #   p, role:org-admin, exec, create, */*, allow
    #   g, your-github-org:your-team, role:org-admin

    # -- OIDC scopes to examine during rbac enforcement (in addition to \`sub\` scope).
    # The scope value can be a string, or a list of strings.
    scopes: "[groups]"`;

    const comments = parseYAMLComments(yaml);

    // Should get the OIDC description
    expect(comments.get("rbac.scopes")).toBeDefined();
    expect(comments.get("rbac.scopes")).toContain("OIDC scopes to examine");
    expect(comments.get("rbac.scopes")).toContain("The scope value can be a string");
  });

  test("should handle keys with dots in their names", () => {
    const yaml = `# Comment for policy.default
policy.default: "role:readonly"
# Comment for policy.csv
policy.csv: ""
# Comment for policy.matchMode
policy.matchMode: "glob"`;

    const comments = parseYAMLComments(yaml);

    expect(comments.get("policy.default")).toBe("Comment for policy.default");
    expect(comments.get("policy.csv")).toBe("Comment for policy.csv");
    expect(comments.get("policy.matchMode")).toBe("Comment for policy.matchMode");
  });

  test("should handle nested keys with dots in names", () => {
    const yaml = `parent:
  # Comment for child.with.dots
  child.with.dots: "value"
  # Comment for another.dotted.key
  another.dotted.key: "value2"`;

    const comments = parseYAMLComments(yaml);

    expect(comments.get("parent.child.with.dots")).toBe("Comment for child.with.dots");
    expect(comments.get("parent.another.dotted.key")).toBe("Comment for another.dotted.key");
  });

  test("should properly resume prose detection after code blocks with backticks and parentheses", () => {
    const yaml = `# First line of prose
# code.example: |
#   some: code
#   another: example
# This is prose with \`backticks\` and (parentheses) that should be included.
# Another line with special chars: colons, dashes - and more.
key: value`;

    const comments = parseYAMLComments(yaml);

    expect(comments.get("key")).toContain("First line of prose");
    expect(comments.get("key")).toContain("This is prose with `backticks` and (parentheses)");
    expect(comments.get("key")).toContain("Another line with special chars");
  });

  test("should handle multiple code blocks with prose in between", () => {
    const yaml = `# Initial documentation
# First code block:
# p, rule1, *, *, allow
# p, rule2, *, *, deny
# Middle documentation explaining something important.
# Second code block:
# g, group1, role1
# g, group2, role2
# Final documentation that wraps it all up.
key: value`;

    const comments = parseYAMLComments(yaml);

    expect(comments.get("key")).toContain("Initial documentation");
    expect(comments.get("key")).toContain("Middle documentation explaining something important");
    expect(comments.get("key")).toContain("Final documentation that wraps it all up");
    expect(comments.get("key")).not.toContain("p, rule1");
    expect(comments.get("key")).not.toContain("g, group1");
  });

  test("should handle empty lines in comments", () => {
    const yaml = `# First paragraph
#
# Second paragraph after empty line
key: value`;

    const comments = parseYAMLComments(yaml);

    expect(comments.get("key")).toContain("First paragraph");
    expect(comments.get("key")).toContain("Second paragraph");
  });

  test("should handle refs and URLs in comments", () => {
    const yaml = `# ref: https://hub.docker.com/r/itzg/minecraft-server/
# For more info see: https://example.com
image: repository`;

    const comments = parseYAMLComments(yaml);

    expect(comments.get("image")).toContain("https://hub.docker.com");
    expect(comments.get("image")).toContain("https://example.com");
  });

  test("should NOT associate section headers from commented-out config blocks with later properties (argo-cd bug)", () => {
    // This is the exact structure from argo-cd values.yaml that caused the bug
    const yaml = `    # Dex configuration
    # dex.config: |
    #   connectors:
    #     # GitHub example
    #     - type: github
    #       id: github
    #       name: GitHub

    # OIDC configuration as an alternative to dex (optional).
    # oidc.config: |
    #   name: AzureAD
    #   issuer: https://login.microsoftonline.com/TENANT_ID/v2.0

    # Extension Configuration
    ## Ref: https://argo-cd.readthedocs.io/en/latest/developer-guide/extensions/proxy-extensions/
    # extension.config: |
    #   extensions:
    #   - name: httpbin

    ## Default configuration for ignoreResourceUpdates.
    ## The ignoreResourceUpdates list contains K8s resource's properties that are known to be frequently updated
    ## by controllers and operators. These resources, when watched by argo, will cause many unnecessary updates.

    # -- Ignoring status for all resources. An update will still be sent if the status update causes the health to change.
    resource.customizations.ignoreResourceUpdates.all: |
      jsonPointers:
        - /status`;

    const comments = parseYAMLComments(yaml);

    // The property should get its actual documentation
    expect(comments.get("resource.customizations.ignoreResourceUpdates.all")).toContain(
      "Default configuration for ignoreResourceUpdates",
    );
    expect(comments.get("resource.customizations.ignoreResourceUpdates.all")).toContain(
      "Ignoring status for all resources",
    );

    // BUT it should NOT include the section headers from commented-out configs
    expect(comments.get("resource.customizations.ignoreResourceUpdates.all")).not.toContain("Dex configuration");
    expect(comments.get("resource.customizations.ignoreResourceUpdates.all")).not.toContain("GitHub example");
    expect(comments.get("resource.customizations.ignoreResourceUpdates.all")).not.toContain("OIDC configuration");
    expect(comments.get("resource.customizations.ignoreResourceUpdates.all")).not.toContain("Extension Configuration");
  });
});

describe("JSON Schema to TypeScript Type Conversion", () => {
  test("should convert basic types", () => {
    const stringSchema: JSONSchemaProperty = { type: "string" };
    const numberSchema: JSONSchemaProperty = { type: "number" };
    const booleanSchema: JSONSchemaProperty = { type: "boolean" };

    const values = {
      str: "test",
      num: 42,
      bool: true,
    };

    const result = convertToTypeScriptInterface(values, "TestValues", {
      properties: {
        str: stringSchema,
        num: numberSchema,
        bool: booleanSchema,
      },
    });

    expect(result.properties["str"]?.type).toBe("string");
    expect(result.properties["num"]?.type).toBe("number");
    expect(result.properties["bool"]?.type).toBe("boolean");
  });

  test("should handle oneOf unions", () => {
    const schema: JSONSchemaProperty = {
      oneOf: [{ type: "integer" }, { enum: ["default"] }],
    };

    const values = { setting: "default" };

    const result = convertToTypeScriptInterface(values, "TestValues", {
      properties: { setting: schema },
    });

    expect(result.properties["setting"]?.type).toBe('number | "default"');
  });

  test("should handle anyOf unions", () => {
    const schema: JSONSchemaProperty = {
      anyOf: [{ type: "string", enum: ["default"] }, { type: "boolean" }],
    };

    const values = { setting: "default" };

    const result = convertToTypeScriptInterface(values, "TestValues", {
      properties: { setting: schema },
    });

    expect(result.properties["setting"]?.type).toBe('"default" | boolean');
  });

  test("should handle array types", () => {
    const schema: JSONSchemaProperty = {
      type: "array",
      items: { type: "string" },
    };

    const values = { list: ["a", "b", "c"] };

    const result = convertToTypeScriptInterface(values, "TestValues", {
      properties: { list: schema },
    });

    expect(result.properties["list"]?.type).toBe("string[]");
  });
});

describe("Type Inference from Values", () => {
  test("should infer boolean from actual boolean", () => {
    const values = { flag: true };

    const result = convertToTypeScriptInterface(values, "TestValues");

    expect(result.properties["flag"]?.type).toBe("boolean");
  });

  test("should infer number from actual number", () => {
    const values = { count: 42 };

    const result = convertToTypeScriptInterface(values, "TestValues");

    expect(result.properties["count"]?.type).toBe("number");
  });

  test("should infer boolean from string boolean", () => {
    const values = { flag: "FALSE" };

    const result = convertToTypeScriptInterface(values, "TestValues");

    expect(result.properties["flag"]?.type).toBe("boolean");
  });

  test("should infer number from numeric string", () => {
    const values = { port: "8080" };

    const result = convertToTypeScriptInterface(values, "TestValues");

    expect(result.properties["port"]?.type).toBe("number");
  });

  test('should handle "default" as union type', () => {
    const values = { setting: "default" };

    const result = convertToTypeScriptInterface(values, "TestValues");

    expect(result.properties["setting"]?.type).toBe("string | number | boolean");
  });

  test("should infer plain string", () => {
    const values = { name: "test" };

    const result = convertToTypeScriptInterface(values, "TestValues");

    expect(result.properties["name"]?.type).toBe("string");
  });

  test("should handle empty string", () => {
    const values = { empty: "" };

    const result = convertToTypeScriptInterface(values, "TestValues");

    expect(result.properties["empty"]?.type).toBe("string");
  });

  test("should handle empty object", () => {
    const values = { obj: {} };

    const result = convertToTypeScriptInterface(values, "TestValues");

    expect(result.properties["obj"]?.type).toBe("TestValuesObj");
    expect(result.properties["obj"]?.nested).toBeDefined();
  });

  test("should handle empty array", () => {
    const values = { arr: [] };

    const result = convertToTypeScriptInterface(values, "TestValues");

    expect(result.properties["arr"]?.type).toBe("unknown[]");
  });
});

describe("Description and Default Value Handling", () => {
  test("should include schema description", () => {
    const schema: JSONSchemaProperty = {
      properties: {
        setting: {
          type: "string",
          description: "This is a test setting",
        },
      },
    };

    const values = { setting: "value" };

    const result = convertToTypeScriptInterface(values, "TestValues", schema);

    expect(result.properties["setting"]?.description).toBe("This is a test setting");
  });

  test("should include schema default", () => {
    const schema: JSONSchemaProperty = {
      properties: {
        setting: {
          type: "string",
          default: "default-value",
        },
      },
    };

    const values = { setting: "value" };

    const result = convertToTypeScriptInterface(values, "TestValues", schema);

    expect(result.properties["setting"]?.default).toBe("default-value");
  });

  test("should merge YAML comments with schema description", () => {
    const schema: JSONSchemaProperty = {
      properties: {
        setting: {
          type: "string",
          description: "Schema description",
        },
      },
    };

    const yamlComments = new Map([["setting", "YAML comment"]]);
    const values = { setting: "value" };

    const result = convertToTypeScriptInterface(values, "TestValues", schema, yamlComments);

    expect(result.properties["setting"]?.description).toContain("YAML comment");
    expect(result.properties["setting"]?.description).toContain("Schema description");
  });

  test("should use YAML comment when no schema description", () => {
    const schema: JSONSchemaProperty = {
      properties: {
        setting: { type: "string" },
      },
    };

    const yamlComments = new Map([["setting", "YAML comment only"]]);
    const values = { setting: "value" };

    const result = convertToTypeScriptInterface(values, "TestValues", schema, yamlComments);

    expect(result.properties["setting"]?.description).toBe("YAML comment only");
  });
});

describe("Code Generation", () => {
  test("should generate JSDoc comments", () => {
    const tsInterface = {
      name: "TestValues",
      properties: {
        setting: {
          type: "string",
          optional: true,
          description: "Test description",
          default: "test-default",
        },
      },
    };

    const code = generateTypeScriptCode(tsInterface, "test");

    expect(code).toContain("/**");
    expect(code).toContain("Test description");
    expect(code).toContain("@default");
    expect(code).toContain('"test-default"');
  });

  test("should handle properties without description", () => {
    const tsInterface = {
      name: "TestValues",
      properties: {
        setting: {
          type: "string",
          optional: true,
        },
      },
    };

    const code = generateTypeScriptCode(tsInterface, "test");

    expect(code).toContain("setting?: string;");
    expect(code).not.toContain("/**");
  });

  test("should format default values correctly", () => {
    const tsInterface = {
      name: "TestValues",
      properties: {
        str: { type: "string", optional: true, default: "test" },
        num: { type: "number", optional: true, default: 42 },
        bool: { type: "boolean", optional: true, default: true },
        arr: { type: "array", optional: true, default: ["a", "b"] },
        obj: { type: "object", optional: true, default: { key: "value" } },
      },
    };

    const code = generateTypeScriptCode(tsInterface, "test");

    expect(code).toContain('@default "test"');
    expect(code).toContain("@default 42");
    expect(code).toContain("@default true");
    expect(code).toContain('@default ["a","b"]');
    expect(code).toContain('@default {"key":"value"}');
  });

  test("should truncate long default values", () => {
    const longString = "a".repeat(100);
    const tsInterface = {
      name: "TestValues",
      properties: {
        long: { type: "string", optional: true, default: longString },
      },
    };

    const code = generateTypeScriptCode(tsInterface, "test");

    expect(code).toContain("@default");
    expect(code).toContain("...");
  });

  test("should summarize large objects/arrays", () => {
    const largeObj = Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`key${String(i)}`, i]));
    const largeArr = Array.from({ length: 100 }, (_, i) => i);

    const tsInterface = {
      name: "TestValues",
      properties: {
        obj: { type: "object", optional: true, default: largeObj },
        arr: { type: "array", optional: true, default: largeArr },
      },
    };

    const code = generateTypeScriptCode(tsInterface, "test");

    expect(code).toContain("{...}");
    expect(code).toContain("[...]");
    expect(code).toContain("keys");
    expect(code).toContain("items");
  });

  test("should escape */ sequences in JSDoc comments", () => {
    const tsInterface = {
      name: "TestValues",
      properties: {
        policy: {
          type: "string",
          optional: true,
          description: "Policy rules: p, role:org-admin, applications, *, */*, allow",
          default: "",
        },
      },
    };

    const code = generateTypeScriptCode(tsInterface, "test");

    // Should escape */ to *\/ to prevent premature comment closure
    expect(code).toContain("*\\/");
    // Should still be valid TypeScript (not prematurely closing the comment)
    expect(code).toContain("policy?: string;");
    // Should not have unescaped */
    expect(code).not.toContain("*, */*, allow");
  });

  test("should escape multiple */ sequences in description", () => {
    const tsInterface = {
      name: "TestValues",
      properties: {
        rules: {
          type: "string",
          optional: true,
          description: "Multiple patterns: */*, */*/*.js, and */test/* should all be escaped",
        },
      },
    };

    const code = generateTypeScriptCode(tsInterface, "test");

    // All */ should be escaped (4 total: */, */, */, */)
    const escapedCount = (code.match(/\*\\\//g) ?? []).length;
    expect(escapedCount).toBe(4); // Four */ sequences in the description

    // Should still be valid TypeScript
    expect(code).toContain("rules?: string;");
  });

  test("should handle */ in multi-line descriptions", () => {
    const tsInterface = {
      name: "TestValues",
      properties: {
        config: {
          type: "string",
          optional: true,
          description: "Line 1 with */\nLine 2 also with */*, test\nLine 3 normal",
        },
      },
    };

    const code = generateTypeScriptCode(tsInterface, "test");

    // Should escape all */ sequences
    expect(code).toContain("*\\/");
    // Should maintain line structure
    expect(code).toContain("Line 1");
    expect(code).toContain("Line 2");
    expect(code).toContain("Line 3 normal");
    // Should still be valid TypeScript
    expect(code).toContain("config?: string;");
  });
});

describe("Nested Objects", () => {
  test("should handle nested objects with schema", () => {
    const schema: JSONSchemaProperty = {
      properties: {
        parent: {
          type: "object",
          properties: {
            child: {
              type: "string",
              description: "Nested description",
            },
          },
        },
      },
    };

    const values = {
      parent: {
        child: "value",
      },
    };

    const result = convertToTypeScriptInterface(values, "TestValues", schema);

    expect(result.properties["parent"]?.type).toBe("TestValuesParent");
    expect(result.properties["parent"]?.nested).toBeDefined();
    expect(result.properties["parent"]?.nested?.properties["child"]?.type).toBe("string");
    expect(result.properties["parent"]?.nested?.properties["child"]?.description).toBe("Nested description");
  });

  test("should handle deeply nested objects", () => {
    const values = {
      level1: {
        level2: {
          level3: {
            value: "deep",
          },
        },
      },
    };

    const result = convertToTypeScriptInterface(values, "TestValues");

    expect(result.properties["level1"]?.nested).toBeDefined();
    expect(result.properties["level1"]?.nested?.properties["level2"]?.nested).toBeDefined();
  });
});

describe("Sanitization", () => {
  test("should sanitize reserved keywords", () => {
    const values = {
      default: "value",
      class: "test",
      function: "fn",
    };

    const result = convertToTypeScriptInterface(values, "TestValues");

    expect(result.properties['"default"']).toBeDefined();
    expect(result.properties['"class"']).toBeDefined();
    expect(result.properties['"function"']).toBeDefined();
  });

  test("should sanitize properties with special characters", () => {
    const values = {
      "kebab-case": "value",
      "dot.notation": "value",
      "space name": "value",
    };

    const result = convertToTypeScriptInterface(values, "TestValues");

    expect(result.properties['"kebab-case"']).toBeDefined();
    expect(result.properties['"dot.notation"']).toBeDefined();
    expect(result.properties['"space name"']).toBeDefined();
  });

  test("should handle properties starting with numbers", () => {
    const values = {
      "123start": "value",
    };

    const result = convertToTypeScriptInterface(values, "TestValues");

    expect(result.properties['"123start"']).toBeDefined();
  });
});

describe("Edge Cases", () => {
  test("should handle null values", () => {
    const values = { nullable: null };

    const result = convertToTypeScriptInterface(values, "TestValues");

    expect(result.properties["nullable"]?.type).toBe("unknown");
  });

  test("should handle undefined values", () => {
    const values = { undef: undefined };

    const result = convertToTypeScriptInterface(values, "TestValues");

    // undefined is treated as unknown type
    expect(result.properties["undef"]?.type).toBe("unknown");
  });

  test("should handle mixed array types", () => {
    const values = { mixed: [1, "two", true] };

    const result = convertToTypeScriptInterface(values, "TestValues");

    // Should create a union type or unknown[]
    expect(result.properties["mixed"]?.type).toBeTruthy();
  });

  test("should handle object array", () => {
    const values = {
      objArr: [
        { name: "a", value: 1 },
        { name: "b", value: 2 },
      ],
    };

    const result = convertToTypeScriptInterface(values, "TestValues");

    expect(result.properties["objArr"]?.type).toContain("[]");
  });
});

describe("Parameter Type Generation", () => {
  test("should generate flattened parameter type", () => {
    const tsInterface = {
      name: "TestValues",
      properties: {
        parent: {
          type: "TestValuesParent",
          optional: true,
          nested: {
            name: "TestValuesParent",
            properties: {
              child: {
                type: "string",
                optional: true,
              },
            },
          },
        },
      },
    };

    const code = generateTypeScriptCode(tsInterface, "test");

    expect(code).toContain("TestHelmParameters");
    expect(code).toContain('"parent.child"?');
  });
});
