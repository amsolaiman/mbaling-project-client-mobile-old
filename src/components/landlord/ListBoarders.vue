<template>
  <!--  -->

  <div class="defaultfont-semibold row text-grey-8" style="font-size: medium">
    <div class="col">Boarders</div>
    <div class="col-1">
      {{ this.data.length + this.nonAccountdata.length }}
    </div>
  </div>
  <div class="q-mt-md">
    <q-list v-for="pending in data" :key="pending">
      <q-card class="q-pa-md row items-center">
        <div class="q-ml-sm col-2">
          <q-avatar size="xl" class="bg-primary">
            <q-img
              v-if="pending.student?.prfphoto"
              :src="`http://localhost:3000/prfmedia/${pending.student?.prfphoto}`"
            />
            <q-img
              v-else
              class=""
              src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg"
            />
          </q-avatar>
        </div>
        <div class="col">
          <q-item-section class="defaultfont">
            <q-item-label
              lines="1"
              class="defaultfont-semibold"
              style="font-size: medium"
            >
              {{ pending.student?.fName }} {{ pending.student?.lName }}
            </q-item-label>
            <q-item-label lines="1" style="font-size: smaller">
              @{{ pending.student?.username }}
            </q-item-label>
          </q-item-section>
        </div>
        <div align="right" class="col-5">
          <q-btn
            flat
            round
            color="primary"
            icon="bi-x-circle"
            @click="deleteAcceptedStudent(pending.id)"
          />
        </div>
      </q-card>
      <q-separator size="0.5rem" class="bg-secondary" />
    </q-list>
  </div>
  <!-- <div
        class="row q-my-xs"
        v-for="pending in getAcceptedAccount"
        :key="pending"
      >
        <template v-if="currentUser.id == pending.landlord?.id">
          <div class="col-2">
            <q-avatar size="3rem">
              <q-img
                v-if="pending.student?.prfphoto"
                class="avatar"
                :src="`http://localhost:3000/prfmedia/${pending.student?.prfphoto}`"
              />
              <q-img
                v-else
                class="avatar"
                src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg"
              />
            </q-avatar>
          </div>
          <div class="col q-mt-xs defaultfont" style="font-size: medium">
            {{ pending.student?.fName }} {{ pending.student?.lName }}
            <div class="q-ma-none" style="font-size: x-small">{{pending.student?.degree}}</div>
          </div>
          <div class="col-2 flex flex-center">
            <q-icon
              size="1rem"
              color="primary"
              class="bi-trash"
              @click="deleteAcceptedStudent(pending.id)"
            />
          </div>
        </template>
      </div> -->
  <div
    class="q-mt-md defaultfont-semibold row items-center text-grey-8"
    style="font-size: medium"
  >
    <div class="col">Non-Account Boarders</div>
    <div align="right" class="defaultfont col-">
      <q-btn
        icon="bi-plus"
        label="Add"
        dense
        unelevated
        rounded
        no-caps
        color="primary"
        style="width: 6rem"
        @click="showAddAccount()"
      />
    </div>
  </div>
  <div class="q-mt-md">
    <q-list v-for="nonAccount in nonAccountdata" :key="nonAccount">
      <q-card class="q-pa-md row items-center">
        <div class="q-ml-sm col-2">
          <q-avatar size="xl" class="bg-primary">
            <q-img class="" src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg" />
          </q-avatar>
        </div>
        <div class="col">
          <q-item-section class="defaultfont">
            <q-item-label
              lines="1"
              class="defaultfont-semibold"
              style="font-size: medium"
            >
              {{ nonAccount.fName }} {{ nonAccount.lName }}
            </q-item-label>
            <q-item-label lines="1" style="font-size: smaller">
              {{ nonAccount.degree }}
            </q-item-label>
          </q-item-section>
        </div>
        <div align="right" class="col-2">
          <q-btn
            flat
            round
            color="primary"
            icon="bi-x-circle"
            @click="deleteAcceptedNonStudent(nonAccount.id)"
          />
        </div>
      </q-card>
      <q-separator size="0.5rem" class="bg-secondary" />
    </q-list>
  </div>
  <!-- <div>
    <q-list>
      <div class="row flex flex-center">
        <div class="col">
          <div
            class="q-my-md defaultfont text-grey-6"
            style="font-size: x-small"
          >
            List of Boarders (Non-Account):
          </div>
        </div>
        <div class="col">
          <q-btn
            icon="add"
            label="Insert Boarders"
            dense
            unelevated
            rounded
            no-caps
            color="primary"
            class="text-caption defaultfont float-right"
            style="width: 10rem"
            @click="showAddAccount()"
          />
        </div>
      </div>
      <div
        class="row q-my-xs"
        v-for="nonAccount in allNonAccount"
        :key="nonAccount"
      >
      <template v-if="currentUser.id == nonAccount.landlord?.id">
        <div class="col-2">
          <q-avatar size="3rem">
            <q-img
              class="avatar"
              src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg"
            />
          </q-avatar>
        </div>
        <div class="col">
        <div v-if="(nonAccount.degree != '')" class="q-mt-xs defaultfont" style="font-size: medium">
          {{ nonAccount.fName }} {{ nonAccount.lName }}
          <div class="q-ma-none" style="font-size: x-small">
            {{ nonAccount.degree }}
          </div>
        </div>
        <div v-if="(nonAccount.degree == '')" class="q-mt-sm defaultfont float-left" style="font-size: medium">
          {{ nonAccount.fName }} {{ nonAccount.lName }}
        </div>
        </div>
        <div class="col-2 flex flex-center">
          <q-icon
            size="1rem"
            color="primary"
            class="bi-trash"
            @click="deleteAcceptedNonStudent(nonAccount)"
          />
        </div>
        </template>
      </div>
    </q-list>
  </div> -->
  <!--  -->

  <q-dialog v-model="dialog" persistent>
    <q-card>
      <q-form @submit="addNonAccount()" greedy>
        <div class="q-py-sm defaultfont column">
          <div align="center" class="col q-mt-md">
            <span class="defaultfont-bold" style="font-size: large">
              Add Non-account
            </span>
          </div>
          <div class="col q-gutter-y-sm q-mt-md flex flex-center">
            <q-input
              dense
              filled
              v-model="inputNonAccount.fName"
              placeholder="Firstname"
              style="width: 18rem; font-size: small"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please Input your FirstName',
              ]"
              hide-bottom-space
            />

            <q-input
              dense
              filled
              v-model="inputNonAccount.lName"
              placeholder="Lastname"
              style="width: 18rem; font-size: small"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please Input your LastName',
              ]"
              hide-bottom-space
            />

            <q-select
              class="q-mt-xs"
              v-model="inputNonAccount.college"
              :options="College"
              dense
              filled
              label="College:"
              style="width: 18rem; font-size: small"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please Choose Your College',
              ]"
              hide-bottom-space
            />
            <q-select
              class="q-mt-xs"
              :v-model="
                inputNonAccount.college ==
                  'College of Business Administration and Accountancy' ||
                'College of Information Technology' ||
                'King Faisal Center for Islamic, Arabic and Asian Studies'
                  ? selectedDepartment()
                  : selectedDepartment
              "
              v-model="inputNonAccount.department"
              :options="Department"
              dense
              filled
              label="Department:"
              style="width: 18rem; font-size: small"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please Choose Your Department',
              ]"
              hide-bottom-space
            />
            <q-select
              class="q-mt-xs"
              :v-model="
                inputNonAccount.college ==
                  'College of Business Administration and Accountancy' ||
                'College of Information Technology' ||
                'King Faisal Center for Islamic, Arabic and Asian Studies'
                  ? selectedDegree()
                  : selectedDegree
              "
              v-model="inputNonAccount.degree"
              :options="Degree"
              dense
              filled
              label="Degree:"
              style="width: 18rem; font-size: small"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please Choose Your Degree',
              ]"
              hide-bottom-space
            />

            <!-- <q-input
              dense
              filled
              v-model="inputNonAccount.college"
              placeholder="College"
              style="width: 18rem; font-size: small"

            />

            <q-input
              dense
              filled
              v-model="inputNonAccount.department"
              placeholder="Department"
              style="width: 18rem; font-size: small"

            />

            <q-input
              dense
              filled
              v-model="inputNonAccount.degree"
              placeholder="Degree"
              style="width: 18rem; font-size: small"

            /> -->
          </div>
          <div class="col">
            <div align="center">
              <q-btn
                :ripple="false"
                unelevated
                rounded
                dense
                no-caps
                outline
                class="text-#BE282D q-ma-md"
                style="height: 1.5rem; width: 6rem; font-size: small"
                color="primary"
                label="close"
                v-close-popup
              />
              <q-btn
                :ripple="false"
                unelevated
                rounded
                dense
                no-caps
                class="text-white q-ma-md"
                style="height: 1.5rem; width: 6rem; font-size: small"
                color="primary"
                label="create"
                type="submit"
              />
            </div>
          </div>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { ApplicationDto, NonAccountDto, UserDto } from "src/services/rest-api";
import { Options, Vue } from "vue-class-component";
import { mapActions, mapGetters, mapState } from "vuex";

@Options({
  methods: {
    ...mapActions("auth", ["authUser"]),
    ...mapActions("account", ["editAccount", "getAllUser"]),
    ...mapActions("application", [
      "getAllApplication",
      "updateApplication",
      "deleteApplication",
      "getOneApplication",
    ]),
    ...mapActions("nonaccount", [
      "createNonAccount",
      "getAllNonAccount",
      "deleteNonAccount",
    ]),
  },
  computed: {
    ...mapState("nonaccount", ["allNonAccount"]),
    ...mapState("auth", ["currentUser"]),
    ...mapState("application", ["applications"]),
    ...mapGetters("application", ["getAcceptedAccount"]),
  },
})
export default class ListBoarders extends Vue {
  getOneApplication!: (payload: ApplicationDto) => Promise<ApplicationDto>;
  editAccount!: (payload: UserDto) => Promise<void>;
  deleteNonAccount!: (id: NonAccountDto) => Promise<void>;
  deleteApplication!: (id: ApplicationDto) => Promise<void>;
  createNonAccount!: (payload: any) => Promise<void>;
  updateApplication!: (payload: any) => Promise<void>;
  getAllApplication!: () => Promise<void>;
  getAllNonAccount!: () => Promise<void>;
  allNonAccount!: NonAccountDto[];
  applications!: ApplicationDto[];
  getAcceptedAccount!: ApplicationDto[];
  currentUser!: any;
  data: any = [];
  nonAccountdata: any = [];

  // add non account
  dialog = false;
  addNewAccount = false;

  async showAddAccount() {
    this.resetModel();
    this.dialog = true;
  }

  inputNonAccount: any = {
    fName: "",
    lName: "",
    degree: "",
    department: "",
    college: "",
  };
  inputAccount: any = {};

  columns = [
    {
      name: "name",
      label: "Name",
      align: "left",
      field: (row: ApplicationDto) =>
        row.student?.fName + " " + row.student?.lName,
    },
    {
      name: "action",
      required: true,
      label: "  ",
      align: "left",
      field: "action",
    },
  ];

  nonAccountColumns = [
    {
      name: "fName",
      label: "Name",
      align: "left",
      field: (row: NonAccountDto) => row.fName + " " + row.lName,
    },
    {
      name: "action",
      required: true,
      label: "  ",
      align: "left",
      field: "action",
    },
  ];

  async mounted() {
    await this.getAllNonAccount();
    this.nonAccountdata = this.allNonAccount.filter(
      (i) => i.landlord?.id == this.currentUser.id
    );
    await this.getAllApplication();
    this.data = this.getAcceptedAccount.filter(
      (i) => i.landlord?.id == this.currentUser.id
    );
    console.log(this.data);
  }

  async addNonAccount() {
    this.dialog = false;
    try {
      await this.createNonAccount({
        ...this.inputNonAccount,
        landlord: this.currentUser.id,
      });
      this.addNewAccount = false;
      await this.getAllNonAccount();
      this.nonAccountdata = this.allNonAccount.filter(
        (i) => i.landlord?.id == this.currentUser.id
      );
      // await this.resetModel();
      this.$q.notify({
        position: "top",
        color: "secondary",
        textColor: "primary",
        type: "positive",
        classes: "defaultfont",
        message: "Student Created",
      });
    } catch (error) {
      this.$q.notify({
        position: "top",
        color: "primary",
        textColor: "secondary",
        type: "negative",
        classes: "defaultfont",
        message: "Username is already exist!",
      });
    }
  }
  // deleteAcceptedStudent
  async deleteAcceptedStudent(val: any) {
    this.$q
      .dialog({
        title: "Confirm Edit",
        message: "Are you sure you want to delete?",
        cancel: true,
        persistent: true,
        class: "defaultfont",
      })
      .onOk(async () => {
        const edit = await this.getOneApplication(val);
        console.log(edit.student?.id);
        await this.editAccount({
          ...this.inputAccount,
          id: edit.student?.id,
          housing: null,
        });

        await this.deleteApplication(val);
        await this.getAllApplication();
        this.data = this.getAcceptedAccount.filter(
          (i) => i.landlord?.id == this.currentUser.id
        );
        this.$q.notify({
          type: "positive",
          caption: "",
          message: "Successfully Deleted",
          position: "top",
          color: "secondary",
          textColor: "primary",
          classes: "defaultfont",
        });
        console.log("delete Here");
      });
  }

  async deleteAcceptedNonStudent(val: any) {
    this.$q
      .dialog({
        title: "Confirm Delete",
        message: "Are you sure you want to delete student?",
        cancel: true,
        persistent: true,
        class: "defaultfont",
      })
      .onOk(async () => {
        await this.deleteNonAccount(val);
        await this.getAllNonAccount();
        this.nonAccountdata = this.allNonAccount.filter(
          (i) => i.landlord?.id == this.currentUser.id
        );
        this.$q.notify({
          type: "positive",
          caption: "",
          message: "Successfully Deleted",
          position: "top",
          color: "secondary",
          textColor: "primary",
          classes: "defaultfont",
        });
        console.log("delete Here");
      });
  }

  disapproveApplicant(id: any) {
    console.log("DisApprove here");
  }

  async resetModel() {
    this.inputNonAccount = {
      fName: "",
      lName: "",
      degree: "",
      department: "",
      college: "",
    };
  }

  //Courses Choices
  Department: any[] = [];
  Degree: any[] = [];

  College = [
    "College of Business Administration and Accountancy",
    "College of Information and Computing Sciences",
    "King Faisal Center for Islamic, Arabic and Asian Studies",
  ];

  selectedDepartment() {
    if (
      this.inputNonAccount.college ==
      "College of Business Administration and Accountancy"
    ) {
      return (this.Department = [
        "Department of Economic",
        "Department of Marketing",
        "Department of Management",
        "Department of Accounting",
      ]);
    } else if (
      this.inputNonAccount.college ==
      "College of Information and Computing Sciences"
    ) {
      return (this.Department = [
        "Department of Information Sciences",
        "Department of Computing Sciences",
      ]);
    } else if (
      this.inputNonAccount.college ==
      "King Faisal Center for Islamic, Arabic and Asian Studies"
    ) {
      return (this.Department = [
        "Department of International Relations",
        "Department of Islamic Studies",
        "Department of Teaching Arabic",
      ]);
    }
  }

  selectedDegree() {
    if (
      this.inputNonAccount.college ==
      "College of Business Administration and Accountancy"
    ) {
      return (this.Degree = [
        "Accountancy",
        "Business Economics",
        "BSBA Entrepreneurial Marketing",
        "BSBA Management",
        "BSBA Human Resource Management",
        "BSBA Marketing Management",
        "BSBA Entrepreneurship",
      ]);
    } else if (
      this.inputNonAccount.college ==
      "College of Information and Computing Sciences"
    ) {
      return (this.Degree = [
        "Bachelor of Science in Computer Science",
        "Bachelor of Science in Entertaiment and Multimedia Computing",
        "Bachelor of Science in Information System",
        "Bachelor of Science in information Technology (Database)",
        "Bachelor of Science in information Technology (Networking)",
      ]);
    } else if (
      this.inputNonAccount.college ==
      "King Faisal Center for Islamic, Arabic and Asian Studies"
    ) {
      return (this.Degree = [
        "Bachelor of Arts in Islamic Studies (Shari'ah)",
        "Bachelor of Science in Teaching Arabic",
        "Bachelor of Science in International Relations",
      ]);
    }
  }

  colorManipulation(status: string) {
    console.log("status", status);
    if (status == "pending") {
      return "orange";
    } else if (status == "banned") {
      return "red";
    } else {
      return "green";
    }
  }
  labelManipulation(status: string) {
    if (status == "pending") {
      return "Pending";
    } else if (status == "banned") {
      return "Banned";
    } else {
      return "Available";
    }
  }
}
</script>
<style>
</style>
