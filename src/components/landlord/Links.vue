<template>
  <div>
    <div class="q-px-sm q-pb-md">
      <div align="left" class="row items-center">
        <div align="left" class="col-10">
          <div
            class="defaultfont-semibold text-grey-8"
            style="font-size: medium"
          >
            Set chat link
          </div>
          <div class="defaultfont text-grey" style="font-size: smaller">
            Please input below your Facebook Messenger username to connect it
            with your account. <br />
            Click the icon on the right for tutorial.
          </div>
        </div>
        <div align="right" class="col">
          <q-icon
            name="bi-question-circle"
            size="lg"
            color="grey"
            @click="$router.push('/tutorial/chatlink')"
          />
        </div>
      </div>
      <q-form @submit="chatlinkSave(currentUser)">
        <q-input
          type="url"
          :disable="!chatlinkEdit"
          v-model="inputAccount.chatLink"
          dense
          class="q-mb-xs"
          style="font-size: medium"
        />
        <div align="right">
          <q-btn
            v-show="chatlinkEdit"
            label="Save"
            dense
            unelevated
            rounded
            no-caps
            color="primary"
            class="text-center text-caption"
            style="width: 4rem"
            type="submit"
          />
          <q-btn
            v-show="!chatlinkEdit"
            v-on:click="chatlinkEdit = !chatlinkEdit"
            label="Edit"
            dense
            outline
            rounded
            no-caps
            color="primary"
            class="text-center text-caption"
            style="width: 4rem"
          />
        </div>
      </q-form>
    </div>

    <div class="q-px-sm q-pb-lg">
      <div align="left" class="row items-center">
        <div align="left" class="col-10">
          <div
            class="defaultfont-semibold text-grey-8"
            style="font-size: medium"
          >
            Set map link
          </div>
          <div class="defaultfont text-grey" style="font-size: smaller">
            Please input below the link of your Google Map location to connect
            it with your account. <br />
            Click the icon on the right for tutorial.
          </div>
        </div>
        <div align="right" class="col">
          <q-icon
            name="bi-question-circle"
            size="lg"
            color="grey"
            @click="$router.push('/tutorial/maplink')"
          />
        </div>
      </div>
      <q-form @submit="maplinkSave(currentUser)">
        <q-input
          type="url"
          :disable="!maplinkEdit"
          v-model="inputAccount.mapLink"
          dense
          class="q-mb-xs"
          style="font-size: medium"
        />
        <div align="right">
          <q-btn
            v-show="maplinkEdit"
            label="Save"
            dense
            unelevated
            rounded
            no-caps
            color="primary"
            class="text-center text-caption"
            style="width: 4rem"
            type="submit"
          />
          <q-btn
            v-show="!maplinkEdit"
            v-on:click="maplinkEdit = !maplinkEdit"
            label="Edit"
            dense
            outline
            rounded
            no-caps
            color="primary"
            class="text-center text-caption"
            style="width: 4rem"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { UserDto } from "src/services/rest-api";
import { AUser } from "src/store/auth/state";
import { Options, Vue } from "vue-class-component";
import { mapActions, mapState } from "vuex";

@Options({
  methods: {
    ...mapActions("auth", ["authUser"]),
    ...mapActions("account", ["editAccount", "getAllUser"]),
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
  },
})

export default class FeatureLinks extends Vue {
  editAccount!: (payload: UserDto) => Promise<void>;
  authUser!: () => Promise<void>;
  currentUser!: any;
  chatlinkEdit = false;
  maplinkEdit = false;

  async mounted() {
    await this.authUser();
    this.inputAccount = { ...this.currentUser };
  }

  inputAccount: any = {
    chatLink: "",
    mapLink: "",
  };

  async chatlinkSave(val: AUser) {
    await this.editAccount(this.inputAccount);
    this.inputAccount = { ...val };
    this.$q
      .dialog({
        title: "Confirm Edit",
        message: "Are you sure you want to publish the changes?",
        cancel: true,
        persistent: true,
        class: "defaultfont",
      })
      .onOk(() => {
        this.chatlinkEdit = !this.chatlinkEdit;
        window.location.reload();
      });
  }
  async maplinkSave(val: AUser) {
    await this.editAccount(this.inputAccount);
    this.inputAccount = { ...val };
    this.$q
      .dialog({
        title: "Confirm Edit",
        message: "Are you sure you want to publish the changes?",
        cancel: true,
        persistent: true,
        class: "defaultfont",
      })
      .onOk(() => {
        this.maplinkEdit = !this.maplinkEdit;
        window.location.reload();
      });
  }
}
</script>
