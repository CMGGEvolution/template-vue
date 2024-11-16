import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { mount } from "@vue/test-utils";
import HelloWorld from "../HelloWorld.vue";

describe("HelloWorld", () => {
  beforeAll(() => {
    vi.mock("vue-i18n");
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  const wrapper = mount(HelloWorld, { props: { msg: "Hello Vitest" } });
  
  it("renders properly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the greet title", () => {
    expect(wrapper.find("[data-test='greet-title']").text()).toBe("Hello Vitest: title");
  });

  it("renders the congratulations properly", () => {
    const congratulation = wrapper.find("[data-test='congratulation']");
    expect(congratulation.exists()).toBe(true);
    expect(congratulation.text()).toContain("You’ve successfully created a project with");
    expect(congratulation.text()).toContain("What's next?");
    expect(congratulation.text()).toContain("+");

    const viteDevLink = congratulation.find("[data-test='vite-dev']");
    expect(viteDevLink.exists()).toBe(true);
    expect(viteDevLink.attributes().href).toBe("https://vitejs.dev/");
    expect(viteDevLink.attributes().target).toBe("_blank");
    expect(viteDevLink.text()).toBe("Vite");

    const vueDocLink = congratulation.find("[data-test='vue-doc']");
    expect(vueDocLink.exists()).toBe(true);
    expect(vueDocLink.attributes().href).toBe("https://vuejs.org/");
    expect(vueDocLink.attributes().target).toBe("_blank");
    expect(vueDocLink.text()).toBe("Vue 3");
  });
});
