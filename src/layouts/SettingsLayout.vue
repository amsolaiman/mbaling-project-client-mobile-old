<template>
  <transition
    appear
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight"
  >
    <q-layout view="hHh lpR fFf">
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </transition>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class SettingsLayout extends Vue {}
</script>
