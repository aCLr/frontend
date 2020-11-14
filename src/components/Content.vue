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
              <v-card-actions>
                <span>{{ record.date }}</span>
                <v-spacer></v-spacer>
                <v-btn icon @click.stop="toggleStarred(record)">
                  <v-icon v-if="record.starred">mdi-star</v-icon>
                  <v-icon v-else>mdi-star-outline</v-icon>
                </v-btn>
                <v-btn icon @click.stop="bulkMarkAsRead(record)">
                  <v-icon>mdi-transfer-down</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
          <v-card>
            <v-card-title class="text-wrap">{{ record.title }}</v-card-title>
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
    <div
      v-intersect="{
        handler: onBottomVisible
      }"
    ></div>
  </v-container>
</template>

<script>
import DOMPurify from "dompurify";
import Vue from "vue";

const limit = 12;
export default {
  name: "Content",
  data: () => ({
    records: [],
    query: "all",
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
    this.$vueEventBus.$on("showSourceContent", sourceId => {
      this.onChangeQuery("all");
      this.getSourceContent(sourceId);
    });
    this.$vueEventBus.$on("showAllSourcesContent", () => {
      this.onChangeQuery("all");
      this.getAllRecords();
    });
    this.$vueEventBus.$on("showStarredContent", () => {
      this.onChangeQuery("starred");
      this.getStarredRecords();
    });
  },
  methods: {
    onChangeQuery: function(query) {
      this.records = [];
      this.query = query;
      this.enableInfiniteScroll = true;
      this.offset = 0;
    },
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
    getStarredRecords: function() {
      this.$http
        .get("http://127.0.0.1:8088/api/v1/records/", {
          params: { limit: limit, offset: this.offset, query: this.query }
        })
        .then(response => {
          if (response.data.length === 0) {
            this.enableInfiniteScroll = false;
            return;
          }
          this.records = this.records.concat(...response.data);
          setTimeout(() => (this.enableInfiniteScroll = true), 1000);
        });
    },
    getAllRecords: function() {
      this.$http
        .get("http://127.0.0.1:8088/api/v1/records/", {
          params: { limit: limit, offset: this.offset, query: this.query }
        })
        .then(response => {
          if (response.data.length === 0) {
            this.enableInfiniteScroll = false;
            return;
          }
          this.records = this.records.concat(...response.data);
          setTimeout(() => (this.enableInfiniteScroll = true), 1000);
        });
    },
    getSourceContent: function(sourceId) {
      this.$http
        .get("http://127.0.0.1:8088/api/v1/records/", {
          params: {
            limit: limit,
            offset: this.offset,
            source_id: sourceId,
            query: this.query
          }
        })
        .then(response => {
          this.records = response.data;
          setTimeout(() => (this.enableInfiniteScroll = true), 1000);
        });
    },
    onBottomVisible: function() {
      if (!this.enableInfiniteScroll) {
        return;
      }
      this.offset += limit;
      this.getAllRecords();
    },
    bulkMarkAsRead: function(record) {
      this.$http
        .post("http://127.0.0.1:8088/api/v1/records/mark_read", {
          from_date: record.date
        })
        .then(response => {
          console.log(response);
        });
    },
    toggleStarred: function(record) {
      this.$http
        .post(`http://127.0.0.1:8088/api/v1/records/${record.id}`, {
          starred: !record.starred
        })
        .then(response => {
          Vue.set(
            this.records,
            this.records.findIndex(r => r.id === response.data.id),
            response.data
          );
        });
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
  word-break: normal;
}
.v-card__text >>> img {
  max-width: 100%;
}
</style>
