import { flushPromises, mount, VueWrapper } from "@vue/test-utils";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import AboutView from "../AboutView.vue";
import { createTestingPinia } from "@pinia/testing";
import { useUserGetterStore } from "../../stores/userGetter";
import { User } from "@/services/user/entities/User.entity";

describe("AboutView", () => {
  const pinia = createTestingPinia({
    createSpy: vi.fn(),
  });
  
  let aboutViewWrapper: VueWrapper;
  const getterUserStore = useUserGetterStore(pinia);
  beforeAll(async () => {
    getterUserStore.getUsers = vi.fn().mockReturnValue({
      status: "success",
      data: [],
    });
    aboutViewWrapper = mount(AboutView, {
      global: {
        plugins: [pinia],
      },
    });
    await flushPromises();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("should render correctly", () => {
    expect(aboutViewWrapper.exists()).toBe(true);
  });

  it("should render the title", () => {
    expect(aboutViewWrapper.find("[data-test='title']").text()).toBe(
      "This is an about page",
    );
  });

  it("should display the awaited text where there is no user", () => {
    expect(aboutViewWrapper.find("[data-test='no-user']").text()).toBe(
      "No users",
    );
  });

  describe("With users", () => {
    const userList = [
      new User({
        email: "admin@gmail.com",
        firstname: "admin",
        lastname: "admin",
        status: "DISABLED",
        roles: ["ADMIN"]
      }, "ffd84306-6970-4226-9fe3-d8e03cf4faf3"),
      new User({
        email: "user@gmail.com",
        firstname: "user",
        lastname: "user",
        status: "SUSPENDED",
        roles: ["CLIENT"]
      }, "e4b344ed-b24c-4356-b86f-5f8a83a3ef2b")
    ];

    beforeAll(async () => {
      getterUserStore.getUsers = vi.fn().mockReturnValue({
        status: "success",
        data: userList,
      });

      aboutViewWrapper = mount(AboutView, {
        global: {
          plugins: [pinia],
        },
      });
      await flushPromises();
    });
  
    afterAll(() => {
      vi.clearAllMocks();
    });
  
    it("should render correctly", () => {
      expect(aboutViewWrapper.exists()).toBe(true);
    });

    it("should not display the text where there is no user", () => {
      expect(aboutViewWrapper.find("[data-test='no-user']").exists()).toBe(false);
    });

    it("should display the users", () => {
      const users = aboutViewWrapper.findAll("[data-test='user']");
      expect(users.length).toBe(2);

      users.forEach((user, index) => {
        expect(user.find("[data-test='email']").text()).toBe(userList[index].email);
        expect(user.find("[data-test='firstname']").text()).toBe(userList[index].firstname);
        expect(user.find("[data-test='lastName']").text()).toBe(userList[index].lastname);
        expect(user.find("[data-test='status']").text()).toBe(userList[index].status);
        expect(user.find("[data-test='roles']").text()).toBe(userList[index].roles.toString());
      });
    });
  });
});
