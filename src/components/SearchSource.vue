<template>
  <div>
    <v-text-field
      hide-details="auto"
      placeholder="Search"
      outlined
      dense
      @keyup.enter="search"
      v-model="query"
    ></v-text-field>
    <v-dialog v-model="dialog" transition="slide-x-transition">
      <v-card>
        <v-card-title>Search results</v-card-title>
        <v-container>
          <v-row v-if="searching">
            <v-col
              v-for="n in (12 * 3) / colsAmount"
              :key="n"
              :cols="colsAmount"
            >
              <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row v-if="!searching">
            <v-col
              v-for="result in search_results"
              :key="result.id"
              :cols="colsAmount"
            >
              <v-card @click="showSourceContentPreview(result)">
                <v-card-title>{{ result.name }}</v-card-title>
                <v-card-subtitle
                  >({{ result.kind }}) {{ result.origin }}</v-card-subtitle
                >
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SearchSource",
  data: () => ({
    query: "",
    dialog: false
  }),
  computed: {
    ...mapState({
      searching: state => state.sources.searching,
      search_results: state => state.sources.search_results
    }),
    colsAmount() {
      switch (this.$vuetify.breakpoint.name) {
        case "lg":
          return 3;
        case "xl":
          return 3;
        case "md":
          return 6;
        case "sm":
          return 6;
        default:
          return 12;
      }
    }
  },
  methods: {
    async search() {
      if (this.query.trim().length === 0) {
        return;
      }
      this.dialog = true;
      await this.$store.dispatch("sources/searchSources", this.query);
      this.query = "";
    },
    showSourceContentPreview(source) {
      this.$store.dispatch("records/loadRecords", {
        sourceId: source.id,
        replace: true,
        preview: true
      });
      let route = "sourcePreview";
      if (
        this.$store.state.sources.sources.findIndex(f => f.id === source.id) >=
        0
      ) {
        route = "sourceContent";
      }
      this.$router.push({ name: route, params: { sourceId: source.id } });
      this.dialog = false;
    }
  }
};
</script>

<style scoped></style>
