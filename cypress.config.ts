import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "frc51p", // replace this with your project Id
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:4173",
  },
});
