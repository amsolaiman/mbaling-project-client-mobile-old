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
        Housing name
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
        :placeholder="`${currentUser.housing?.name}`"
        label="Housing name"
        stack-label
        readonly
        disable
        type="text"
        style="font-size: medium"
      />
    </div>
  </q-page>

  <q-page v-else class="q-px-md q-pb-xl defaultfont bg-secondary">
    <div class="q-pt-md">
      <q-input
        v-model="inputAccount"
        label="Housing name"
        stack-label
        type="text"
        style="font-size: medium"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { HousingDto, UserDto } from "src/services/rest-api";
import { mapActions, mapState } from "vuex";
import { Options, Vue } from "vue-class-component";
import { AUser } from "src/store/auth/state";

@Options({
  methods: {
    ...mapActions("auth", ["authUser"]),
    ...mapActions("account", ["editAccount", "getAllUser"]),
    ...mapActions("housing", [
      "addHousing",
      "getAllHousing",
      "editHousingName",
      "getHousingById",
    ]),
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
    ...mapState("housing", ["allHousing", "newHousing"]),
  },
})
export default class EditHousing extends Vue {
  editHousingName!: (payload: HousingDto) => Promise<HousingDto>;
  editAccount!: (payload: UserDto) => Promise<void>;
  getHousingById!: (id: any) => Promise<void>;
  authUser!: () => Promise<void>;
  currentUser!: any;

  data!: any;
  async mounted() {
    await this.authUser();
    this.data = this.currentUser?.housing?.name;
    console.log(this.data);
  }

  inputHousing: any = {
    name: "",
  };
  inputAccount: any = {
    housingunit: "",
  };

  editButton = false;

  async onEdit(val: any) {
    console.log(val);
    this.editButton = true;
    this.data = { ...this.currentUser };
    this.inputAccount = this.data.housing?.name;
    console.log(this.inputAccount.housing?.name);
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
        console.log("CurrentUser ID: " + this.currentUser.housing?.id);
        this.editHousingName({
          ...this.inputHousing,
          id: this.currentUser.housing?.id,
          name: this.inputAccount,
        });
        this.editButton = false;
        // window.location.reload();
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
