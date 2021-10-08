import VueRouter from "vue-router";

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: { name: "content", params: { query: "all" } }
    },
    {
      path: "/:query",
      name: "content",
      component: () => import("@/components/Content.vue"),
      props: true
    },
    {
      path: "/source/:sourceId",
      name: "sourceContent",
      component: () => import("@/components/Content.vue"),
      props: true
    },
    {
      path: "/preview/:sourceId",
      name: "sourcePreview",
      component: () => import("@/components/SourcePreview.vue"),
      props: (route) => {return {sourceId: Number(route.params.sourceId)}}
    }
  ]
});
