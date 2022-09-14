<template>
  <div class="row items-center bg-secondary">
    <div align="left" class="col-10">
      <q-item-label
        lines="1"
        class="defaultfont-semibold"
        style="font-size: large"
      >
        <slot name="title" />
      </q-item-label>
    </div>
    <div align="right" class="col">
      <slot name="icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class SettingsMenuComponent extends Vue {}
</script>
