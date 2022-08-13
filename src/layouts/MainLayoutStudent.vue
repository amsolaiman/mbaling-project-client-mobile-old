<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <nav>
      <q-btn-group flat spread class="btn__group">
        <q-btn
          :ripple="false"
          size="lg"
          style="width: 4rem"
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
          style="width: 4rem"
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

        <q-btn
          :ripple="false"
          size="lg"
          style="width: 4rem"
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
          style="width: 4rem"
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
    </nav>
  </q-layout>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class MainLayoutStudent extends Vue {}
</script>

<style scoped>
nav {
  background: var(--color-secondary);
  width: max-content;
  display: block;
  z-index: 2;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 2rem;
  border-radius: 3rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5) !important;
}

.btn__group {
  background: transparent;
  height: 3.7rem;
  color: var(--color-primary);
  padding: 0 0.8rem;
}
</style>
