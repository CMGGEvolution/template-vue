import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import App from "./App.vue";
import TheHeader from "@modules/users/components/TheHeader.vue";

describe("App", () => {
  const appWrapper = shallowMount(App, {
    global: {
      stubs: ["RouterView"],
    }
  });

  it("should render correctly", () => {
    expect(appWrapper.exists()).toBe(true);
  });

  it("should render the header", () => {
    expect(appWrapper.findComponent(TheHeader).exists()).toBe(true);
  });

  it("should render the component that will be replace by the route (RouterView)", () => {
    expect(appWrapper.findComponent("router-view-stub").exists()).toBe(true);
  });
});