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
          @click="$router.push('/landlord/home')"
        >
          <i
            :class="
              $route.fullPath.includes('/landlord/home')
                ? 'mbi-home-fill'
                : 'mbi-home'
            "
          />
        </q-btn>

        <q-btn
          :ripple="false"
          size="lg"
          style="width: 5rem"
          @click="$router.push('/landlord/posts')"
        >
          <i
            :class="
              $route.fullPath.includes('/landlord/posts')
                ? 'mbi-post-fill'
                : 'mbi-post'
            "
          />
        </q-btn>

        <!-- <q-btn
          :ripple="false"
          size="lg"
          style="width: 5rem"
          @click="$router.push('/landlord/inbox')"
        >
          <i
            :class="
              $route.fullPath.includes('/landlord/inbox')
                ? 'mbi-inbox-fill'
                : 'mbi-inbox'
            "
          />
        </q-btn> -->

        <q-btn
          :ripple="false"
          size="lg"
          style="width: 5rem"
          @click="$router.push('/landlord/account')"
        >
          <i
            :class="
              $route.fullPath.includes('/landlord/account')
                ? 'mbi-account-fill'
                : 'mbi-account'
            "
          />
        </q-btn>

        <q-btn
          :ripple="false"
          size="lg"
          style="width: 5rem"
          @click="$router.push('/landlord/settings')"
        >
          <i
            :class="
              $route.fullPath.includes('/landlord/settings')
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

export default class MainLayoutLandlord extends Vue {}
</script>

<style>
.box-shadow {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5) !important;
}
</style>
