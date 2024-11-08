import { describe, expect, it } from "vitest";
import { setApiBaseUrl } from "../apiConfig";
import { OpenAPI } from "@/services/apis/user";

describe("apiConfig", () => {
  it("should set the config", () => {
    const apiUrl = "http://localhost:5173/api";
    process.env.VITE_API_URL = apiUrl;
    setApiBaseUrl();
    expect(OpenAPI.BASE).toBe(apiUrl);
  });
});