<template>
  <q-form @submit="createPost()" greedy>
    <q-page class="defaultfont text-black">
      <!-- <div class="bg-black" style="height: 20rem">
      <div
        class="bg-grey-4 row items-center justify-evenly"
        style="height: 100%; border-radius: 2rem 2rem 0 0"
      >
        <q-icon name="bi-image" size="10rem" color="grey" />
      </div>
    </div> -->

      <!-- <div align="right" class="q-px-md q-py-sm row items-center">
      <div class="col">
        <q-btn
          v-on:click="showClearBtn = !showClearBtn"
          label="Upload"
          unelevated
          rounded
          no-caps
          color="primary"
          class="q-ml-sm text-center"
          style="height: 2rem"
        />
        <Transition name="appear">
          <q-btn
            v-show="showClearBtn"
            icon="bi-x-circle"
            flat
            dense
            :ripple="false"
            size="md"
            class="q-ml-sm text-primary"
          />
        </Transition>
      </div>
    </div> -->
      <div class="flex flex-center" style="height: 20rem">
        <div>
          <q-file
            outlined
            label="Upload image 1"
            accept=".jpg, image/*"
            v-model="ImageAttachement1"
            sstyle="width: 20rem"
            class="q-mb-sm"
            lazy-rules
            :rules="[(val) => val.size > 0 || 'Image is required']"
            hide-bottom-space
          />
          <q-file
            outlined
            label="Upload image 2"
            accept=".jpg, image/*"
            v-model="ImageAttachement2"
            style="width: 20rem"
            class="q-mb-sm"
            lazy-rules
            :rules="[(val) => val.size > 0 || 'Image is required']"
            hide-bottom-space
          />

          <div align="center">
            <q-btn
              v-if="addButton"
              round
              dense
              flat
              size="lg"
              color="grey-5"
              icon="bi-plus-circle"
              @click="addPicture()"
              class="flex flex-center"
            />
          </div>

          <q-file
            v-if="addImage"
            outlined
            label="Upload image 3"
            accept=".jpg, image/*"
            v-model="ImageAttachement3"
            style="width: 20rem"
            class="q-mb-sm"
            lazy-rules
            :rules="[(val) => val.size > 0 || 'Image is required']"
            hide-bottom-space
          />
        </div>
      </div>
      <div class="q-mt-sm q-px-md">
        <q-input
          v-model="inputPost.title"
          autogrow
          dense
          placeholder="Title"
          input-class="text-center"
          style="font-size: medium"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please Input Title']"
          hide-bottom-space
        />
        <q-input
          v-model="inputPost.fee"
          dense
          placeholder="Monthly Fee"
          input-class="text-center"
          class="q-mt-xs q-px-xl"
          style="font-size: medium"
          type="number"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please Input Fee']"
          hide-bottom-space
        />

        <div class="q-px-md q-mt-md row items-center">
          <div align="center" class="col">
            <q-checkbox
              label="Private Kitchen"
              v-model="inputPost.prvCR"
              dense
              color="primary"
            />
          </div>
          <div align="center" class="col">
            <q-checkbox
              label="Private CR"
              v-model="inputPost.prvKitchen"
              dense
              color="primary"
            />
          </div>
        </div>

        <q-input
          v-model="inputPost.description"
          stack-label
          type="textarea"
          label="Description"
          class="q-mt-md q-pb-lg"
          style="font-size: small"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please Input Description',
          ]"
          hide-bottom-space
        />

        <q-input
          v-model="inputNumber.contact"
          stack-label
          type="tel"
          mask="#### - ### - ####"
          label="Enter your contact number here"
          input-class="text-left"
          class="q-mt-md"
          style="font-size: medium"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please Input contact']"
          hide-bottom-space
        />
      </div>

      <q-page-sticky position="top-left" :offset="[18, 18]">
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
      bordered
      class="q-px-md defaultfont bg-white row items-center"
      style="height: 4rem"
    >
      <div align="right" class="col">
        <q-btn
          label="Post"
          unelevated
          rounded
          no-caps
          color="primary"
          style="height: 3rem; width: 5rem"
          type="submit"
        />
      </div>
    </q-footer>
  </q-form>
</template>

<script lang="ts">
import { date } from "quasar";
import { MediaDto, PostDto } from "src/services/rest-api";
import { UserDto } from "src/services/rest-api";
import { AUser } from "src/store/auth/state";
import { Options, Vue } from "vue-class-component";
import { mapState, mapActions } from "vuex";

const timeStamp = Date.now();
const curentDate = date.formatDate(timeStamp, "YYYY-MM-DD:HH:mm");
const curentDate2 = date.formatDate(timeStamp, "MMMM DD -- hh:mm");

@Options({
  computed: {
    ...mapState("post", ["posts"]),
    ...mapState("auth", ["currentUser"]),
  },
  methods: {
    ...mapActions("post", ["addPost", "editPost"]),
    ...mapActions("auth", ["authUser"]),
    ...mapActions("media", ["uploadMedia"]),
    ...mapActions("account", ["editAccount", "getAllUser"]),
  },
})
export default class PostForm extends Vue {
  uploadMedia!: (payload: any) => Promise<MediaDto>;
  addPost!: (payload: PostDto) => Promise<PostDto>;
  editAccount!: (payload: UserDto) => Promise<void>;
  editPost!: (payload: any) => Promise<void>;
  authUser!: () => Promise<void>;

  currentUser!: UserDto;

  async mounted() {
    await this.authUser();
    this.inputNumber = { ...this.currentUser };
  }

  pkBox = false;
  pcBox = false;
  showClearBtn = false;
  addnewPost = false;
  model = "";
  // ImageAttachement1: File[] | File = [];
  ImageAttachement1: File = new File([], "");
  ImageAttachement2: File = new File([], "");
  ImageAttachement3: File = new File([], "");

  // adding Pictures TAE! a code HAHA
  addImage = false;
  addButton = true;
  async addPicture() {
    this.addImage = true;
    this.addButton = false;
  }
  // ------------------------

  inputPost: any = {
    id: 0,
    description: "",
    fee: "",
    prvCR: false,
    prvKitchen: false,
    photos: "",
    title: "",
    housingAddress: "",
    url: 0,
    userID: 0,
    visibility: "true",
  };

  inputNumber: any = {
    contact: "",
  };

  async resetModel() {
    this.inputPost = {
      id: 0,
      description: "",
      fee: "",
      prvCR: false,
      prvKitchen: false,
      photos: "",
      title: "",
      visibility: "true",
      housingAddress: "",
      url: 0,
      userID: 0,
    };
  }

  async createPost() {
    this.$q
      .dialog({
        title: "Confirm Post",
        message: "Are you sure you want to publish this post?",
        cancel: true,
        persistent: true,
        class: "defaultfont",
      })
      .onOk(async () => {
    console.log();
    if (this.currentUser.chatLink == "") {
      this.$q
        .dialog({
          title: "Chat link",
          message: "Please link your Messenger to your account.",
          cancel: true,
          persistent: true,
          class: "defaultfont",
        })
        .onOk(async () => {
          await this.$router.replace("/landlord/account");
        });
    } else {
      const post = await this.addPost({
        ...this.inputPost,
        userID: this.currentUser.id,
      });
      const media = await this.uploadMedia({
        media: this.ImageAttachement1,
        postPhotoId: post.id,
      });
      await this.editAccount(this.inputNumber);
      if (this.ImageAttachement2.size > 0) {
        await this.editPost({ id: post.id, url: media.id });
        await this.uploadMedia({
          media: this.ImageAttachement2,
          postPhotoId: post.id,
        });
      }
      if (this.ImageAttachement3.size > 0) {
        await this.uploadMedia({
          media: this.ImageAttachement3,
          postPhotoId: post.id,
        });
      }
      this.$router.go(-1);
      this.addnewPost = false;
      this.$q.notify({
        type: "positive",
        icon: "bi-check-circle-fill",
        message: "Successfully posted.",
        position: "top",
        color: "secondary",
        textColor: "primary",
        classes: "defaultfont",
      });
      }
    });

    // if (this.ImageAttachement2.size > 0) {
    //   await this.uploadMedia(this.ImageAttachement2 as File);
    // } else if (this.ImageAttachement2.size <= 0) {
    // }
    // if (this.ImageAttachement3.size > 0) {
    //   await this.uploadMedia(this.ImageAttachement3 as File);
    // } else if (this.ImageAttachement3.size <= 0) {
    // }
  }

  alert() {
    this.$q.dialog({
      message: "This feature is not available yet.",
      class: "defaultfont",
    });
  }
}
</script>

<style>
.appear-enter-active {
  animation: bounce-in 0.5s;
}
.appear-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
