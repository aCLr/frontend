<template>
  <v-list-item :key="source.id" link @click="showSourceContent(source)">
    <v-list-item-icon v-if="source.image">
      <img :src="source.image" />
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>{{ source.name }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "SourceItem",
  props: ["source"],
  methods: {
    showSourceContent: function() {
      this.$vueEventBus.$emit("showSourceContent", this.source.id);
    }
  }
};
</script>

<style scoped></style>
