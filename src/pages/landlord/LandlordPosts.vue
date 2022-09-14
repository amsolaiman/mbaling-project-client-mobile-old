<template>
  <page-header style="height: 3rem">
    <template #slot-middle>
      <div class="defaultfont-bold text-black" style="font-size: large">
        MANAGE
      </div>
    </template>
  </page-header>

  <q-page class="defaultfont bg-secondary">
    <post-list />
  </q-page>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class LandlordPosts extends Vue {}
</script>
