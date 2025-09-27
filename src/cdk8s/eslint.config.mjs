// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
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
          assertionStyle: "never",
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: "UnaryExpression[operator='typeof']",
          message:
            "Prefer Zod schema validation over typeof operator. Use z.string(), z.number(), etc. instead.",
        },
        {
          selector:
            "CallExpression[callee.object.name='Array'][callee.property.name='isArray']",
          message:
            "Prefer Zod schema validation over Array.isArray(). Use z.array() instead.",
        },
        {
          selector: "BinaryExpression[operator='instanceof']",
          message:
            "Prefer Zod schema validation over instanceof operator. Use appropriate z.instanceof() or custom Zod schemas instead.",
        },
        {
          selector:
            "CallExpression[callee.object.name='Number'][callee.property.name='isInteger']",
          message:
            "Prefer Zod schema validation over Number.isInteger(). Use z.number().int() instead.",
        },
        {
          selector:
            "CallExpression[callee.object.name='Number'][callee.property.name='isNaN']",
          message:
            "Prefer Zod schema validation over Number.isNaN(). Use z.number() with proper error handling instead.",
        },
        {
          selector:
            "CallExpression[callee.object.name='Number'][callee.property.name='isFinite']",
          message:
            "Prefer Zod schema validation over Number.isFinite(). Use z.number().finite() instead.",
        },
        {
          selector: "TSTypePredicate",
          message:
            "Prefer Zod schema validation over type guard functions. Use z.schema.safeParse() instead of custom type guards.",
        },
      ],
    },
  },
  {
    ignores: ["dist/", "node_modules/", "imports/"],
  },
);
