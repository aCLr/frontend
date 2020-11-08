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
              <v-card @click="showSourceContent(result)">
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
export default {
  name: "SearchSource",
  data: () => ({
    query: "",
    dialog: false,
    search_results: [],
    searching: false
  }),
  computed: {
    colsAmount: function() {
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
    search: async function() {
      this.dialog = true;
      this.searching = true;
      this.search_results = (await this.makeSearchQuery()).data;
      this.searching = false;
    },
    showSourceContent: function(source) {
      this.$vueEventBus.$emit("showSourceContent", source.id);
      this.dialog = false;
    },
    makeSearchQuery: async function() {
      return await this.$http.post("http://127.0.0.1:8088/api/v1/sources/", {
        origin: this.query
      });
    }
  }
};
</script>

<style scoped></style>
