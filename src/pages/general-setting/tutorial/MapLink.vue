<template>
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
        Set map link
      </div>
    </template>
  </page-header>

  <q-page class="q-px-lg q-pb-xl defaultfont bg-secondary">
    <div class="q-pt-lg" style="font-size: medium">
      <b style="font-size: x-large">1.</b>
      Launch the <b>Google Maps</b> app on your phone with your official Google
      account.
      <div align="center" class="q-mt-sm">
        <q-img src="~src\assets\maplink\maplink-01.jpg" class="image" />
      </div>
    </div>

    <div class="q-pt-lg" style="font-size: medium">
      <b style="font-size: x-large">2.</b>
      Search/locate your housing firm in the map (long-press on the location).
      <div align="center" class="q-mt-sm">
        <q-img src="~src\assets\maplink\maplink-02.jpg" class="image" />
      </div>
    </div>

    <div class="q-pt-lg" style="font-size: medium">
      <b style="font-size: x-large">3.</b>
      Tap on the share button.
      <div align="center" class="q-mt-sm">
        <q-img src="~src\assets\maplink\maplink-03.jpg" class="image" />
      </div>
    </div>

    <div class="q-pt-lg" style="font-size: medium">
      <b style="font-size: x-large">4.</b>
      Tap on <b>Copy to clipboard</b>.
      <div align="center" class="q-mt-sm">
        <q-img src="~src\assets\maplink\maplink-04.jpg" class="image" />
      </div>
    </div>

    <div class="q-pt-lg" style="font-size: medium">
      <b style="font-size: x-large">5.</b>
      Go to any note app in your phone.
      <div align="center" class="q-mt-sm">
        <q-img src="~src\assets\maplink\maplink-05.jpg" class="image" />
      </div>
    </div>

    <div class="q-pt-lg" style="font-size: medium">
      <b style="font-size: x-large">6.</b>
      Paste your Google Maps link.
      <div align="center" class="q-mt-sm">
        <q-img src="~src\assets\maplink\maplink-06.jpg" class="image" />
      </div>
    </div>

    <div class="q-pt-lg" style="font-size: medium">
      <b style="font-size: x-large">7.</b>
      Select and copy only the URL among the texts.
      <div align="center" class="q-mt-sm">
        <q-img src="~src\assets\maplink\maplink-07.jpg" class="image" />
      </div>
    </div>

    <div class="q-pt-lg" style="font-size: medium">
      <b style="font-size: x-large">8.</b>
      Go to your mBALING account page and tap on the edit button in the
      <b>Set map link</b> section.
      <div align="center" class="q-mt-sm">
        <q-img src="~src\assets\maplink\maplink-08.jpg" class="image" />
      </div>
    </div>

    <div class="q-pt-lg" style="font-size: medium">
      <b style="font-size: x-large">9.</b>
      Paste your map location link and tap save.
      <div align="center" class="q-mt-sm">
        <q-img src="~src\assets\maplink\maplink-09.jpg" class="image" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class ChatLink extends Vue {}
</script>
<style>
.image {
  max-width: 90%;
  box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
}
</style>
