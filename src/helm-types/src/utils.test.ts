import { describe, test, expect } from "bun:test";
import { capitalizeFirst, sanitizePropertyName, sanitizeTypeName } from "./utils";

describe("Utils - capitalizeFirst", () => {
  test("should capitalize first letter", () => {
    expect(capitalizeFirst("hello")).toBe("Hello");
    expect(capitalizeFirst("world")).toBe("World");
  });

  test("should handle already capitalized strings", () => {
    expect(capitalizeFirst("Hello")).toBe("Hello");
  });

  test("should handle single character", () => {
    expect(capitalizeFirst("a")).toBe("A");
  });

  test("should handle empty string", () => {
    expect(capitalizeFirst("")).toBe("");
  });
});

describe("Utils - sanitizePropertyName", () => {
  test("should not quote valid property names", () => {
    expect(sanitizePropertyName("validName")).toBe("validName");
    expect(sanitizePropertyName("camelCase")).toBe("camelCase");
    expect(sanitizePropertyName("snake_case")).toBe("snake_case");
    expect(sanitizePropertyName("with123")).toBe("with123");
  });

  test("should quote reserved keywords", () => {
    expect(sanitizePropertyName("default")).toBe('"default"');
    expect(sanitizePropertyName("class")).toBe('"class"');
    expect(sanitizePropertyName("import")).toBe('"import"');
    expect(sanitizePropertyName("export")).toBe('"export"');
    expect(sanitizePropertyName("return")).toBe('"return"');
  });

  test("should quote properties with special characters", () => {
    expect(sanitizePropertyName("my-property")).toBe('"my-property"');
    expect(sanitizePropertyName("my.property")).toBe('"my.property"');
    expect(sanitizePropertyName("my property")).toBe('"my property"');
    expect(sanitizePropertyName("my@property")).toBe('"my@property"');
  });

  test("should quote properties starting with numbers", () => {
    expect(sanitizePropertyName("123abc")).toBe('"123abc"');
    expect(sanitizePropertyName("1st")).toBe('"1st"');
  });

  test("should allow properties with $ in them", () => {
    expect(sanitizePropertyName("$property")).toBe("$property");
    expect(sanitizePropertyName("my$var")).toBe("my$var");
  });
});

describe("Utils - sanitizeTypeName", () => {
  test("should remove special characters", () => {
    expect(sanitizeTypeName("my-type")).toBe("mytype");
    expect(sanitizeTypeName("my.type")).toBe("mytype");
    expect(sanitizeTypeName("my_type")).toBe("mytype");
    expect(sanitizeTypeName("my@type")).toBe("mytype");
  });

  test("should remove leading digits", () => {
    expect(sanitizeTypeName("123type")).toBe("type");
    expect(sanitizeTypeName("456abc")).toBe("abc");
  });

  test("should return fallback for empty result", () => {
    expect(sanitizeTypeName("123")).toBe("Property");
    expect(sanitizeTypeName("@#$")).toBe("Property");
  });

  test("should preserve alphanumeric characters", () => {
    expect(sanitizeTypeName("MyType123")).toBe("MyType123");
    expect(sanitizeTypeName("CamelCase")).toBe("CamelCase");
  });
});
