<template>
  <q-page class="defaultfont">
    <div class="bg-black">
      <!-- <q-img :src="`http://localhost:3000/media/${post.url}`" /> -->
      <q-carousel
        v-model="slide"
        navigation
        arrows
        animated
        infinite
        swipeable
        transition-prev="slide-right"
        transition-next="slide-left"
        height="20rem"
        autoplay
        class="bg-primary"
        style="border-radius: 2rem 2rem 0 0"
      >
        <template v-slot:navigation-icon="{ active, onClick }">
          <q-btn
            v-if="active"
            icon="bi-circle-fill"
            flat
            round
            dense
            size="0.4rem"
            color="primary"
            @click="onClick"
          />
          <q-btn
            v-else
            icon="bi-circle"
            flat
            round
            dense
            size="0.4rem"
            color="white"
            @click="onClick"
          />
        </template>
        <q-carousel-slide
          v-for="(photo, index) in data"
          :key="index"
          :name="photo"
          :img-src="`http://localhost:3000/media/${photo.id}`"
        />
      </q-carousel>
    </div>

    <div class="q-pa-sm bg-white">
      <q-item class="row items-center">
        <q-item-section avatar>
          <q-avatar size="xl" class="bg-primary">
            <q-img
              v-if="user.prfphoto"
              :src="`http://localhost:3000/prfmedia/${user.prfphoto}`"
            />
            <q-img
              v-if="!user.prfphoto"
              src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label
            lines="1"
            class="defaultfont-semibold"
            style="font-size: medium"
          >
            {{ post.user?.housing?.name }}
          </q-item-label>
          <q-item-label lines="1" style="font-size: small">
            @{{ post.user?.username }}
          </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-btn flat round color="black" size="md" @click="redirect(post)">
            <q-icon
              name="bi-arrow-up-short"
              size="lg"
              style="transform: rotate(45deg)"
            />
          </q-btn>
        </q-item-section>
      </q-item>
    </div>

    <div class="q-px-md bg-white">
      <div
        align="center"
        class="q-mt-xs defaultfont-semibold"
        style="font-size: large"
      >
        {{ post.title }}
      </div>
      <div align="center" class="q-py-xs" style="font-size: medium">
        {{ post.fee }} PHP monthly
      </div>
      <div align="center" class="text-bold" style="font-size: medium">
        {{ user.contact }}
      </div>
      <div class="q-pa-md" style="font-size: medium">
        <div>
          <q-icon
            :name="post.prvCR ? 'bi-check-square-fill' : 'bi-x-square-fill'"
            size="xs"
          />
          Private Kitchen
        </div>
        <div>
          <q-icon
            :name="
              post.prvKitchen ? 'bi-check-square-fill' : 'bi-x-square-fill'
            "
            size="xs"
          />
          Private CR
        </div>
      </div>

      <div class="q-pb-md description-content">
        {{ post.description }}
      </div>
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
    class="q-px-sm defaultfont bg-white text-black"
    style="height: 4rem"
  >
    <div class="row items-center" style="height: 4rem">
      <div v-if="currentUser.type == 'student'" align="left" class="col defaultfont">
        <div v-if="!user.chatLink">
          <a @click="alert()">
            <q-icon size="1.4rem" color="black" class="q-pl-sm bi bi-chat-fill">
            </q-icon>
          </a>
        </div>
        <div v-else>
          <a
            :href="`${user.chatLink}`"
            target="_blank"
            style="text-decoration: none"
          >
            <q-icon size="1.4rem" color="black" class="q-pl-sm bi bi-chat-fill">
            </q-icon>
          </a>
        </div>
      </div>
      <div v-else align="left" class="q-ml-sm col defaultfont">
       <div v-if="!user.mapLink">
          <a @click="alertmapLink()">
            <q-icon size="1.4rem" color="black" class="q-pr-sm bi-geo-alt-fill">
            </q-icon>
          </a>
        </div>
        <div v-else>
          <a
            :href="`${user.mapLink}`"
            target="_blank"
            style="text-decoration: none"
          >
            <q-icon size="1.4rem" color="black" class="q-pr-sm bi-geo-alt-fill">
            </q-icon>
          </a>
        </div>
      </div>

      <div v-if="currentUser.type == 'student'" align="center">
        <q-btn
          label="Apply"
          unelevated
          rounded
          no-caps
          color="primary"
          style="height: 3rem"
          @click="addApplication()"
        />
      </div>

      <div align="right" class="col">
        <post-options />
      </div>
    </div>
  </q-footer>
</template>

<script lang="ts">
import {
  ApplicationDto,
  MediaDto,
  PostDto,
  UserDto,
} from "src/services/rest-api";
import { AUser } from "src/store/auth/state";
import { Options, Vue } from "vue-class-component";
import { mapActions, mapState } from "vuex";

@Options({
  computed: {
    ...mapState("post", ["newPost"]),
    ...mapState("account", ["allAccount", "newUser"]),
    ...mapState("media", ["allPhotos"]),
    ...mapState("auth", ["currentUser"]),
  },
  methods: {
    ...mapActions("post", ["getPostById"]),
    ...mapActions("account", ["getAllUser", "getUserById"]),
    ...mapActions("media", ["getAllMedia"]),
    ...mapActions("auth", ["authUser"]),
    ...mapActions("application", ["createApplication"]),
  },
})
export default class Post extends Vue {
  createApplication!: (payload: any) => Promise<void>;
  getUserById!: (id: any) => Promise<void>;
  getPostById!: (id: any) => Promise<void>;
  getAllMedia!: () => Promise<void>;
  authUser!: () => Promise<void>;

  currentUser!: AUser;
  newPost!: any;
  newUser!: any;
  allPhotos!: any[];
  data: any = [];

  slide = 1;
  fullscreen = false;
  isStudent = true;
  loading = false;

  application: any = {
    status: "",
  };

  user: UserDto = {
    fName: "",
    lName: "",
    type: "",
    status: "",
    username: "",
    password: "",
    birthdate: "",
    degree: "",
    department: "",
    college: "",
    contact: "",
    gender: "",
    year: "",
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    prfphoto: 0,
    chatLink: "",
    mapLink: "",
  };

  post: any = {
    description: "",
    fee: "",
    prvCR: false,
    prvKitchen: false,
    photos: "",
    title: "",
    housingAddress: "",
    url: 0,
    userID: 0,
    visibility: "true"
  };

  async created() {
    await this.getAllMedia();
    console.log(this.$route.params.id, this.allPhotos);
    this.data = this.allPhotos.filter(
      (i) => this.$route.params.id === i.postPhotoID
    );
    console.log(this.data);
  }

  async mounted() {
    await this.authUser();
    const postId = this.$route.params.id;
    await this.getPostById(postId);
    this.post = this.newPost;
    console.log(this.post.id + "Post ID is here 2");
    await this.getUserById(this.post.userID);
    this.user = this.newUser;
  }

  async redirect(post: any) {
    console.log(post);
    const postID = post.userID;
    await this.$router.push(`/profile/${postID}`);
  }

  async addApplication() {
    this.application = {
      status: "pending",
      student: this.currentUser.id,
      landlord: this.post?.user?.id,
      post: this.post.id,
    };
    try {
      this.loading = true;
      if (this.currentUser.type == "student") {
        const seeApp = await this.createApplication({
          ...this.application,
          student: this.currentUser.id,
          landlord: this.post?.user?.id,
        });
        console.log(seeApp)
        this.$q.notify({
          position: "top",
          textColor: "primary",
          color: "secondary",
          type: "positive",
          icon: "bi-check-circle-fill",
          message: "Application sent.",
          classes: "defaultfont",
        });
        this.loading = false;
      }
    } catch (error) {
      this.$q.notify({
        type: "negative",
        icon: "bi-exclamation-triangle-fill",
        color: "primary",
        textColor: "secondary",
        position: "top",
        message: "You have pending application.",
        classes: "defaultfont",
      });
    }
    // this.$q.notify({
    //   type: 'positive',
    //   caption: 'Click ',
    //   position: 'bottom',
    //   color: "secondary",
    //   textColor: "primary",
    //   classes: "defaultfont",
    // });
  }
  alert() {
    if (this.user.chatLink == "")
      this.$q.dialog({
        message: "This user does not have a Messenger.",
        class: "defaultfont",
      });
  }
  alertmapLink() {
    if (this.user.mapLink == "")
      this.$q.dialog({
        message: "This user does not have a Google Map.",
        class: "defaultfont",
      });
  }
}
</script>

<style>
.description-content {
  white-space: pre-line;
  font-size: small;
}
</style>
