<template>
  <div class="greetings">
    <h1
      class="green"
      data-test="greet-title"
    >
      {{ msg }}:
      <strong><mark>{{ t("title") }}</mark></strong>
    </h1>
    <h3 data-test="congratulation">
      You’ve successfully created a project with <mark>{{ t("hello") }}</mark>
      <a
        href="https://vitejs.dev/"
        target="_blank"
        rel="noopener"
        data-test="vite-dev"
      >Vite</a> +
      <a
        href="https://vuejs.org/"
        target="_blank"
        rel="noopener"
        data-test="vue-doc"
      >Vue 3</a>.
      What's next?
    </h3>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import i18nMessages from "@/modules/users/i18n.json";

defineProps<{
  msg: string;
}>();
const { t } = useI18n({
  inheritLocale: true, // to inherit the root translation
  messages: i18nMessages,
});
</script>
<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (width >= 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
