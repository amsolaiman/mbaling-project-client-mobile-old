<template>
  <q-header class="sAccount__header">
    <q-item-label lines="1"> @username </q-item-label>
  </q-header>
  <q-page>
    <div class="profile__container">
      <div align="center" class="profile__details">
        <q-avatar size="10rem">
          <q-img src="https://cdn.quasar.dev/img/avatar2.jpg" />
        </q-avatar>
        <div class="profile__details-name">Firstname Lastname</div>
        <p class="profile__details-course">
          BS Information Technology (Database Systems)<br />
          Department of Information Sciences<br />
          College of Information and Computing Sciences
        </p>
      </div>
      <q-separator inset color="primary" size="0.1rem" class="q-my-sm" />
    </div>

    <div class="notif__container">
      <div class="notif__housing row">
        <div align="left" class="col-10">
          <div class="notif__title">Set your campus housing</div>
          <div class="notif__housing-text">
            Please set your campus housing address to complete your user record.
            <br />
            Go to your Landlord's profile > click Apply.
          </div>
        </div>
        <div align="right" class="col">
          <q-icon name="bi-question-circle" size="lg" color="grey" />
        </div>
      </div>

      <div class="notif__title q-mt-lg">Application status:</div>
      <div class="q-mt-md">
        <q-list>
          <q-card class="apply__card row">
            <div class="col-2">
              <q-avatar class="apply__card-avatar">
                <q-img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </div>
            <div class="col">
              <q-item-section>
                <q-item-label lines="1" class="apply__content-name">
                  Housing Name
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
              />
            </div>
          </q-card>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class StudentAccount extends Vue {}
</script>

<style>
.sAccount__header {
  background: var(--color-secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  color: var(--color-primary);
  font-size: medium;
  font-weight: 600;
}

.profile__container {
  background: var(--color-secondary);
}

.profile__details {
  color: #000000;
  padding: 0 1rem;
}

.profile__details .q-avatar {
  background: var(--color-primary);
}

.profile__details-name {
  margin-top: 1rem;
  text-transform: uppercase;
  font-size: large;
  font-weight: bold;
}

.profile__details-course {
  margin-top: 0.4rem;
  line-height: 1rem;
  font-size: small;
  font-weight: 500;
}

.notif__container {
  padding: 1rem 1rem 8rem 1rem;
}

.notif__housing {
  align-items: center;
}

.notif__title {
  font-weight: 700;
  font-size: medium;
  color: var(--color-grey-dark);
}

.notif__housing-text {
  color: var(--color-grey-light);
  font-size: smaller;
  font-weight: 500;
}

.apply__card {
  align-items: center;
  width: 100%;
  padding: 1rem;
}

.apply__card-avatar {
  width: 2.8rem;
  height: 2.8rem;
  background: var(--color-primary);
}

.apply__content-name {
  font-weight: 600;
  font-size: medium;
}
</style>
