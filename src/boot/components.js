import { boot } from "quasar/wrappers";

const components = {
  "post-feed": require("components/post/PostFeed").default,
  "post-manage": require("components/post/PostManage").default,
  "post-options": require("components/post/PostOptions").default,
};

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  for (const key in components) {
    app.component(key, components[key]);
  }
});
