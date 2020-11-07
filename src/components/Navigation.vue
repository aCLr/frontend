<template>
  <v-navigation-drawer app>
    <v-list>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title>
            <SearchSource />
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="showAllSourcesContent">
        <v-list-item-icon>
          <v-icon>mdi-inbox-arrow-down</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>All</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        v-for="source in sources"
        :key="source.id"
        link
        @click="showSourceContent(source)"
      >
        <v-list-item-icon>
          <v-icon>mdi-inbox-arrow-down</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ source.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import SearchSource from "@/components/SearchSource";
export default {
  name: "Navigation",
  components: { SearchSource },
  data: () => ({
    drawer: null,
    sources: []
  }),
  methods: {
    showSourceContent: function(source) {
      this.$vueEventBus.$emit("showSourceContent", source.id);
    },
    showAllSourcesContent: function() {
      this.$vueEventBus.$emit("showAllSourcesContent");
    }
  },
  mounted() {
    this.$http
      .get("http://127.0.0.1:8088/api/v1/sources/")
      .then(response => (this.sources = response.data));
  }
};
</script>

<style scoped></style>
