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
        About
      </div>
    </template>
  </page-header>

  <q-page class="q-pb-xl defaultfont">
    <div align="center" class="q-pa-lg">
      <q-img src="~assets/mbaling-logo-vertical-alt.svg" style="width: 5rem" />
    </div>
    <div class="q-mt-sm q-px-lg">
      <!-- <p style="line-height: 1rem">
        <div>Version</div> <br />
        <span class="text-h6">1.0.0(2022)</span>
      </p> -->
    </div>
    <q-separator />
    <div class="q-mt-md q-px-lg">
      Copyright © 2022 Mindanao State University system. All rights reserved.

      <div class="q-mt-md">
        <b>mBALING</b> is a student housing management system for on-campus housing firms in MSU-Marawi City campus.
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class About extends Vue {}
</script>
