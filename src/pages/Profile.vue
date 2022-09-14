<template>
  <q-header class="q-px-md q-pt-xl defaultfont bg-secondary">
    <div align="center" class="text-black">
      <q-avatar size="10rem" class="bg-primary">
        <q-img
          v-if="user.prfphoto"
          class="avatar"
          :src="`http://localhost:3000/prfmedia/${user.prfphoto}`"
        />
        <q-img
          v-if="!user.prfphoto"
          class="avatar"
          src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg"
        />
      </q-avatar>
      <div
        class="q-mt-md q-px-lg defaultfont-bold text-uppercase"
        style="font-size: large"
      >
        {{ user.housing?.name }}
      </div>
      <div
        class="q-px-lg defaultfont-light text-primary text-bold"
        style="font-size: medium"
      >
        @{{ user.username }}
      </div>
      <div class="q-mt-sm q-px-md" style="font-size: medium">
        <p style="line-height: 1.2rem">
          {{ user.address1 }}, {{ user.address2 }} <br />
          {{ user.address3 }}, {{ user.address4 }}
        </p>
      </div>
    </div>
    <q-separator color="primary" size="0.1rem" class="q-my-sm" />
  </q-header>
  <!-- <div class="q-ml-md defaultfont-bold">
    Boraders:
    <span class="defaultfont-light">{{
      this.data.length + this.nonAccountdata.length
    }}</span>
  </div> -->
  <q-page class="defaultfont bg-secondary text-black">
    <div class="q-pt-sm q-px-sm q-pb-md defaultfont">
      <div class="q-ml-sm defaultfont-semibold text-body1">POSTS</div>
      <div class="defaultfont row items-start">
        <div
          v-for="(post, index) in postData"
          :key="index"
          class="q-pa-xs"
          style="width: 50%"
        >
            <q-img
              :src="`http://localhost:3000/media/${post.url}`"
              fit="cover"
              class="bg-primary"
              style="width: 100%; height: 16rem; border-radius: 0.5rem"
              @click="redirect(post)"
            >
              <div class="absolute-bottom text-left">
                <q-item-label lines="2" style="font-size: medium">
                  {{ post.title }}
                </q-item-label>
              </div>
            </q-img>
        </div>
        <div v-if="postData.length == 0"
        stack
        class="flex flex-center"
        style="width:100%; height: 20rem">
          <!-- <q-icon color="grey-6" class="color-grey-4" name="no_photography" size="7rem" label="No post yet"/> -->
              <div class="text-h6" >
                    No post yet
              </div>
        </div>
      </div>
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
    bordered
    class="q-px-sm defaultfont bg-white text-black"
    style="height: 4rem"
  >
    <div class="row items-center" style="height: 4rem">
      <div v-if="currentUser.type == 'student'" align="left" class="col defaultfont">
        <div v-if="!(user.chatLink)">
          <a
            @click="alertchatLink()"
          >
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
      <div
            v-if="currentUser.type == 'student'"
            class="flex flex-center text-primary defaultfont"
          >
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
        <!-- <q-btn
          icon="bi-geo-alt-fill"
          flat
          round
          :ripple="false"
          color="black"
          size="md"
          @click="alert()"
        /> -->
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
    </div>
  </q-footer>
</template>

<script lang="ts">
import { debug } from "console";
import {
  ApplicationDto,
  NonAccountDto,
  PostDto,
  UserDto,
} from "src/services/rest-api";
import { UserInterface } from "src/store/user/state";
import { Options, Vue } from "vue-class-component";
import { mapState, mapActions, mapGetters } from "vuex";

@Options({
  computed: {
    ...mapState("post", ["posts"]),
    ...mapState("account", ["allAccount", "newUser"]),
    ...mapState("application", ["applications"]),
    ...mapState("nonaccount", ["allNonAccount"]),
    ...mapState("auth", ["currentUser"]),
    ...mapGetters("application", ["getAcceptedAccount"]),
    ...mapGetters("post", ["visiblePost"]),
  },
  methods: {
    ...mapActions("account", ["getAllUser", "getUserById"]),
    ...mapActions("post", ["getAllPost", "getPostById"]),
    ...mapActions("application", ["getAllApplication", "updateApplication", "createApplication"]),
    ...mapActions("nonaccount", ["getAllNonAccount",]),
  },
})
export default class Profile extends Vue {
  createApplication!: (payload: any) => Promise<void>;
  getUserById!: (id: any) => Promise<void>;
  getPostById!: (id: any) => Promise<void>;
  getAllPost!: () => Promise<void>;
  getAllUser!: () => Promise<void>;
  getAllApplication!: () => Promise<void>;
  getAllNonAccount!: () => Promise<void>;

  allNonAccount!: NonAccountDto[];
  data: any = [];
  getAcceptedAccount!: ApplicationDto[];
  newUser!: any;
  posts!: PostDto[];
  allAccount!: UserInterface[];
  currentUser!: any;
  nonAccountdata: any = [];
  postData: any = [];
  visiblePost! : PostDto[];
  isStudent = true;

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

  loading = false;

  application: any = {
    status: "",
  };


  async mounted() {
    const userId = this.$route.params.id;
    await this.getUserById(userId);
    this.user = this.newUser;

    console.log(this.user.id )

    await this.getAllPost();
    this.postData = this.visiblePost.filter(
      (i) => i.user?.id == this.user.id)
      console.log(this.visiblePost)

    await this.getAllApplication();
    this.data = this.getAcceptedAccount.filter(
      (i) => i.landlord?.id == this.user.id
    );

    await this.getAllNonAccount();
    this.nonAccountdata = this.allNonAccount.filter(
      (i) => i.landlord?.id == this.user.id
    );
  }

  post: PostDto = {
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
        await this.createApplication({
          ...this.application,
          student: this.currentUser.id,
        });
        this.$q.notify({
          position: 'top',
          textColor: 'primary',
          color: 'secondary',
          type: "positive",
          message: "Successfully Applied!",
          caption: "Landlord will contact you soon.",
        });
        this.loading = false;
      } else {
        this.$q.notify({
          type: "negative",
          message: "Only Student can Apply!",
        });
      }
    } catch (error) {
      this.$q.notify({
        position: "top",
        textColor: "secondary",
        color: "primary",
        type: "negative",
        message: "Already Applied!",
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

  async redirect(post: any) {
    console.log(post);
    const postID = post.id;
    await this.$router.push(`/post/${postID}`);
  }

  alertchatLink() {
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
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50% !important;
  border: 2px solid rgb(190, 40, 45) !important;
}
</style>
