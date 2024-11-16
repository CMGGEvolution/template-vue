import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import WelcomeItem from "../WelcomeItem.vue";

describe("WelcomeItem", () => {
  const welcomeItemWrapper = mount(WelcomeItem, {
    slots: {
      default: "<div>Here we are</div>",
      icon: "icon",
      heading: "Community",
    }
  });

  it("should render correctly", () => {
    expect(welcomeItemWrapper.exists()).toBe(true);
  });

  it("should render icon", () => {
    expect(welcomeItemWrapper.find("[data-test='icon']").text()).toBe("icon");
  });

  it("should render heading", () => {
    expect(welcomeItemWrapper.find("[data-test='heading']").text()).toBe("Community");
  });

  it("should render the default text", () => {
    expect(welcomeItemWrapper.html()).toContain("<div>Here we are</div>");
  });
});