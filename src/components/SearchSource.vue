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
    <v-dialog fullscreen v-model="dialog" transition="slide-x-transition">
      <v-card>
        <v-card-title>Search results</v-card-title>
        <v-container>
          <v-row>
            <v-col v-for="result in search_results" :key="result.id" cols="4">
              <v-card>
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
    search_results: []
  }),
  methods: {
    search: async function() {
      this.dialog = true;
      this.search_results = (await this.makeSearchQuery()).data;
    },
    makeSearchQuery: async function() {
      return await this.$http.post("http://127.0.0.1:8088/api/v1/sources/", {
        origin: this.query
      });
    }
  },
  watch: {
    dialog: function(val, oldVal) {
      if (!val && oldVal) {
        this.search_results = [];
      }
    }
  }
};
</script>

<style scoped></style>
