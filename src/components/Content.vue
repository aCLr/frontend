<template>
  <v-container>
    <v-row>
      <v-col v-for="record in records" :key="record.id" :cols="colsAmount">
        <v-dialog max-width="770">
          <template v-slot:activator="{ on, attrs }">
            <v-card min-height="280" v-on="on" v-bind="attrs">
              <template v-if="record.image">
                <v-img height="150px" :src="record.image"></v-img>
                <v-card-title
                  class="text-wrap"
                  v-text="record.title"
                ></v-card-title>
              </template>
              <template v-else>
                <v-card-title>{{ record.title }}</v-card-title>
                <v-card-text>
                  <p class="record__preview" v-line-clamp="4">
                    {{ getPreview(record.content) }}
                  </p>
                </v-card-text>
              </template>
            </v-card>
          </template>
          <v-card>
            <v-card-title class="text-truncate">{{
              record.title
            }}</v-card-title>
            <v-card-text>
              <p v-html="getSanitizedContent(record.content)"></p>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-btn
      v-show="showFab"
      v-scroll="onScroll"
      fab
      fixed
      bottom
      right
      @click="goToTop"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <div
      v-intersect="{
        handler: onBottomVisible
      }"
      v-if="enableInfiniteScroll"
    ></div>
  </v-container>
</template>

<script>
import DOMPurify from "dompurify";

const limit = 12;
export default {
  name: "Content",
  data: () => ({
    records: [],
    enableInfiniteScroll: false,
    offset: 0,
    showFab: false
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
    onScroll: function(e) {
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.showFab = top > 20;
    },
    goToTop: function() {
      this.$vuetify.goTo(0);
    },
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
          params: { limit: limit, offset: this.offset }
        })
        .then(response => {
          this.records = this.records.concat(...response.data);
          setTimeout(() => (this.enableInfiniteScroll = true), 1000);
        });
    },
    getSourceContent: function(sourceId) {
      this.$http
        .get("http://127.0.0.1:8088/api/v1/records/", {
          params: { limit: limit, offset: 0, source_id: sourceId }
        })
        .then(response => {
          this.record = response.data;
          setTimeout(() => (this.enableInfiniteScroll = true), 1000);
        });
    },
    onBottomVisible: function(entries, observer) {
      this.offset += limit;
      this.getAllRecords();
      console.log("bottom appears");
      console.debug(entries, observer);
    }
  },
  mounted() {
    this.getAllRecords();
  }
};
</script>

<style scoped>
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
