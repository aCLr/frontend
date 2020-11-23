import VueRouter from "vue-router";

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Content",
      component: () => import("@/components/Content.vue")
    },
    {
      path: "/preview/:id",
      name: "source_preview",
      component: () => import("@/components/SourcePreview.vue"),
      props: true
    }
  ]
});
