import { defineConfig } from "eslint/config";
import rootConfig from "../../eslint.config";

export default defineConfig(...rootConfig, {
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["eslint.config.ts"],
      },
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
