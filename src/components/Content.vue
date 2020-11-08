<template>
  <v-container>
    <v-row>
      <v-col v-for="record in records" :key="record.id" :cols="colsAmount">
        <v-dialog max-width="770">
          <template v-slot:activator="{ on, attrs }">
            <v-card height="230" v-on="on" v-bind="attrs">
              <v-card-title>{{ record.title }}</v-card-title>
              <v-card-text>
                <p class="record__preview" v-line-clamp="4">
                  {{ getPreview(record.content) }}
                </p>
              </v-card-text>
            </v-card>
          </template>
          <v-card>
            <v-card-title>{{ record.title }}</v-card-title>
            <v-card-text>
              <p v-html="getSanitizedContent(record.content)"></p>
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
    records: []
  }),
  computed: {
    colsAmount: function() {
      switch (this.$vuetify.breakpoint.name) {
        case "lg":
          return 4;
        case "md":
          return 6;
        case "sm":
          return 6;
        case "xl":
          return 4;
        default:
          return 12;
      }
    },
    contendWidth: function() {
      switch (this.$vuetify.breakpoint.name) {
        case "lg":
          return 770;
        case "xl":
          return 770;
        default:
          return this.$vuetify.breakpoint.width - 50;
      }
    }
  },
  created() {
    this.$vueEventBus.$on("showSourceContent", sourceId =>
      this.getSourceContent(sourceId)
    );
    this.$vueEventBus.$on("showAllSourcesContent", this.getAllRecords);
  },
  methods: {
    getPreview: function(content) {
      let span = document.createElement("span");
      span.innerHTML = content;
      return span.textContent || span.innerText;
    },
    getSanitizedContent: function(content) {
      return DOMPurify.sanitize(this.markLinksAsBlank(content), {
        ADD_ATTR: ["target"]
      });
    },
    markLinksAsBlank: function(content) {
      let div = document.createElement("div");
      div.innerHTML = content;
      div.getElementsByTagName("a").forEach(e => {
        e.setAttribute("target", "_blank");
      });
      return div.innerHTML;
    },
    getAllRecords: function() {
      this.$http
        .get("http://127.0.0.1:8088/api/v1/records/", {
          params: { limit: 12, offset: 0 }
        })
        .then(response => (this.records = response.data));
    },
    getSourceContent: function(sourceId) {
      this.$http
        .get("http://127.0.0.1:8088/api/v1/records/", {
          params: { limit: 12, offset: 0, source_id: sourceId }
        })
        .then(response => (this.records = response.data));
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
