<template>
  <div class="q-px-sm defaultfont row items-start">
    <div
      v-for="(post, index) in visiblePost"
      :key="index"
      class="q-pa-xs"
      style="width: 50%"
    >
        <div>
          <q-img
            :src="`http://localhost:3000/media/${post.url}`"
            fit="cover"
            class="bg-primary"
            style="width: 100%; height: 18rem; border-radius: 0.5rem"
            @click="redirect(post)"
          >
            <div class="absolute-bottom text-left">
              <q-item-label lines="2" style="font-size: medium">
                {{ post.title }}
              </q-item-label>
            </div>
          </q-img>
        </div>

        <div class="q-my-xs q-px-xs row items-center">
          <div align="left" class="col-10">
            <q-item-label lines="1" class="defaultfont-semibold">
              <q-avatar size="sm" class="bg-primary">
                <q-img
                  v-if="post.user?.prfphoto"
                  :src="`http://localhost:3000/prfmedia/${post.user?.prfphoto}`"
                />
                <q-img
                  v-if="!post.user?.prfphoto"
                  src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg"
                />
              </q-avatar>
              <span class="q-ml-sm" style="font-size: small">
                {{ post.user?.housing?.name }}
              </span>
            </q-item-label>
          </div>
          <div align="right" class="col">
            <post-options />
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { PostInterface } from "src/store/post/state";
import { mapActions, mapGetters, mapState } from "vuex";
import { AUser } from "src/store/auth/state";
import {
  MediaInterface,
  MediaStateInterface,
} from "src/store/media-module/state";
import { PostDto, UserDto } from "src/services/rest-api";
import { truncate } from "fs";

@Options({
  computed: {
    ...mapState("post", ["posts"]),
    ...mapState("media", ["allMedia"]),
    ...mapState("auth", ["currentUser"]),
    ...mapState("account", ["allAccount", "newUser"]),
    ...mapGetters("post", ["visiblePost"]),
  },
  methods: {
    ...mapActions("account", ["getAllUser", "getUserById"]),
    ...mapActions("post", ["getAllPost"]),
    ...mapActions("media", ["getAllMedia"]),
    ...mapActions("auth", ["authUser"]),
  },
})
export default class PostFeedComponent extends Vue {
  getUserById!: (id: any) => Promise<void>;
  getAllPost!: () => Promise<void>;
  authUser!: () => Promise<void>;
  posts!: PostDto[];
  allMedia!: MediaInterface[];
  currentUser!: UserDto;
  visiblePost! : PostDto[];
  data: any = [];

  async mounted() {
    console.log("HELLO");
    await this.getAllPost();
    this.posts.filter(
      (i) => i.visibility == 'true'
    );

  }

  async redirect(post: any) {
    console.log(post);
    const postID = post.id;
    await this.$router.push(`/post/${postID}`);
  }
}
</script>

