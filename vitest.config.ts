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
          reporter: ["text", "json-summary", "json"],
          reportOnFailure: true,
          thresholds: {
            lines: 20,
            branches: 20,
            functions: 20,
            statements: 20,
          },
          cleanOnRerun: true,
          exclude: [
            ...configDefaults.exclude,
            "**/src/router/*.ts",
            "**/__mocks__/**",
            "**/*.config.*",
            "**/src/main.ts",
            "**/*.d.ts",
            "**/*.cjs",
          ],
        },
      },
    }),
  ),
);
