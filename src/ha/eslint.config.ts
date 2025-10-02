import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig(
  eslint.configs.recommended,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore-error -- https://github.com/typescript-eslint/typescript-eslint/issues/10899
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "as",
          objectLiteralTypeAssertions: "never",
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: "UnaryExpression[operator='typeof']",
          message: "Prefer Zod schema validation over typeof operator. Use z.string(), z.number(), etc. instead.",
        },
        {
          selector: "CallExpression[callee.object.name='Array'][callee.property.name='isArray']",
          message: "Prefer Zod schema validation over Array.isArray(). Use z.array() instead.",
        },
        {
          selector: "BinaryExpression[operator='instanceof']",
          message:
            "Prefer Zod schema validation over instanceof operator. Use appropriate z.instanceof() or custom Zod schemas instead.",
        },
        {
          selector: "CallExpression[callee.object.name='Number'][callee.property.name='isInteger']",
          message: "Prefer Zod schema validation over Number.isInteger(). Use z.number().int() instead.",
        },
        {
          selector: "CallExpression[callee.object.name='Number'][callee.property.name='isNaN']",
          message:
            "Prefer Zod schema validation over Number.isNaN(). Use z.number() with proper error handling instead.",
        },
        {
          selector: "CallExpression[callee.object.name='Number'][callee.property.name='isFinite']",
          message: "Prefer Zod schema validation over Number.isFinite(). Use z.number().finite() instead.",
        },
        {
          selector: "TSTypePredicate",
          message:
            "Prefer Zod schema validation over type guard functions. Use z.schema.safeParse() instead of custom type guards.",
        },
        {
          selector: "TSTypeAssertion:not([typeAnnotation.type='TSUnknownKeyword'])",
          message:
            "Type assertions are not allowed except for casting to 'unknown'. Use 'value as unknown' if you need to cast to unknown, otherwise use Zod schema validation.",
        },
        {
          selector:
            "TSAsExpression:not([typeAnnotation.type='TSUnknownKeyword']):not([typeAnnotation.type='TSTypeReference'][typeAnnotation.typeName.name='const'])",
          message:
            "Type assertions are not allowed except for casting to 'unknown' or 'as const'. Use 'value as unknown' if you need to cast to unknown, 'value as const' for const assertions, otherwise use Zod schema validation.",
        },
      ],
    },
  },
  {
    ignores: ["dist/", "node_modules/", "imports/", "src/hass/"],
  },
);
