<template>
  <q-header class="bg-secondary row items-center">
    <div align="left" class="col">
      <slot name="slot-left" />
    </div>
    <div align="center" class="col absolute-center">
      <slot name="slot-middle" />
    </div>
    <div align="right" class="col">
      <slot name="slot-right" />
    </div>
  </q-header>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class PageHeaderComponent extends Vue {}
</script>
