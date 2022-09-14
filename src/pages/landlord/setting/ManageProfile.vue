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
        Edit profile
      </div>
    </template>
    <template #slot-right>
      <q-btn
        v-if="!editLandlordProfile"
        label="Edit"
        unelevated
        rounded
        no-caps
        outline
        color="primary"
        class="q-mr-md defaultfont"
        style="height: 3rem; width: 4rem"
        @click="onEditLandlord(currentUser)"
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
        @click="onSaveLandlord()"
      />
    </template>
  </page-header>

  <q-page v-if="!editLandlordProfile" class="q-px-md defaultfont">
    <div align="center" class="q-pa-md">
      <q-avatar size="8rem" class="bg-primary">
        <q-img
          v-if="currentUser.prfphoto"
          :src="`http://localhost:3000/prfmedia/${currentUser.prfphoto}`"
        />
        <q-img
          v-if="!currentUser.prfphoto"
          src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg"
        />
      </q-avatar>
      <div
        class="q-mt-sm q-px-xl flex flex-center"
        style="height: 4rem"
      >
        <div class="defaultfont-bold text-uppercase" style="font-size: large">
          {{ currentUser.housing?.name }}
        </div>
      </div>
    </div>

    <div class="q-px-sm q-pb-xl">
      <q-input
        v-model="currentUser.fName"
        label="First name"
        stack-label
        readonly
        disable
        class="q-mt-lg"
        style="font-size: medium"
      />
      <q-input
        v-model="currentUser.mName"
        label="Middle name"
        stack-label
        readonly
        disable
        class="q-mt-lg"
        style="font-size: medium"
      />
      <q-input
        v-model="currentUser.lName"
        label="Last name"
        stack-label
        readonly
        disable
        class="q-mt-lg"
        style="font-size: medium"
      />
      <q-select
        v-model="currentUser.gender"
        :options="genderOptions"
        label="Gender"
        stack-label
        readonly
        disable
        class="q-mt-lg"
        style="font-size: medium"
      />
      <q-input
        v-model="currentUser.birthdate"
        label="Date of birth"
        stack-label
        readonly
        disable
        type="date"
        class="q-mt-lg"
        style="font-size: medium"
      />
    </div>
  </q-page>

  <q-page v-else class="q-px-md defaultfont">
    <div align="center" class="q-pa-md">
      <q-avatar size="8rem" class="bg-primary">
        <q-img
          v-if="inputAccount.prfphoto"
          :src="`http://localhost:3000/prfmedia/${inputAccount.prfphoto}`"
        />
        <q-img
          v-if="!inputAccount.prfphoto"
          src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg"
        />
      </q-avatar>
      <div
        class="q-mt-sm q-px-xl flex flex-center"
        style="height: 4rem"
      >
        <q-file
          outlined
          label="Upload Image"
          accept=".jpg, image/*"
          v-model="imageAttachement"
        />
      </div>
    </div>

    <div class="q-px-sm q-pb-xl">
      <q-input
        v-model="inputAccount.fName"
        label="First name"
        stack-label
        class="q-mt-lg"
        style="font-size: medium"
      />
      <q-input
        v-model="inputAccount.mName"
        label="Middle name"
        stack-label
        class="q-mt-lg"
        style="font-size: medium"
      />
      <q-input
        v-model="inputAccount.lName"
        label="Last name"
        stack-label
        class="q-mt-lg"
        style="font-size: medium"
      />
      <q-select
        v-model="inputAccount.gender"
        :options="genderOptions"
        label="Gender"
        stack-label
        class="q-mt-lg"
        style="font-size: medium"
      />
      <q-input
        v-model="inputAccount.birthdate"
        label="Date of birth"
        stack-label
        type="date"
        class="q-mt-lg"
        style="font-size: medium"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { UserDto, MediaDto, PrfMediaDto } from "src/services/rest-api";
import { AUser } from "src/store/auth/state";
import { Options, Vue } from "vue-class-component";
import { mapActions, mapState } from "vuex";

@Options({
  methods: {
    ...mapActions("auth", ["authUser"]),
    ...mapActions("account", ["editAccount", "getAllUser"]),
    ...mapActions("prfmedia", ["uploadMedia"]),
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
  },
})
export default class LandlordManageProfile extends Vue {
  editAccount!: (payload: UserDto) => Promise<void>;
  uploadMedia!: (payload: File) => Promise<PrfMediaDto>;
  authUser!: () => Promise<void>;
  currentUser!: any;

  imageAttachement: File = new File([], "Pick a Profile Picture");
  updateAccount = false;
  loading = false;
  genderOptions = ["Male", "Female"];

  async mounted() {
    console.log("Mounted here");
    console.log(this.currentUser.id);
    console.log(this.authUser);
    await this.authUser();
  }

  inputAccount: any = {
    prfphoto: 0,
    fName: "",
    lName: "",
    mName: "",
    birthdate: "",
    gender: "",
  };

  // Edit Landlord Profiles
  editLandlordProfile = false;

  async onEditLandlord(val: AUser) {
    this.editLandlordProfile = true;
    this.inputAccount = { ...val };
  }

  async onSaveLandlord() {
    try {
      this.$q
        .dialog({
          title: "Confirm Edit",
          message: "Are you sure you want to publish the changes?",
          cancel: true,
          persistent: true,
          class: "defaultfont",
        })
        .onOk(async () => {
          if (this.imageAttachement.size > 0) {
            console.log("1 Upload Image");
            const media = await this.uploadMedia(this.imageAttachement as File);
            console.log("2 Upload Image");
            await this.editAccount({
              ...this.inputAccount,
              prfphoto: media.id,
            });
          } else if (this.imageAttachement.size <= 0) {
            await this.editAccount({ ...this.inputAccount });
          }
          window.location.reload();
        });
    } catch (error) {
      this.$q.notify({
        type: "negative",
        message: "Update unsuccessful.",
      });
    }

    // const media = await this.uploadMedia(this.imageAttachement as File);
    // await this.editAccount({...this.currentUser,
    //                         id: this.currentUser.id,
    //                         prfphoto: media.id});
    // this.editLandlordProfile = false;
    // this.$q.notify({
    //       position: 'bottom',
    //       color: "secondary",
    //       textColor: "primary",
    //       type: 'positive',
    //       classes: "defaultfont",
    //       message: 'Account Updated',
    //     });
  }

  // async oneditAccount() {
  //   const media = await this.uploadMedia(this.imageAttachement as File);
  //   console.log(this.currentUser.id);
  //   await this.editAccount({
  //     ...this.inputAccount,
  //     id: this.currentUser.id,
  //     prfphoto: media.id,
  //     type: this.currentUser.type,
  //     status: this.currentUser.status,
  //     username: this.currentUser.username,
  //     password: this.currentUser.password,
  //     birthdate: this.currentUser.birthdate,
  //     degree: this.currentUser.degree,
  //     department: this.currentUser.department,
  //     college: this.currentUser.college,
  //     contact: this.currentUser.contact,
  //     gender: this.currentUser.gender,
  //     year: this.currentUser.year,
  //     address1: this.currentUser.address1,
  //     address2: this.currentUser.address2,
  //     address3: this.currentUser.address3,
  //     address4: this.currentUser.address4,
  //     housingunit: this.currentUser.housingunit,
  //   });
  //   this.updateAccount = false;
  //   this.resetModel();
  //   this.$q.notify({
  //     type: "positive",
  //     message: "Successfully Edit.",
  //   });
  // }

  // resetModel() {
  //   this.inputAccount = {
  //     prfphoto: 0,
  //     fName: "",
  //     lName: "",
  //     type: "",
  //     status: "",
  //     username: "",
  //     password: "",
  //     birthdate: "",
  //     degree: "",
  //     department: "",
  //     college: "",
  //     contact: "",
  //     gender: "",
  //     year: "",
  //     address1: "",
  //     address2: "",
  //     address3: "",
  //     address4: "",
  //     housingunit: "",
  //   };
  // }

  // confirmEdit() {
  //   this.$q.dialog({
  //     title: "Confirm Edit",
  //     message: "Are you sure you want to publish the changes?",
  //     cancel: true,
  //     persistent: true,
  //     class: "defaultfont",
  //   });
  // }
}
</script>

<style>
</style>
