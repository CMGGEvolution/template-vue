import pluginEpsVue from "eslint-config-epsvue";

export default [
  ...pluginEpsVue,
  {
    ignores: ["src/services/apis/**"],
  },
];
