import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("pages/LoginForm.vue"),
  },
  {
    path: "/student/",
    component: () => import("layouts/MainLayoutStudent.vue"),
    children: [
      {
        path: "", redirect: "/student/home",
      },
      {
        path: "home",
        component: () => import("pages/student/StudentHome.vue"),
      },
      {
        path: "account",
        component: () => import("pages/student/StudentAccount.vue"),
      },
      {
        path: "search",
        component: () => import("pages/student/StudentSearch.vue"),
      },
      {
        path: "settings",
        component: () => import("pages/student/setting/Settings.vue"),
      },
    ],
  },
  {
    path: "/student/settings/edit/",
    component: () => import("layouts/SettingsLayout.vue"),
    children: [
      {
        path: "", redirect: "/student/settings",
      },
      {
        path: "profile",
        component: () => import("pages/student/setting/ManageProfile.vue"),
      },
      {
        path: "account",
        component: () => import("pages/student/setting/ManageAccount.vue"),
      },
    ],
  },
  {
    path: "/landlord/",
    component: () => import("layouts/MainLayoutLandlord.vue"),
    children: [
      {
        path: "", redirect: "/landlord/home",
      },
      {
        path: "home",
        component: () => import("pages/landlord/LandlordHome.vue"),
      },
      {
        path: "account",
        component: () => import("pages/landlord/LandlordAccount.vue"),
      },
      {
        path: "posts",
        component: () => import("pages/landlord/LandlordPosts.vue"),
      },
      {
        path: "settings",
        component: () => import("pages/landlord/setting/Settings.vue"),
      },
    ],
  },
  {
    path: "/landlord/settings/edit/",
    component: () => import("layouts/SettingsLayout.vue"),
    children: [
      {
        path: "", redirect: "/student/settings",
      },
      {
        path: "profile",
        component: () => import("pages/landlord/setting/ManageProfile.vue"),
      },
      {
        path: "account",
        component: () => import("pages/landlord/setting/ManageAccount.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {
        path: "housing+setup",
        component: () => import("pages/landlord/LandlordSetup.vue"),
      },
      {
        path: "profile/:id?",
        component: () => import("pages/Profile.vue"),
      },
      {
        path: "chat",
        component: () => import("pages/general-inbox/Chatroom.vue"),
      },
    ],
  },
  {
    path: "/post/:id?",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/general-post/Post.vue"),
      },
      {
        path: "form",
        component: () => import("pages/general-post/PostForm.vue"),
      },
      {
        path: "edit/:id?",
        component: () => import("pages/general-post/PostEdit.vue"),
      },
    ],
  },
  {
    path: "/settings/",
    component: () => import("layouts/SettingsLayout.vue"),
    children: [
      {
        path: "about",
        component: () => import("pages/general-setting/About.vue"),
      },
      {
        path: "edit+username",
        component: () => import("pages/general-setting/edit/EditUsername.vue"),
      },
      {
        path: "edit+password",
        component: () => import("pages/general-setting/edit/EditPassword.vue"),
      },
      {
        path: "edit+email",
        component: () => import("pages/general-setting/edit/EditEmail.vue"),
      },
      {
        path: "edit+mobile",
        component: () => import("pages/general-setting/edit/EditMobile.vue"),
      },
      {
        path: "edit+address",
        component: () => import("pages/general-setting/edit/EditAddress.vue"),
      },
      {
        path: "edit+housing",
        component: () => import("pages/general-setting/edit/EditHousing.vue"),
      },
      {
        path: "edit+campus+housing",
        component: () => import("pages/general-setting/edit/EditCampusHousing.vue"),
      },
    ],
  },
  {
    path: "/tutorial/",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {
        path: "chatlink",
        component: () => import("pages/general-setting/tutorial/ChatLink.vue"),
      },
      {
        path: "maplink",
        component: () => import("pages/general-setting/tutorial/MapLink.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
