import { describe, expect, it } from "vitest";
import { TextUtils } from "../string";

describe("String", () => {
  describe("isAtLeast", () => {
    it("should return false when the number of character in text is less than 4", () => {
      expect(TextUtils.isAtLeast(4, "wib")).toBe(false);
    });

    it("should return true when the number of character in text is 4", () => {
      expect(TextUtils.isAtLeast(4, "wibr")).toBe(true);
    });

    it("should return true when the number of character in text is more than 4", () => {
      expect(TextUtils.isAtLeast(4, "wibrc")).toBe(true);
    });
  });

  describe("isAtMost", () => {
    it("should return false when the number of character in text is more than 4", () => {
      expect(TextUtils.isAtMost(4, "wibrc")).toBe(false);
    });
  
    it("should return true when the number of character in text is 4", () => {
      expect(TextUtils.isAtMost(4, "wibr")).toBe(true);
    });
  
    it("should return true when the number of character in text is less than 4", () => {
      expect(TextUtils.isAtMost(4, "wib")).toBe(true);
    });
  });
});