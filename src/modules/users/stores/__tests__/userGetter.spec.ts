import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useUserGetterStore } from "../userGetter";
import { UserService, type UserStatusDTO, type RoleDTO } from "@/services/apis/user";
import { User } from "@/services/user/entities/User.entity";
import { GenericErrors } from "@/core/Errors";

describe("userGetterStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("getUsers", () => {
    describe("On success", () => {
      it("should return the awaited data when there is no user", async () => {
        const getterStore = useUserGetterStore();
        expect(getterStore.users).toEqual([]);
        UserService.fetchUsers = vi.fn().mockResolvedValueOnce([]);
        const apiResponse = await getterStore.getUsers();
        expect(apiResponse).toEqual({
          status: "success",
          data: [],
        });
      });

      it("should return the awaited data when there are users", async () => {
        const getterStore = useUserGetterStore();
        expect(getterStore.users).toEqual([]);
        const users = [
          {
            id: "78e394f2-f438-4314-b49c-b51bdb05a598",
            firstname: "wibrc",
            lastName: "ibrc",
            email: "wibrc@email.com",
            status: "ENABLED",
            roles: ["ADMIN", "CLIENT"]
          },
          {
            id: "aa1ee290-8425-415d-828f-41289c555229",
            firstname: "nbcbr",
            lastName: "brc",
            email: "nbcbr@email.com",
            status: "ENABLED",
            roles: ["ADMIN", "CLIENT", "REVISER"]
          }
        ];
        UserService.fetchUsers = vi.fn().mockResolvedValueOnce(users);
        const apiResponse = await getterStore.getUsers();
        expect(apiResponse).toEqual({
          status: "success",
          data: users.map((user) => new User({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastName,
            status: user.status as UserStatusDTO,
            roles: user.roles as RoleDTO[],
          }, user.id)),
        });
      });
    });

    describe("On failure", () => {
      it("should return the awaited response with message on failure", async () => {
        const getterStore = useUserGetterStore();
        expect(getterStore.users).toEqual([]);
        UserService.fetchUsers = vi.fn().mockRejectedValueOnce(new Error("End point not ready yet"));
        const apiResponse = await getterStore.getUsers();
        expect(apiResponse).toEqual({
          status: "error",
          message: "End point not ready yet",
        });
      });

      it("should return the awaited response even wit no message on failure", async () => {
        const getterStore = useUserGetterStore();
        expect(getterStore.users).toEqual([]);
        UserService.fetchUsers = vi.fn().mockRejectedValueOnce(new Error());
        const apiResponse = await getterStore.getUsers();
        expect(apiResponse).toEqual({
          status: "error",
          message: GenericErrors.UNKNOWN_ERROR,
        });
      });
    });
  });
});