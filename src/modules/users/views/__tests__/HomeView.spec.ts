import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import HomeView from "../HomeView.vue";
import TheWelcome from "../../components/TheWelcome.vue";

describe("HomeView", () => {
  const homeViewWrapper = shallowMount(HomeView);

  it("should render correctly", () => {
    expect(homeViewWrapper.exists()).toBe(true);
  });

  it("should render the welcome component", () => {
    expect(homeViewWrapper.findComponent(TheWelcome).exists()).toBe(true);
  });
});