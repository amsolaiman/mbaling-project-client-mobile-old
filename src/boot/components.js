import { boot } from "quasar/wrappers";

const components = {};

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  for (const key in components) {
    app.component(key, components[key]);
  }
});
