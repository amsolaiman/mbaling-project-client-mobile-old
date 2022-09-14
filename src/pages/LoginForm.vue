<template>
  <q-layout view="hHh lpR fFf" class="defaultfont-light bg-primary text-white">
    <q-page class="flex flex-center">
      <q-card flat class="bg-transparent text-center" style="width: 12rem">
        <q-img src="~assets/mbaling-logo-vertical.svg" style="width: 6rem" />

        <div class="q-mt-xl">
          <q-input
            v-model="username"
            dark
            dense
            type="text"
            color="white"
            input-class="text-center"
            placeholder="username"
            @keyup.enter="loginUser()"
          />
          <q-input
            v-model="password"
            dark
            dense
            type="password"
            color="white"
            input-class="text-center"
            placeholder="password"
            @keyup.enter="loginUser()"
          />

          <q-btn
            label="log-in"
            unelevated
            rounded
            dense
            no-caps
            :ripple="false"
            color="white"
            class="q-mt-md text-bold text-red"
            style="height: 1.5rem; width: 6rem; font-size: smaller"
            @click="loginUser()"
          />
        </div>
      </q-card>
    </q-page>

    <q-footer class="flex justify-center" style="height: 3rem">
      <p
        class="defaultfont-light cursor-pointer"
        style="font-size: smaller; line-height: 0.85rem"
        @click="alert()"
      >
        Sign-up for an account
        <q-icon name="bi-question-circle" />
      </p>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { UserDto } from "src/services/rest-api";
import { AUser } from "src/store/auth/state";
import { Options, Vue } from "vue-class-component";
import { mapActions, mapState } from "vuex";

@Options({
  methods: {
    ...mapActions("auth", ["login", "authUser"]),
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
  },
})
export default class LoginForm extends Vue {
  login!: (auth: { userName: string; password: string }) => Promise<AUser>;
  currentUser!: any;

  username = "";
  password = "";
  isPwd = true;

  async loginUser() {
    try {
      this.$q.loading.show({
        spinnerSize: 60,
        message: "You are being logged in...",
        customClass: "defaultfont",
      });
      await this.login({
        userName: this.username,
        password: this.password,
      });
      if (this.currentUser.type == "student") {
        this.$q.loading.hide();
        await this.$router.replace("/student/home");
      } else if (this.currentUser.type == "landlord") {
        this.$q.loading.hide();
        if (this.currentUser.housing?.id == null) {
          await this.$router.replace("/housing+setup");
        } else {
          await this.$router.replace("/landlord/home");
        }
      }
    } catch (error) {
      this.$q.loading.hide();
      this.$q.notify({
        type: "negative",
        icon: "bi-exclamation-triangle-fill",
        color: "secondary",
        textColor: "primary",
        position: "top",
        message: "Incorrect username or password.",
        classes: "defaultfont",
      });
    }
  }
  alert() {
    this.$q.dialog({
      message:
        "Please proceed to the MSU Housing Management Division to sign-up for an account.",
      class: "defaultfont",
    });
  }
}
</script>
