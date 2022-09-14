<template>
  <page-header style="height: 4rem">
    <template #slot-left>
      <q-btn
        icon="bi-chevron-left"
        dense
        flat
        :ripple="false"
        size="sm"
        color="black"
        class="q-ml-md"
        @click="$router.go(-1)"
      />
    </template>
    <template #slot-middle>
      <div
        class="defaultfont-light text-bold text-black"
        style="font-size: medium"
      >
        Account settings
      </div>
    </template>
  </page-header>

  <q-page class="defaultfont">
    <div align="center" class="q-pa-md">
      <q-avatar size="6rem" class="bg-primary">
         <q-img v-if="currentUser.prfphoto" :src="`http://localhost:3000/prfmedia/${currentUser.prfphoto}`" class="avatar" />
         <q-img v-if="!currentUser.prfphoto" class="avatar q-pt-none q-mt-none" src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg" />
      </q-avatar>
      <div class="q-mt-sm defaultfont-semibold text-body1">
        @{{ currentUser.username }}
      </div>
    </div>

    <div class="q-px-md">
      <div @click="$router.push('/settings/edit+username')">
        <settings-menu class="q-py-xs">
          <template #title>Username</template>
          <template #icon>
            <q-icon name="bi-arrow-right-short" size="md" color="grey" />
          </template>
        </settings-menu>
      </div>
      <div @click="$router.push('/settings/edit+password')">
        <settings-menu class="q-py-xs">
          <template #title>Password</template>
          <template #icon>
            <q-icon name="bi-arrow-right-short" size="md" color="grey" />
          </template>
        </settings-menu>
      </div>
      <div @click="$router.push('/settings/edit+email')">
        <settings-menu class="q-py-xs">
          <template #title>E-mail</template>
          <template #icon>
            <q-icon name="bi-arrow-right-short" size="md" color="grey" />
          </template>
        </settings-menu>
      </div>
      <div @click="$router.push('/settings/edit+mobile')">
        <settings-menu class="q-py-xs">
          <template #title>Mobile number</template>
          <template #icon>
            <q-icon name="bi-arrow-right-short" size="md" color="grey" />
          </template>
        </settings-menu>
      </div>

      <div class="q-mt-lg q-mb-sm text-grey-7">Address information</div>
      <div @click="$router.push('/settings/edit+campus+housing')">
        <settings-menu class="q-py-xs">
          <template #title>Campus housing</template>
          <template #icon>
            <q-icon name="bi-arrow-right-short" size="md" color="grey" />
          </template>
        </settings-menu>
      </div>
      <div @click="$router.push('/settings/edit+address')">
        <settings-menu class="q-py-xs">
          <template #title>Address</template>
          <template #icon>
            <q-icon name="bi-arrow-right-short" size="md" color="grey" />
          </template>
        </settings-menu>
      </div>
    </div>
    <q-separator class="q-mt-md" />

    <div align="left" class="q-mt-lg q-px-lg q-pb-xl row items-center">
      <div align="left" class="col-10">
        <div class="defaultfont-semibold text-grey-8" style="font-size: medium">
          Delete account
        </div>
        <div class="defaultfont text-grey" style="font-size: smaller">
          Please proceed to the MSU Housing Management Division to delete your
          account.
        </div>
      </div>
      <div align="right" class="col">
        <q-icon name="bi-question-circle" size="lg" color="grey" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { AUser } from "src/store/auth/state";
import { Options, Vue } from "vue-class-component";
import { mapActions, mapState } from "vuex";

@Options({
  methods: {
    ...mapActions("auth", ["authUser"]),
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
  },
})

export default class StudentManageAccount extends Vue {

   authUser!: () => Promise<void>;
  currentUser!: AUser;

  async mounted() {
    await this.authUser();
  }
}
</script>
<style>
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50% !important;
  border: 2px solid rgb(190, 40, 45) !important;
}
</style>
