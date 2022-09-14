<template>
  <page-header style="height: 4rem">
    <!-- <template #slot-left>
      <q-btn
        icon="bi-chevron-left"
        :ripple="false"
        dense
        flat
        size="sm"
        color="black"
        class="q-ml-md"
        @click="$router.go(-1)"
      />
    </template> -->
    <template #slot-middle>
      <div
        class="defaultfont-light text-bold text-black"
        style="font-size: medium"
      >
        Settings
      </div>
    </template>
  </page-header>

  <q-page class="q-pa-md defaultfont">
    <div class="q-my-sm text-grey-7">Account information</div>
    <div @click="$router.push('/landlord/settings/edit/profile')">
      <settings-menu class="q-py-xs">
        <template #title>Edit profile</template>
        <template #icon>
          <q-icon name="bi-arrow-right-short" size="md" color="black" />
        </template>
      </settings-menu>
    </div>
    <div @click="$router.push('/landlord/settings/edit/account')">
      <settings-menu class="q-py-xs">
        <template #title>Account settings</template>
        <template #icon>
          <q-icon name="bi-arrow-right-short" size="md" color="black" />
        </template>
      </settings-menu>
    </div>
    <div @click="alert()">
      <settings-menu class="q-py-xs">
        <template #title>Privacy</template>
        <template #icon>
          <q-icon name="bi-arrow-right-short" size="md" color="black" />
        </template>
      </settings-menu>
    </div>

    <div class="q-mt-lg q-mb-sm text-grey-7">Support</div>
    <div @click="alert()">
      <settings-menu class="q-py-xs">
        <template #title>Feedback</template>
        <template #icon>
          <q-icon
            name="bi-arrow-up-short"
            size="md"
            color="black"
            style="transform: rotate(45deg)"
          />
        </template>
      </settings-menu>
    </div>
    <div @click="alert()">
      <settings-menu class="q-py-xs">
        <template #title>Terms & privacy</template>
        <template #icon>
          <q-icon
            name="bi-arrow-up-short"
            size="md"
            color="black"
            style="transform: rotate(45deg)"
          />
        </template>
      </settings-menu>
    </div>
    <div @click="$router.push('/settings/about')">
      <settings-menu class="q-py-xs">
        <template #title>About</template>
        <template #icon>
          <q-icon name="bi-arrow-right-short" size="md" color="black" />
        </template>
      </settings-menu>
    </div>

    <div class="q-mt-lg q-mb-sm text-grey-7">Actions</div>
    <div @click="$router.replace('/')">
      <settings-menu class="q-py-xs">
        <template #title>Log out</template>
      </settings-menu>
    </div>
  </q-page>

  <q-footer class="bg-secondary" style="height: 8rem">
    <div align="center">
      <q-img src="~assets/mbaling-logo-horizontal.svg" style="width: 6rem" />
    </div>
  </q-footer>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class LandlordSettings extends Vue {
  alert() {
    this.$q.dialog({
      message: "This feature is not available yet.",
      class: "defaultfont",
    });
  }
}
</script>
