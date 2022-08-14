<template>
  <q-btn
    v-if="$route.fullPath.includes('/post')"
    flat
    round
    :ripple="false"
    color="black"
    size="md"
    icon="bi-plus-circle-fill"
    @click="options()"
  />
  <q-btn
    v-else
    icon="bi-three-dots"
    flat
    dense
    :ripple="false"
    size="sm"
    class="text-black"
    @click="options()"
  />
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class PostOptionsComponent extends Vue {
  options() {
    this.$q
      .bottomSheet({
        message: "These features are not yet available.",
        grid: false,
        class: "q-px-sm q-py-md defaultfont text-bold text-body1",
        actions: [
          {
            label: "Report post",
            icon: "bi-flag",
          },
          {
            label: "Copy link",
            icon: "bi-link-45deg",
          },
        ],
      })
      .onOk(() => {
        // console.log('Action chosen:', action.id)
      })
      .onCancel(() => {
        // console.log('Dismissed')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  }
}
</script>
