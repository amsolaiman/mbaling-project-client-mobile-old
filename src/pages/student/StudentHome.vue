<template>
  <q-header class="sHome__header">
    <div>FOR YOU</div>
  </q-header>

  <q-page>
    <post-feed />
  </q-page>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class StudentHome extends Vue {}
</script>

<style scoped>
.sHome__header {
  background: var(--color-secondary);
  align-items: center;
  height: 3rem;
  padding: 0.6rem 1.8rem;
}

.sHome__header div {
  color: #000000;
  font-size: 1.2rem;
  font-weight: 700;
}
</style>
