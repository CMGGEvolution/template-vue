import { describe, expect, it } from "vitest";
import { setApiBaseUrl } from "../apiConfig";
import { OpenAPI } from "@/services/apis/user";

describe("apiConfig", () => {
  it("should set the config", () => {
    setApiBaseUrl();
    expect(OpenAPI.BASE).toBe(import.meta.env.VITE_API_URL);
  });
});