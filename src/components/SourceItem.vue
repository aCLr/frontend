<template>
  <v-list-item
    :key="source.id"
    link
    @click="showSourceContent(source)"
    @contextmenu="showContextMenu"
  >
    <v-list-item-icon v-if="source.image">
      <img :src="source.image" />
    </v-list-item-icon>

    <v-list-item-content three-line>
      <v-list-item-title class="subtitle-2 text-wrap">{{
        source.name
      }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "SourceItem",
  props: ["source"],
  methods: {
    showSourceContent: function() {
      this.$store.dispatch("records/loadRecords", {
        sourceId: this.source.id,
        replace: true
      });
    },
    showContextMenu: function(e) {
      e.preventDefault();
      this.$store.dispatch("navContextMenu/hideNavContextMenu");
      this.$nextTick(() => {
        this.$store.dispatch("navContextMenu/showNavContextMenu", {
          x: e.clientX,
          y: e.clientY,
          sourceId: this.source.id
        });
      });
    }
  }
};
</script>

<style scoped></style>
