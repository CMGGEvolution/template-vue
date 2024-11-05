<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <div v-for="user in users" :key="user.id">
        <p>{{ user.email }}</p>
        <p>{{ user.firstname }}</p>
        <p>{{ user.lastName }}</p>
        <p>{{ user.status }}</p>
        <p>{{ user.roles }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserGetterStore } from "@modules/users/stores/userGetter";
import { computed, onBeforeMount } from "vue";

const userGetterStore = useUserGetterStore();
onBeforeMount(async () => {
  await userGetterStore.getUsers();
});

type User = {
  id: string;
  email: string;
  firstname: string;
  lastName: string;
  status: string;
  roles: string[];
};
const users = computed<User[]>(() =>
  userGetterStore.users.map((user) => ({
    id: user.id.toString(),
    email: user.email.toString(),
    firstname: user.firstname,
    lastName: user.lastname,
    status: user.status,
    roles: user.roles,
  })),
);
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
