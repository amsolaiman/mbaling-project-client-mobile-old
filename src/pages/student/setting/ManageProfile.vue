<template>
  <!-- Edit Student Profile -->
  <q-form @submit="onSaveStudentAccount()" v-if="editStudentProfile">
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
          label="Save"
          unelevated
          rounded
          no-caps
          color="primary"
          class="q-mr-md defaultfont"
          style="height: 3rem; width: 4rem"
          type="submit"
        />
      </template>
    </page-header>

    <div class="defaultfont">
      <div align="center" class="q-pa-md">
        <q-avatar size="8rem" class="bg-primary">
          <q-img
            v-if="inputAccount.prfphoto"
            :src="`http://localhost:3000/prfmedia/${inputAccount.prfphoto}`"
            class="avatar"
          />
          <img
            v-if="!inputAccount.prfphoto"
            class="avatar q-pt-none q-mt-none"
            src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg"
          />
        </q-avatar>
        <div class="q-mt-sm q-px-xl">
          <q-file
            outlined
            label="Upload Image"
            accept=".jpg, image/*"
            v-model="imageAttachement"
          >
          </q-file>
        </div>
      </div>

      <div class="q-px-lg q-pb-lg">
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
    </div>
  </q-form>

  <!--  -->
  <q-form @submit="showEditStudent(currentUser)" v-else>
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
          label="Edit"
          unelevated
          rounded
          no-caps
          outline
          color="primary"
          class="q-mr-md defaultfont"
          style="height: 3rem; width: 4rem"
          type="submit"
        />
      </template>
    </page-header>

    <div class="defaultfont">
      <div align="center" class="q-pa-md">
        <q-avatar size="8rem" class="bg-primary">
          <q-img
            v-if="currentUser.prfphoto"
            :src="`http://localhost:3000/prfmedia/${currentUser.prfphoto}`"
            class="avatar"
          />
          <q-img
            v-if="!currentUser.prfphoto"
            class="avatar q-pt-none q-mt-none"
            src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg"
          />
        </q-avatar>
        <div class="q-mt-md q-px-xl" style="font-size: x-large">
          @{{ currentUser.username }}
        </div>
      </div>

      <div class="q-px-lg q-pb-lg">
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
    </div>
  </q-form>

  <q-separator class="q-mt-sm" />

  <div class="defaultfont">
    <div align="left" class="q-mt-lg q-px-lg q-pb-xl row items-center">
      <div align="left" class="col-10">
        <div class="defaultfont-semibold text-grey-8" style="font-size: medium">
          Set student course
        </div>
        <div class="defaultfont text-grey" style="font-size: smaller">
          Please proceed to the MSU Housing Management Division to edit your
          student course information.
        </div>
      </div>
      <div align="right" class="col">
        <q-icon
          name="bi-question-circle"
          size="lg"
          color="grey"
          @click="$router.replace('/tutorial/chatlink')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MediaDto, PrfMediaDto, UserDto } from "src/services/rest-api";
import { AUser } from "src/store/auth/state";
import { Options, Vue } from "vue-class-component";
import { mapActions, mapState } from "vuex";
import { ref, Ref } from "vue";

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
export default class StudentManageProfile extends Vue {
  editAccount!: (payload: UserDto) => Promise<void>;
  uploadMedia!: (payload: File) => Promise<PrfMediaDto>;
  authUser!: () => Promise<void>;
  currentUser!: any;

  imageAttachement: File = new File([], "Pick a Profile Picture");
  loading = true;
  updateAccount = false;
  genderOptions = ["Male", "Female"];

  async mounted() {
    console.log("Mounted here");
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

  // Edit Student Profile
  editStudentProfile = false;

  async showEditStudent(val: AUser) {
    this.editStudentProfile = true;
    this.inputAccount = { ...val };
  }

  async onSaveStudentAccount() {
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
        message: "Unsuccessfully Update",
      });
    }
  }

  // async oneditAccount() {
  //   const media = await this.uploadMedia(this.imageAttachement as File);
  //   console.log(this.presentStudent.id);
  //   await this.editAccount({
  //     ...this.inputAccount,
  // id: this.presentStudent.id,
  // prfphoto: media.id,
  // type: this.presentStudent.type,
  // status: this.presentStudent.status,
  // username: this.presentStudent.username,
  // password: this.presentStudent.password,
  // birthdate: this.presentStudent.birthdate,
  // degree: this.presentStudent.degree,
  // department: this.presentStudent.department,
  // college: this.presentStudent.college,
  // contact: this.presentStudent.contact,
  // gender: this.presentStudent.gender,
  // year: this.presentStudent.year,
  // address1: this.presentStudent.address1,
  // address2: this.presentStudent.address2,
  // address3: this.presentStudent.address3,
  // address4: this.presentStudent.address4,
  // housingunit: this.presentStudent.housingunit,
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
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50% !important;
  border: 2px solid rgb(190, 40, 45) !important;
}
</style>
