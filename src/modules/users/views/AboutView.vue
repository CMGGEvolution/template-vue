<template>
  <div class="about">
    <h1 data-test="title">
      This is an about page
    </h1>
    <div>
      <template v-if="users.length > 0">
        <div
          v-for="user in users"
          :key="user.id"
          data-test="user"
          :data-test-id="`user-${user.id}`"
        >
          <address data-test="email">
            {{ user.email }}
          </address>
          <p data-test="firstname">
            {{ user.firstname }}
          </p>
          <p data-test="lastName">
            {{ user.lastName }}
          </p>
          <p data-test="status">
            {{ user.status }}
          </p>
          <p data-test="roles">
            {{ user.roles }}
          </p>
        </div>
      </template>
      <div
        v-else
        data-test="no-user"
      >
        No users
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserGetterStore } from "@modules/users/stores/userGetter";
import { onBeforeMount, ref } from "vue";

type User = {
  id: string;
  email: string;
  firstname: string;
  lastName: string;
  status: string;
  roles: string;
};

const userGetterStore = useUserGetterStore();
const users = ref<User[]>([]);
onBeforeMount(async () => {
  const apiUsers = await userGetterStore.getUsers();

  if (apiUsers.status === "success") {
    users.value = apiUsers.data.map((user) => ({
      id: user.id.toString(),
      email: user.email.toString(),
      firstname: user.firstname,
      lastName: user.lastname,
      status: user.status,
      roles: user.roles.toString(),
    }));
  }
});


</script>
<style>
@media (width >= 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
