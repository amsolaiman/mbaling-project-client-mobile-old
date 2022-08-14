<template>
  <div class="feeds__container">
    <div v-for="post in posts" :key="post.id">
      <div>
        <q-img
          src="https://cdn.quasar.dev/img/parallax1.jpg"
          fit="cover"
          class="post__image"
        >
          <div class="absolute-bottom text-left">
            <q-item-label lines="2" style="font-size: medium">
              {{ post.title }}
            </q-item-label>
          </div>
        </q-img>
      </div>

      <div class="post__user row">
        <div align="left" class="col-10 post__user-avatar">
          <q-item-label lines="1">
            <q-avatar size="sm">
              <q-img src="https://cdn.quasar.dev/img/avatar2.jpg" />
            </q-avatar>
            <span>
              {{ post.housingName }}
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
import { Vue } from "vue-class-component";

export default class PostFeedComponent extends Vue {
  posts = [
    {
      id: 135413523,
      title:
        "Free boarding room @ Zin-Azshari Boarding House 5th street MSU-Marawi",
      fee: "1200",
      description: `Room dimension: 12x10ft
          Beds: 2 (single bed)
          rent fee is per person
          w/ Personal cabinet and shelves
          w/ 24/7 security camera surveillance

          POLICIEs:
          -Observe cleanliness and personal privacy
          -Respect other boarders (if you have problems with other boarder, in the manager to settle them)
          -Always lock the door when leaving your room
          -The management will not be liable of your stolen properties
          -No visitors allowed
          -Curfew is 9pm-5am`,
      prvKitchen: false,
      prvCR: false,
      photos: [
        {
          id: 1,
          url: "https://cdn.quasar.dev/img/parallax1.jpg",
        },
        {
          id: 2,
          url: "https://cdn.quasar.dev/img/mountains.jpg",
        },
        {
          id: 3,
          url: "https://cdn.quasar.dev/img/quasar.jpg",
        },
      ],

      firstname: "Azshara",
      middlename: "Queldorei",
      lastname: "Highborne",
      prfphoto: "https://cdn.quasar.dev/img/avatar2.jpg",
      housingName: "Zin-Azshari Boarding House",

      date: 1631096539262,
      likes: 44,
      bookmarks: 1,
    },
  ];
}
</script>

<style scoped>
.feeds__container {
  display: grid;
  grid-template-columns: repeat(2, 49%);
  gap: 2%;
  padding-bottom: 4rem;
}

.feeds__container > div {
  margin-bottom: -0.6rem;
}

.post__image {
  background: var(--color-primary);
  width: 100%;
  height: 18rem;
  border-radius: 0.5rem;
}

.post__user {
  display: flex;
  align-items: center;
  padding: 0.3rem;
}

.post__user-avatar {
  font-weight: 600;
}

.post__user-avatar .q-avatar {
  background: var(--color-primary);
}

.post__user-avatar span {
  margin-left: 0.5rem;
  font-size: small
}
</style>
