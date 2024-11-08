import { mount, RouterLinkStub } from "@vue/test-utils";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import HelloWorld from "../HelloWorld.vue";
import TheHeader from "../TheHeader.vue";

describe("TheHeader", () => {
  beforeAll(() => {
    vi.mock("vue-i18n");
  });
    
  afterAll(() => {
    vi.clearAllMocks();
  });
    
  const headerWrapper = mount(TheHeader, {
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
      }
    }
  });

  it("should render correctly", () => {
    expect(headerWrapper.exists()).toBe(true);
  });

  it("should render hello world component with awaited props", () => {
    const helloWorld = headerWrapper.findComponent(HelloWorld);
    expect(helloWorld.exists()).toBe(true);
    expect(helloWorld.props().msg).toBe("You did it!");
  });

  it("should render the vue logo with awaited attributes", () => {
    const vueLogo = headerWrapper.find("[data-test='vue-logo']");
    expect(vueLogo.exists()).toBe(true);

    expect(vueLogo.attributes().src).toBe("/src/assets/logo.svg");
    expect(vueLogo.attributes().alt).toBe("Vue logo");
  });

  describe("Navigation", () => {
    it("should render the menu home", () => {
      const menuHome = headerWrapper.findComponent(RouterLinkStub);
      expect(menuHome.exists()).toBe(true);
      expect(menuHome.props().to).toBe("/");
      expect(menuHome.text()).toBe("Home");
    });

    it("should render the menu about", () => {
      const menuAbout = headerWrapper.findAllComponents(RouterLinkStub)[1];
      expect(menuAbout.exists()).toBe(true);
      expect(menuAbout.props().to).toBe("/about");
      expect(menuAbout.text()).toBe("About");
    });
  });
});