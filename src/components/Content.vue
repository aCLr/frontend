<template>
  <v-container>
    <v-row>
      <v-col v-for="card in cards" :key="card.id" cols="4">
        <v-card height="240">
          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-text>
            <p v-line-clamp:20="5">
              {{ card.content }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Content",
  data: () => ({
    cards: []
  }),
  created() {
    this.$vueEventBus.$on("showSourceContent", sourceId =>
      this.getSourceContent(sourceId)
    );
    this.$vueEventBus.$on("showAllSourcesContent", this.getAllRecords);
  },
  methods: {
    getAllRecords: function() {
      this.$http
        .get("http://127.0.0.1:8088/api/v1/records/", {
          params: { limit: 10, offset: 0 }
        })
        .then(response => (this.cards = response.data));
    },
    getSourceContent: function(sourceId) {
      this.$http
        .get("http://127.0.0.1:8088/api/v1/records/", {
          params: { limit: 10, offset: 0, source_id: sourceId }
        })
        .then(response => (this.cards = response.data));
    }
  },
  mounted() {
    this.getAllRecords();
  }
};
</script>

<style scoped></style>
