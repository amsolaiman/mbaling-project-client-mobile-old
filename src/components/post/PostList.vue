<template>
  <div class="q-px-sm defaultfont">
    <div v-for="post in posts" :key="post" class="q-mb-sm q-pa-xs">
      <div>
        <div v-if="post.userID == currentUser.id">
          <q-img
            :src="`http://localhost:3000/media/${post.url}`"
            fit="cover"
            class="bg-primary"
            style="width: 100%; height: 16rem; border-radius: 0.5rem"
            @click="redirectPost(post)"
          >
            <div class="absolute-bottom text-left">
              <q-item-label lines="2" style="font-size: medium">
                {{ post.title }}
              </q-item-label>
            </div>
          </q-img>

          <div class="q-my-xs q-px-xs row items-center">
            <div class="col">
              <span class="text-bold" style="font-size: small">
                <q-btn
                  dense
                  flat
                  round
                  :ripple="false"
                  color="black"
                  :icon="post.visibility == 'true' ? 'bi-eye-fill' : 'bi-eye-slash-fill'"
                  @click="toggleVisibility(post)"
                />
                Toggle visibility
              </span>
            </div>
            <div align="right" class="col-6">
              <q-btn
                label="Edit"
                unelevated
                rounded
                no-caps
                color="primary"
                class="text-center text-caption"
                style="width: 4rem"
                @click="redirect(post)"
              />
              <q-btn
                label="Delete"
                unelevated
                rounded
                outline
                no-caps
                color="primary"
                class="q-ml-sm text-center text-caption"
                style="width: 4rem"
                @click="delPost(post.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { PostInterface } from "src/store/post/state";
import { mapActions, mapState } from "vuex";
import { PostDto } from "src/services/rest-api";
import { AUser } from "src/store/auth/state";
import { MediaInterface } from "src/store/media-module/state";

@Options({
  computed: {
    ...mapState("post", ["posts"]),
    ...mapState("media", ["allMedia"]),
    ...mapState("auth", ["currentUser"]),
  },
  methods: {
    ...mapActions("post", ["getPostById", "editPost"]),
    ...mapActions("post", ["getAllPost", "deletePost"]),
    ...mapActions("media", ["getAllMedia"]),
    ...mapActions("auth", ["authUser"]),
  },
})
export default class PostPageComponent extends Vue {
  editPost!: (payload: PostDto) => Promise<PostDto>;
  deletePost!: (id: PostDto) => Promise<void>;
  getAllPost!: () => Promise<void>;
  authUser!: () => Promise<void>;
  posts!: PostDto[];
  allMedia!: MediaInterface[];
  currentUser!: AUser;

  visible = true;

  post: any = {
    visibility: true,
  };

  async mounted() {
    await this.getAllPost();
    await this.authUser();
  }

  async redirectPost(post: any) {
    console.log(post);
    const postID = post.id;
    await this.$router.push(`/post/${postID}`);
  }

  async redirect(post: any) {
    console.log(post);
    const postID = post.id;
    await this.$router.push(`/post/edit/${postID}`);
  }

  async testingToggle(){
    console.log('testing toggle here')
  }
  async toggleVisibility(val: any){
    console.log('toggle here')
    console.log(val.visibility)
    if(val.visibility == 'true'){
        const editVisible = await this.editPost({...val, visibility: 'false'});
      console.log(editVisible.id+ " hello")
    }
    else if (val.visibility == 'false' ){
        const editVisible = await this.editPost({...val, visibility: 'true'});
      console.log(editVisible.id+ " hello")
    }



  }

  async delPost(val: any) {
    console.log(val);
    this.$q
      .dialog({
        title: "Confirm Delete",
        message: "Are you sure you want to delete this post?",
        cancel: true,
        persistent: true,
        class: "defaultfont",
      })
      .onOk(async () => {
        console.log(val + "second val here");
        await this.deletePost(val);
        console.log((val = "third val here"));
        this.$q.notify({
          type: "positive",
          icon: "bi-check-circle-fill",
          message: "Successfully deleted.",
          position: "top",
          color: "secondary",
          textColor: "primary",
          classes: "defaultfont",
        });
      });
  }
}
</script>
