import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/DashBoard.vue"),
  },
  {
    path: "/dashboard/:page",
    name: "DashboardPage",
    component: () => import("../views/DashBoard.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/add/payment/:category",
    name: "addpaymentForm",

    component: () => import("../components/AddPaymentForm.vue"),
  },
  {
    path: "/404",
    name: "Page404",
    component: () => import("../views/Page404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const userAuthExists = true;

const getTitleByRouteName = (routeName) => {
  return {
    dashboard: "Take a look on your payments and add more!",
    About: "Anything about our awesome application!",
    Page404: "Oops! Seems like we lost this page :(",
  }[routeName];
};

router.beforeEach((to, from, next) => {
  if (to.name !== "Page404" && !userAuthExists) {
    next({
      name: "Page404",
    });
  } else {
    next();
  }
});

router.afterEach((to) => {
  document.title = getTitleByRouteName(to.name);
});

export default router;
