<template>
  <page-header style="height: 3rem">
    <template #slot-middle>
      <div class="defaultfont-bold text-black" style="font-size: large">
        MESSAGES
      </div>
    </template>
  </page-header>

  <q-page class="defaultfont bg-secondary text-black">
    <!-- CONTACT/INBOX LIST -->
    <q-list class="q-pa-sm">
      <q-list
        v-for="contact in contacts"
        :key="contact.username"
        class="bg-white"
      >
        <q-item clickable :v-ripple="false">
          <q-item-section avatar @click="$router.push('/chat')">
            <q-avatar size="xl" class="bg-primary">
              <q-img :src="contact.prfphoto" />
            </q-avatar>
          </q-item-section>

          <q-item-section @click="$router.push('/chat')">
            <q-item-label
              lines="1"
              class="defaultfont-semibold"
              style="font-size: medium"
            >
              {{ contact.housingname }}
            </q-item-label>
            <q-item-label lines="1" style="font-size: smaller">
              {{ contact.message }}
            </q-item-label>
          </q-item-section>

          <!-- OPTION BUTTON -->
          <q-item-section side>
            <q-btn
              label="Delete"
              unelevated
              rounded
              no-caps
              color="primary"
              style="height: 2.5rem"
              @click="confirmDelete()"
            />
          </q-item-section>
        </q-item>
        <q-separator size="0.25rem" color="secondary" />
      </q-list>
    </q-list>
  </q-page>
</template>

<script>
import { Vue } from "vue-class-component";

export default class Inbox extends Vue {
  contacts = [
    {
      username: 1,
      housingname: "Superboys Cottage",
      prfphoto: "https://cdn.quasar.dev/img/avatar1.jpg",
      message: "Hey Dodol, how r u boi",
    },
    {
      username: 2,
      housingname: "Zin-Azshari Boarding House",
      prfphoto: "https://cdn.quasar.dev/img/avatar2.jpg",
      message: "Hey Babe whacha doin..",
    },
    {
      username: 3,
      housingname: "Martell Ladies' Boarding",
      prfphoto: "https://cdn.quasar.dev/img/avatar3.jpg",
      message: "anda so kantonn!!",
    },
    {
      username: 4,
      housingname: "Pirate King Apartment",
      prfphoto: "https://cdn.quasar.dev/img/avatar4.jpg",
      message: "Antae tao sa college>",
    },
  ];

  confirmDelete() {
    this.$q.dialog({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this conversation?",
      cancel: true,
      persistent: true,
      class: "defaultfont",
    });
  }
}
</script>
