<template>
  <v-container>
    <v-row>
      <v-col v-for="card in cards" :key="card.id" cols="4">
        <v-dialog>
          <template v-slot:activator="{ on, attrs }">
            <v-card height="230" v-on="on" v-bind="attrs">
              <v-card-title>{{ card.title }}</v-card-title>
              <v-card-text>
                <p class="record__preview" v-line-clamp="4">
                  {{ getPreview(card.content) }}
                </p>
              </v-card-text>
            </v-card>
          </template>
          <v-card>
            <v-card-title>{{ card.title }}</v-card-title>
            <v-card-text>
              <p v-html="getSanitizedContent(card.content)"></p>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DOMPurify from "dompurify";
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
    getPreview: function(content) {
      var span = document.createElement("span");
      span.innerHTML = content;
      return span.textContent || span.innerText;
    },
    getSanitizedContent: function(content) {
      return DOMPurify.sanitize(content);
    },
    getAllRecords: function() {
      this.$http
        .get("http://127.0.0.1:8088/api/v1/records/", {
          params: { limit: 12, offset: 0 }
        })
        .then(response => (this.cards = response.data));
    },
    getSourceContent: function(sourceId) {
      this.$http
        .get("http://127.0.0.1:8088/api/v1/records/", {
          params: { limit: 12, offset: 0, source_id: sourceId }
        })
        .then(response => (this.cards = response.data));
    }
  },
  mounted() {
    this.getAllRecords();
  }
};
</script>

<style scoped>
.record__preview * {
  margin-bottom: 0 !important;
}
</style>
