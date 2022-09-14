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
        Username
      </div>
    </template>
    <template #slot-right>
      <q-btn
        v-if="!editButton"
        label="Edit"
        unelevated
        rounded
        no-caps
        outline
        color="primary"
        class="q-mr-md defaultfont"
        style="height: 3rem; width: 4rem"
        @click="onEdit(currentUser)"
      />
      <q-btn
        v-else
        label="Save"
        unelevated
        rounded
        no-caps
        color="primary"
        class="q-mr-md defaultfont"
        style="height: 3rem; width: 4rem"
        @click="onSave()"
      />
    </template>
  </page-header>

  <q-page v-if="!editButton" class="q-px-md q-pb-xl defaultfont bg-secondary">
    <div class="q-pt-md">
      <q-input
        v-model="currentUser.username"
        label="Username"
        bottom-slots
        stack-label
        readonly
        disable
        counter
        maxlength="18"
        type="text"
        style="font-size: medium"
      >
        <template v-slot:hint> Characters </template>
      </q-input>
    </div>
  </q-page>

  <q-page v-else class="q-px-md q-pb-xl defaultfont bg-secondary">
    <div class="q-pt-md">
      <q-input
        v-model="inputAccount.username"
        label="Username"
        bottom-slots
        stack-label
        counter
        maxlength="18"
        type="text"
        style="font-size: medium"
      >
        <template v-slot:hint> Characters </template>
      </q-input>
    </div>
  </q-page>
</template>

<script lang="ts">
import { UserDto } from "src/services/rest-api";
import { mapActions, mapState } from "vuex";
import { Options, Vue } from "vue-class-component";
import { AUser } from "src/store/auth/state";

@Options({
  methods: {
    ...mapActions("auth", ["authUser"]),
    ...mapActions("account", ["editAccount", "getAllUser"]),
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
  },
})
export default class EditUsermane extends Vue {
  editAccount!: (payload: UserDto) => Promise<void>;
  authUser!: () => Promise<void>;
  currentUser!: any;

  async mounted() {
    await this.authUser();
  }

  inputAccount: any = {
    username: "",
  };

  editButton = false;

  async onEdit(val: AUser) {
    this.editButton = true;
    this.inputAccount = { ...val };
  }

  async onSave() {
    this.$q
      .dialog({
        title: "Confirm Edit",
        message: "Are you sure you want to publish the changes?",
        cancel: true,
        persistent: true,
        class: "defaultfont",
      })
      .onOk(() => {
        this.editAccount(this.inputAccount);
        this.editButton = false;
        this.$q.notify({
          type: "positive",
          icon: "bi-check-circle-fill",
          position: "top",
          color: "secondary",
          textColor: "primary",
          message: "Successfully edited.",
        });
      });
  }
}
</script>
