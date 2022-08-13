<template>
  <q-layout view="hHh lpR fFf">
    <q-page class="login__container">
      <q-card flat class="form__card">
        <q-img src="~assets/mbaling-logo-vertical-alt.svg" />

        <div class="q-mt-xl">
          <q-input
            v-model="username"
            dark
            dense
            type="text"
            placeholder="username"
            color="white"
            input-class="text-center"
            @keyup.enter="login()"
          />
          <q-input
            v-model="password"
            dark
            dense
            type="password"
            placeholder="password"
            color="white"
            input-class="text-center"
            @keyup.enter="login()"
          />

          <q-btn
            label="login"
            unelevated
            rounded
            dense
            no-caps
            :ripple="false"
            class="form__button q-mt-md text-primary"
            @click="login()"
          />
        </div>
      </q-card>

      <div class="signup__container">
        <p @click="alert()">
          Sign-up for an account
          <q-icon name="bi-question-circle" />
        </p>
      </div>
    </q-page>
  </q-layout>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class LoginForm extends Vue {
  username = "";
  password = "";

  async login() {
    try {
      this.$q.loading.show({
        spinnerSize: 60,
        message: "You are being logged in...",
      });
      if (this.username == "student" && this.password == "password") {
        this.$q.loading.hide();
        await this.$router.replace("/student/home");
      } else if (this.username == "landlord" && this.password == "password") {
        this.$q.loading.hide();
        await this.$router.replace("/landlord/home");
      }
    } catch (error) {
      this.$q.loading.hide();
      this.$q.notify({
        message: "Incorrect username or password.",
        icon: "bi-exclamation-triangle-fill",
        type: "negative",
        color: "secondary",
        textColor: "primary",
        position: "top",
      });
    }
  }

  alert() {
    this.$q.dialog({
      title: "How to sign-up?",
      message:
        "Please proceed to the MSU Housing Management Division to sign-up for an account.",
    });
  }
}
</script>

<style scoped>
.login__container {
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-secondary);
}

.form__card {
  background: transparent;
  text-align: center;
  width: 12rem;
}

.form__card .q-img {
  width: 8rem;
}

.form__button {
  background: var(--color-secondary);
  height: 1.8rem;
  width: 6rem;
  font-size: small;
  font-weight: 500;
  color: var(--color-primary);
}

.signup__container {
  width: 100%;
  display: flex;
  position: fixed;
  justify-content: center;
  height: 4rem;
  bottom: 0;
}

.signup__container p {
  cursor: pointer;
  font-size: small;
  font-weight: 300;
}
</style>
