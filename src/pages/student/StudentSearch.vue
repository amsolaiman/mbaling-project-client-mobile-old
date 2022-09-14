<template>
  <q-header
    class="q-pa-md defaultfont bg-secondary text-black"
    style="height: 4.5rem"
  >
    <!-- SEARCH INPUT FIELD -->
    <q-form @submit="searchAction()">
      <q-input
        v-model="search"
        rounded
        outlined
        dense
        clearable
        placeholder="Search"
        class="searchinput"
        @clear="clearSearch()"
        @keyup.enter="searchAction()"
      >
        <template v-slot:prepend>
          <q-btn flat round size="sm">
            <q-icon name="bi-search" type="submit" size="xs" />
          </q-btn>
        </template>
      </q-input>
    </q-form>
  </q-header>

  <!-- Search Result User -->

  <q-page v-if="(searchResultPost.length || searchResultUser.length) > 0">
    <div  class="q-pt-sm q-px-sm defaultfont">
      <div class="q-ml-sm defaultfont-semibold text-body1">USERS</div>
      <div class="q-px-xs">
        <q-scroll-area :visible="false" style="height: 5.5rem; max-width: 100%">
          <div class="q-pt-xs row items-start no-wrap">
            <div v-for="(result, index) in searchResultUser" :key="index">
              <div v-if="result.type == 'landlord'">
              <q-avatar
                size="4rem"
                class="bg-primary q-mx-xs"
              >
                <!-- <q-img :src="`http://localhost:3000/media/${result.prfphoto}`"> -->
                <q-img v-if="result.prfphoto" class="avatar q-pt-none q-mt-none"
                  :src="`http://localhost:3000/prfmedia/${result.prfphoto}`"
                  @click="redirectUser(result)"
                />
                <img v-if="!result.prfphoto" class="avatar q-pt-none q-mt-none"
                @click="redirectUser(result)"
                 src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg" />
                  <q-tooltip>
                    {{ result.housingunit }}
                  </q-tooltip>
                <!-- </q-img> -->
              </q-avatar>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>

  <!-- Search Result Post -->

    <div
      v-if="searchResultPost.length > 0"
      class="q-pt-sm q-px-sm q-pb-md defaultfont"
    >
      <div class="q-ml-sm defaultfont-semibold text-body1">POSTS</div>
      <div class="defaultfont row items-start">
        <div
          v-for="(result,index) in searchResultPost"
          :key="index"
          class="q-pa-xs"
          style="width: 50%"
        >
          <div>
            <q-img
              :src="`http://localhost:3000/media/${result.url}`"
              fit="cover"
              class="bg-primary"
              style="width: 100%; height: 18rem; border-radius: 0.5rem"
              @click="redirectPost(result)"
            >
              <div class="absolute-bottom text-left">
                <q-item-label lines="2" style="font-size: medium">
                  {{ result.title }}
                </q-item-label>
              </div>
            </q-img>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref } from "vue";
import { Vue, Options } from "vue-class-component";
import { PostInterface } from "src/store/post/state";
import { UserInterface } from "src/store/user/state";
import { mapActions, mapGetters, mapState } from "vuex";
import { AUser } from "src/store/auth/state";
import { PostDto, UserDto } from "src/services/rest-api";

@Options({
  computed: {
    ...mapState("post", ["posts"]),
    ...mapState('auth', ['currentUser']),
    ...mapState('account', ['allAccount']),
    ...mapGetters("post", ["visiblePost"]),
  },
  methods: {
    ...mapActions('post', ['getAllPost']),
    ...mapActions('auth', ['authUser']),
    ...mapActions("account", ["getAllUser"]),
  },
})
export default class StudentSearch extends Vue {
  getAllUser!: () => Promise<void>;
  getAllPost! : () => Promise<void>
  getAllMedia!: () => Promise<void>
  authUser! : () => Promise<void>
  posts!: PostDto[];
  allAccount!: UserInterface[]
  currentUser!: UserDto
  visiblePost! : PostDto[];


  async mounted() {
    await this.getAllPost();
    await this.getAllUser()
    console.log('Hello')
  }

  async redirectPost(post: any) {
    console.log(post);
    const postID = post.id;
    await this.$router.push(`/post/${postID}`);
  }

  async redirectUser(user: any) {
    console.log(user);
    const userID = user.id;
    await this.$router.push(`/profile/${userID}`);
  }

  search = "";
  tab = ref("posts");
  loadingState = false;

  searchResultPost: PostInterface[] = [];
  searchResultUser: UserInterface[] = [];

  searchAction() {
    const resultUsers = this.allAccount.filter(
      (user: any) =>
        user.housing?.name.toLowerCase().includes(this.search.toLowerCase()) ||
        user.username.toLowerCase().includes(this.search.toLowerCase())
    );
    const resultPosts = this.visiblePost.filter((post) =>
      post.title.toLowerCase().includes(this.search.toLowerCase())
    );

    this.searchResultPost = resultPosts;
    this.searchResultUser = resultUsers;
  }

  clearSearch() {
    this.searchResultPost = [];
    this.searchResultUser = [];
    this.search = "";
  }
}
</script>

<style>
.searchinput {
  font-size: medium;
  background-color: #f2f2f2;
  border-radius: 10rem;
}
</style>
