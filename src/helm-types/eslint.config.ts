import { defineConfig } from "eslint/config";
import rootConfig from "../../eslint.config.ts";

export default defineConfig(...rootConfig, {
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
