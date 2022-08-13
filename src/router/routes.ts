import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/LoginForm.vue'),
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
