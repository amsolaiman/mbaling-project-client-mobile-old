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
        Password
      </div>
    </template>
    <template #slot-right>
      <q-btn
        v-if="!editButton"
        label="Edit"
        unelevated
        rounded
        no-caps
        outline
        color="primary"
        class="q-mr-md defaultfont"
        style="height: 3rem; width: 4rem"
        @click="onEdit()"
      />
      <q-btn
        v-else
        label="Save"
        unelevated
        rounded
        no-caps
        color="primary"
        class="q-mr-md defaultfont"
        style="height: 3rem; width: 4rem"
        @click="onSave()"
      />
    </template>
  </page-header>

  <q-page v-if="!editButton" class="q-px-md q-pb-xl defaultfont bg-secondary">
    <div class="q-pt-md">
      <q-input
        label="Current password"
        stack-label
        disable
        type="password"
        style="font-size: medium"
      />
    </div>
  </q-page>

  <q-page v-else class="q-px-md q-pb-xl defaultfont bg-secondary">
    <div class="q-pt-md">
      <q-input
        v-model="password.oldPassword"
        label="Current password"
        stack-label
        :type="showPwd1 ? 'password' : 'text'"
        style="font-size: medium"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Input your old password']"
      >
        <template v-slot:append>
          <q-icon
            :name="showPwd1 ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
            class="cursor-pointer"
            @click="showPwd1 = !showPwd1"
          />
        </template>
      </q-input>

      <q-input
        v-model="password.newPassword"
        label="New password"
        stack-label
        :type="showPwd2 ? 'password' : 'text'"
        class="q-mt-lg"
        style="font-size: medium"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Input your new password']"
      >
        <template v-slot:append>
          <q-icon
            :name="showPwd2 ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
            class="cursor-pointer"
            @click="showPwd2 = !showPwd2"
          />
        </template>
      </q-input>

      <q-input
        v-model="confirmpassword"
        label="Confrim new password"
        stack-label
        :type="showPwd2 ? 'password' : 'text'"
        class="q-mt-lg"
        style="font-size: medium"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Input your confirm password',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="showPwd2 ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
            class="cursor-pointer"
            @click="showPwd2 = !showPwd2"
          />
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script lang="ts">
import { mbalingApiService } from "src/services/mbaling-api.service";
import { ChangePasswordDto } from "src/services/rest-api";
import { Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";

@Options({
  methods: {
    ...mapActions("auth", ["changePassword"]),
  },
})
export default class EditHousing extends Vue {
  changePassword!: (changePassword: ChangePasswordDto) => Promise<void>;
  password: ChangePasswordDto = {
    oldPassword: "",
    newPassword: "",
  };

  confirmpassword = "";
  showPwd1 = true;
  showPwd2 = true;

  async resetModel() {
    this.password = {
      oldPassword: "",
      newPassword: "",
    };
    this.confirmpassword = "";
  }

  editButton = false;

  async onEdit() {
    this.resetModel();
    this.editButton = true;
  }

  async onSave() {
    this.$q
      .dialog({
        title: "Confirm Edit",
        message: "Are you sure you want to publish the changes?",
        cancel: true,
        persistent: true,
        class: "defaultfont",
      })
      .onOk(async () => {
        this.editButton = false;
        try {
          if (this.password.newPassword != this.confirmpassword) {
            this.$q.notify({
              type: "negative",
              icon: "bi-exclamation-triangle-fill",
              position: "top",
              color: "secondary",
              textColor: "primary",
              message: "Passwords do not match.",
            });
            return;
          }
          await mbalingApiService.changePassword(this.password);
          this.$q.notify({
            type: "positive",
            icon: "bi-check-circle-fill",
            position: "top",
            color: "secondary",
            textColor: "primary",
            message: "Successfully edited.",
          });
          this.$router.go(-1);
        } catch (error: any) {
          this.$q.notify({
            type: "negative",
            icon: "bi-exclamation-triangle-fill",
            position: "top",
            color: "secondary",
            textColor: "primary",
            message: "Invalid current password",
          });
        }
      });
  }

  onClear() {
    this.confirmpassword = "";
    this.password = {
      oldPassword: "",
      newPassword: "",
    };
  }
}
</script>
