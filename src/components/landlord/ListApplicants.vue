<template>
  <!--  -->
  <div class="defaultfont-semibold text-grey-8" style="font-size: medium">
    Pending applications
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
            label="Accept"
            unelevated
            rounded
            no-caps
            color="primary"
            style="height: 2.5rem"
            @click="ApproveApplicant(pending.id)"
          />
          <q-btn
            flat
            round
            color="primary"
            icon="bi-x-circle"
            @click="disapproveApplicant(pending.id)"
          />
        </div>
      </q-card>
      <q-separator size="0.5rem" class="bg-secondary" />
    </q-list>
  </div>
</template>

<script lang="ts">
import { ApplicationDto, UserDto } from "src/services/rest-api";
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
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
    ...mapState("application", ["applications"]),
    ...mapGetters("application", ["getPendingAccount"]),
  },
})
export default class ListApplicants extends Vue {
  getOneApplication!: (payload: ApplicationDto) => Promise<ApplicationDto>;
  editAccount!: (payload: UserDto) => Promise<void>;
  deleteApplication!: (payload: any) => Promise<void>;
  updateApplication!: (payload: any) => Promise<ApplicationDto>;
  getAllApplication!: () => Promise<void>;
  applications!: ApplicationDto[];
  getPendingAccount!: ApplicationDto[];
  currentUser!: UserDto;
  data: any = [];
  update: any;

  inputAccount: any = {};

  async mounted() {
    await this.getAllApplication();
    this.data = this.getPendingAccount
      .filter((i) =>i.landlord?.id == this.currentUser.id)
    console.log(this.data);
  }

  async ApproveApplicant(val: any) {
    console.log("val is here " + val);
    console.log(this.currentUser.housing?.name);
    console.log(this.currentUser.housing?.id);
    console.log("Approve here");

    const edit = await this.getOneApplication(val);
    console.log(edit.student?.id);

    await this.updateApplication({
      id: val,
      status: "accepted",
    });
    await this.editAccount({
      ...this.inputAccount,
      id: edit.student?.id,
      housing: this.currentUser.housing,
    });
    window.location.reload();
  }

  async disapproveApplicant(id: any) {
    console.log("DisApprove here");
    await this.deleteApplication(id);
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
