<template>
  <q-header class="defaultfont bg-secondary">
    <div align="center" class="q-pt-lg" style="height: 4rem">
      <q-item-label
        lines="1"
        class="defaultfont-semibold text-primary"
        style="font-size: medium"
      >
        @{{ currentUser.username }}
      </q-item-label>
    </div>

    <div align="center" class="q-px-md q-pb-xs text-black">
      <q-avatar size="10rem" class="bg-primary">
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
      <div
        class="q-mt-md q-px-lg defaultfont-bold text-uppercase"
        style="font-size: large"
      >
        {{ currentUser.fName }} {{ currentUser.lName }}
      </div>
      <div class="q-px-md" style="font-size: small">
        <p style="line-height: 1rem">
          {{ currentUser.degree }} <br />
          {{ currentUser.department }} <br />
          {{ currentUser.college }}
        </p>
      </div>
    </div>
    <q-separator inset color="primary" size="0.1rem" class="q-my-sm" />
  </q-header>

  <q-page class="defaultfont">
    <div class="q-px-lg q-py-md">
      <div align="left" class="row items-center">
        <div align="left" class="col-10">
          <div
            class="defaultfont-semibold text-grey-8"
            style="font-size: medium"
          >
            Set your campus housing
          </div>
          <div class="defaultfont text-grey" style="font-size: smaller">
            Please set your campus housing address to complete your user
            record. <br />
            Go to your Landlord's profile > click Apply.
          </div>
        </div>
        <div align="right" class="col">
          <q-icon name="bi-question-circle" size="lg" color="grey" />
        </div>
      </div>
    </div>
    <!--  -->
    <div class="q-px-lg q-py-md">
      <div class="defaultfont-semibold text-grey-8" style="font-size: medium">
        Application
      </div>
      <div class="q-mt-md">
        <q-list v-for="pending in applications" :key="pending">
          <q-card
            v-if="
              pending.status == 'pending' &&
              currentUser.id == pending.student?.id
            "
            class="q-pa-md row items-center"
          >
            <div class="q-ml-sm col-2">
              <q-avatar size="xl" class="bg-primary">
                <q-img
                  v-if="pending.landlord?.prfphoto"
                  class=""
                  :src="`http://localhost:3000/prfmedia/${pending.landlord?.prfphoto}`"
                />
                <q-img
                  v-if="!pending.landlord?.prfphoto"
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
                  {{ pending.landlord?.housing?.name }}
                </q-item-label>
                <q-item-label lines="1" style="font-size: smaller">
                  Your request is pending...
                </q-item-label>
              </q-item-section>
            </div>
            <div align="right" class="col-4">
              <q-btn
                label="Cancel"
                unelevated
                rounded
                no-caps
                color="primary"
                style="height: 2.5rem"
                @click="disapproveApplicant(pending.id)"
              />
            </div>
            <!-- <div class="q-mt-sm q-ml-xs">
                  <q-btn
                    class="q-mx-xs"
                    color="primary"
                    ripple="false"
                    unelevated
                    label="Cancel"
                    rounded
                    dense
                    style="width: 15rem"

                  />
                </div> -->
          </q-card>

          <!--  -->

          <q-card
            v-if="
              pending.status == 'accepted' &&
              currentUser.id == pending.student?.id
            "
            class="q-pa-md row items-center"
          >
            <div class="q-ml-sm col-2">
              <q-avatar size="xl" class="bg-primary">
                <q-img
                  v-if="pending.landlord?.prfphoto"
                  class=""
                  :src="`http://localhost:3000/prfmedia/${pending.landlord?.prfphoto}`"
                />
                <q-img
                  v-if="!pending.landlord?.prfphoto"
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
                  {{ pending.landlord?.housing?.name }}
                </q-item-label>
                <q-item-label lines="1" style="font-size: smaller">
                  Your request is accepted.
                </q-item-label>
              </q-item-section>
            </div>
            <div align="right" class="col-4">
              <q-btn
                label="Approved"
                unelevated
                outline
                rounded
                no-caps
                color="primary"
                style="height: 2.5rem"
                @click="disapproveApplicant(pending.id)"
              />
            </div>
          </q-card>
        </q-list>
      </div>
    </div>
    <!--  -->
  </q-page>
</template>

<script lang="ts">
import { ApplicationDto } from "src/services/rest-api";
import { AUser } from "src/store/auth/state";
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
    ]),
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
    ...mapState("application", ["applications"]),
    ...mapGetters("application", ["getPendingAccount"]),
  },
})
export default class StudentAccount extends Vue {
  deleteApplication!: (payload: any) => Promise<void>;
  updateApplication!: (payload: any) => Promise<void>;
  getAllApplication!: () => Promise<void>;
  applications!: ApplicationDto[];
  getPendingAccount!: ApplicationDto[];
  authUser!: () => Promise<void>;
  currentUser!: AUser;

  data: any = [];

  columns = [
    {
      name: "name",
      label: "Name",
      align: "left",
      field: (row: ApplicationDto) =>
        row.student?.fName + " " + row.student?.lName,
    },
    {
      name: "name",
      label: "Housing",
      align: "left",
      field: (row: ApplicationDto) => row.landlord?.housing?.name,
    },
    {
      name: "status",
      required: true,
      label: "Applicant Status",
      align: "left",
      field: "status",
    },
  ];
  async mounted() {
    await this.authUser();
    await this.getAllApplication();
    console.log(this.data);
  }
  async ApproveApplicant(id: any) {
    console.log("Approve here");
    await this.updateApplication({
      id,
      status: "accepted",
    });
  }

  async disapproveApplicant(id: any) {
    this.$q
      .dialog({
        title: "Confirm Edit",
        message: "Are you sure you want to cancel your request?",
        cancel: true,
        persistent: true,
        class: "defaultfont",
      })
      .onOk(async () => {
        await this.deleteApplication(id);
        this.$q.notify({
          type: "positive",
          caption: "You can now Apply again ",
          message: "Successfully Deleted",
          position: "top",
          color: "secondary",
          textColor: "primary",
          classes: "defaultfont",
        });
        console.log("delete Here");
      });
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
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50% !important;
  border: 2px solid rgb(190, 40, 45) !important;
}
</style>
