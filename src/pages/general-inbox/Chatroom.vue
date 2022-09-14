<template>
  <q-header
    class="q-px-md defaultfont row items-center bg-secondary text-black"
    style="height: 4rem"
  >
    <div align="left" class="col-8">
      <q-item-label
        lines="1"
        class="defaultfont-semibold"
        style="font-size: medium"
      >
        <q-avatar size="lg" class="q-mx-xs bg-primary">
          <q-img src="https://cdn.quasar.dev/img/avatar2.jpg" />
        </q-avatar>
        @zinboarding
      </q-item-label>
    </div>
    <div align="right" class="col">
      <q-btn
        label="Delete"
        unelevated
        rounded
        no-caps
        color="primary"
        style="height: 3rem"
        @click="confirmDelete()"
      />
    </div>
  </q-header>

  <q-page class="defaultfont bg-secondary flex column">
    <div class="q-pa-lg">
      <q-chat-message
        v-for="message in messages"
        :sent="message.from == 'me' ? true : false"
        :key="message.text"
        :text="[message.text]"
        :bg-color="message.from == 'me' ? 'primary' : 'grey-4'"
        :text-color="message.from == 'me' ? 'white' : 'black'"
      />
    </div>

    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn
        icon="bi-arrow-left-short"
        unelevated
        round
        color="black"
        style="opacity: 0.5"
        @click="$router.go(-1)"
      />
    </q-page-sticky>
  </q-page>

  <q-footer
    class="q-px-md defaultfont bg-secondary flex flex-center"
    style="height: 4rem"
  >
    <q-input
      v-model="newMessage"
      dense
      rounded
      outlined
      placeholder="Message"
      bg-color="white"
      class="full-width"
      @keyup.enter="sendMessage()"
    >
      <template v-slot:append>
        <q-btn
          icon="send"
          :disable="!newMessage"
          flat
          class="q-pa-none"
          @click="sendMessage()"
        />
      </template>
    </q-input>
  </q-footer>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Chatroom extends Vue {
  showOptions = false;
  newMessage = "";
  messages = [
    {
      text: "Hey Dodol, how r u boi",
      from: "me",
    },
    {
      text: "yow im fine boi",
      from: "them",
    },
    {
      text: "im just to chill",
      from: "me",
    },
  ];

  sendMessage() {
    this.messages.push({
      text: this.newMessage,
      from: "me",
    });
    this.newMessage = "";
  }

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
