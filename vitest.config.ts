import { fileURLToPath } from "node:url";
import { configDefaults, defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        environment: "jsdom",
        root: fileURLToPath(new URL("./", import.meta.url)),
        exclude: [
          ...configDefaults.exclude,
          "e2e/*",
          "**/*.config.*",
          "**/*.d.ts",
          "**/*.cjs",
          "**/src/main.ts",
          "**/cypress/**",
        ],
        coverage: {
          provider: "v8",
          reporter: ["text", "json-summary", "json", "lcovonly"],
          reportOnFailure: true,
          thresholds: {
            lines: 90,
            branches: 90,
            functions: 86,
            statements: 90,
          },
          cleanOnRerun: true,
          exclude: [
            ...configDefaults.exclude,
            "**/src/router/*.ts",
            "**/src/services/apis/**",
            "**/__mocks__/**",
            "**/__tests__/**",
            "**/icons/**",
            "**/*.config.*",
            "**/src/main.ts",
            "**/*.d.ts",
            "**/*.cjs",
            "**/*.spec.ts",
          ],
        },
      },
    }),
  ),
);
