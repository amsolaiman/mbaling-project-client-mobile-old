<template>
  <q-header
    class="q-px-md header bg-secondary row items-center"
    style="height: 3rem"
  >
    <div class="defaultfont-bold text-black" style="font-size: large">
      FOR YOU
    </div>
  </q-header>

  <q-page class="bg-secondary">
    <!-- POST COMPONENT -->
    <post-feed />

    <!-- NO POSTS WARNING -->
    <div class="flex flex-center" style="height: 8rem">
      <q-spinner color="primary" size="3rem" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class StudentHome extends Vue {}
</script>
