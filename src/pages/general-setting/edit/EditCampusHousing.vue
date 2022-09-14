<template>
  <!-- Edit ago Search Function -->
  <!-- <div v-if="editStudentCampusHousing"> -->
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
        Campus housing
      </div>
    </template>
    <!-- <template #slot-right>
        <q-btn
          label="Save"
          unelevated
          rounded
          no-caps
          color="primary"
          class="q-mr-md defaultfont"
          style="height: 3rem"
          @click="onSaveStudent()"
        />
      </template> -->
  </page-header>

  <!-- Search Input -->

  <!-- <div class="q-px-md defaultfont">
      <div class="q-pt-md">
        <q-form @submit="searchAction()">
          <q-input
            v-model="inputAccount.housing.name"
            clearable
            placeholder="Search for Housing"
            style="font-size: medium"
            @clear="clearSearch()"
          >
            <template v-slot:prepend>
              <q-btn flat round size="sm">
                <q-icon name="bi-search" type="submit" size="xs" />
              </q-btn>
            </template>
          </q-input>
        </q-form>
      </div>
    </div> -->
  <!-- DISPLAY SEARCH -->

  <!-- <q-list v-for="(result, index) in searchResultUser" :key="index">
      <q-item
        clickable
        class="q-pt-xl q-mx-lg row items-center"
        style="height: 3rem"
        @click="housingSaveResult(result)"
      >
        <div>
          <q-item-section class="q-my-lg">
            <q-item-label
              lines="1"
              class="defaultfont-semibold"
              style="font-size: medium"
            >
              {{ result.name }}
            </q-item-label>
            <q-item-label lines="1" style="font-size: small">
              <p>@{{ result.name }}</p>
            </q-item-label>
          </q-item-section>
        </div>
      </q-item>
    </q-list> -->
  <!-- </div> -->

  <!--  -->

  <!-- <div v-else> -->

  <q-page class="q-px-md q-pb-xl defaultfont bg-secondary">
    <div class="q-pt-md">
      <q-input
        :placeholder="`${currentUser.housing?.name || 'Apply to your landlord'}`"
        label="Campus housing"
        stack-label
        disable
        type="text"
        style="font-size: medium"
      />
    </div>
  </q-page>
  <!-- </div> -->
</template>

<script lang="ts">
import { UserDto } from "src/services/rest-api";
import { AUser } from "src/store/auth/state";
import { HousingInterface } from "src/store/housing-module/state";
import { UserInterface } from "src/store/user/state";
import { Options, Vue } from "vue-class-component";
import { mapActions, mapGetters, mapState } from "vuex";

@Options({
  methods: {
    ...mapActions("account", ["getAllUser", "editAccount"]),
    ...mapActions("auth", ["authUser"]),
    ...mapActions("housing", ["addHousing", "getAllHousing"]),
  },
  computed: {
    ...mapState("account", ["allAccount"]),
    ...mapGetters("account", ["landlordAccount"]),
    ...mapState("auth", ["currentUser"]),
    ...mapState("housing", ["allHousing", "newHousing"]),
  },
})
export default class EditCampusHousing extends Vue {
  getAllUser!: () => Promise<void>;
  authUser!: () => Promise<void>;
  getAllHousing!: () => Promise<void>;
  editAccount!: (payload: UserDto) => Promise<void>;
  search = "";

  allHousing!: HousingInterface[];
  allAccount!: UserInterface[];
  currentUser!: any;
  housing!: any;

  async mounted() {
    await this.getAllHousing();
    await this.authUser();
    this.inputAccount = { ...this.currentUser };
    console.log("Hello");
  }

  inputAccount: any = {
    housingunit: "",
  };

  // Edit CampusHousing
  // Checkpoint
  editStudentCampusHousing = false;

  async onEditStudent(val: AUser) {
    this.editStudentCampusHousing = true;
    this.inputAccount = { ...val };
  }

  async onSaveStudent() {
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
        this.editStudentCampusHousing = false;
        // window.location.reload();
        this.$q.notify({
          type: "positive",
          color: "secondary",
          textColor: "primary",
          message: "Successfully change",
        });
      });
  }

  async housingSaveResult(res: any) {
    this.inputAccount.housingunit = res.name;
    this.search = this.inputAccount.housingunit;
    console.log("what!" + this.search);
  }

  // Search Funtion

  searchResultUser: HousingInterface[] = [];

  searchAction() {
    const resultUsers = this.allHousing.filter((housing) =>
      housing.name.toLowerCase().includes(this.search.toLowerCase())
    );
    console.log(resultUsers);
    this.searchResultUser = resultUsers;
  }

  clearSearch() {
    this.search = "";
  }

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
