<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal class="q-pb-lg bg-transparent flex flex-center">
      <q-btn-group
        rounded
        flat
        spread
        class="bg-secondary text-primary box-shadow"
        style="height: 3.5rem"
      >
        <q-btn
          :ripple="false"
          size="lg"
          style="width: 5rem"
          @click="$router.push('/student/home')"
        >
          <i
            :class="
              $route.fullPath.includes('/student/home')
                ? 'mbi-home-fill'
                : 'mbi-home'
            "
          />
        </q-btn>

        <q-btn
          :ripple="false"
          size="lg"
          style="width: 5rem"
          @click="$router.push('/student/search')"
        >
          <i
            :class="
              $route.fullPath.includes('/student/search')
                ? 'mbi-search-fill'
                : 'mbi-search'
            "
          />
        </q-btn>

        <!-- <q-btn
          :ripple="false"
          size="lg"
          style="width: 5rem"
          @click="$router.push('/student/inbox')"
        >
          <i
            :class="
              $route.fullPath.includes('/student/inbox')
                ? 'mbi-inbox-fill'
                : 'mbi-inbox'
            "
          />
        </q-btn> -->

        <q-btn
          :ripple="false"
          size="lg"
          style="width: 5rem"
          @click="$router.push('/student/account')"
        >
          <i
            :class="
              $route.fullPath.includes('/student/account')
                ? 'mbi-account-fill'
                : 'mbi-account'
            "
          />
        </q-btn>

        <q-btn
          :ripple="false"
          size="lg"
          style="width: 5rem"
          @click="$router.push('/student/settings')"
        >
          <i
            :class="
              $route.fullPath.includes('/student/settings')
                ? 'mbi-settings-fill'
                : 'mbi-settings'
            "
          />
        </q-btn>
      </q-btn-group>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class MainLayoutStudent extends Vue {}
</script>

<style>
.box-shadow {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5) !important;
}
</style>
