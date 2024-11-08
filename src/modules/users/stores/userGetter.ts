import { defineStore } from "pinia";
import { User } from "@services/user/entities/User.entity";
import { UserService } from "@services/apis/user";
import { GenericErrors, type ApiResponse } from "@core/Errors";

type State = {
  isLoggedIn: boolean;
  users: User[];
};
export const useUserGetterStore = defineStore("userGetters", {
  state: (): State => ({
    isLoggedIn: false,
    users: [],
  }),
  actions: {
    async getUsers(): Promise<ApiResponse<User[]>> {
      return UserService.fetchUsers()
        .then<ApiResponse<User[]>>((users) => {
          const userEntities = users.map(
            (user) =>
              new User(
                {
                  email: user.email,
                  lastname: user.lastName,
                  firstname: user.firstname,
                  status: user.status,
                  roles: user.roles,
                },
                user.id,
              ),
          );
          this.users = userEntities;
          return {
            status: "success",
            data: userEntities,
          };
        })
        .catch((error) => {
          const castedError = (error as Error);
          return {
            status: "error",
            message: castedError.message 
              ? castedError.message : GenericErrors.UNKNOWN_ERROR,
          };
        });
    },
  },
});
