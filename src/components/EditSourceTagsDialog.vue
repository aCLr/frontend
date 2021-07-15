<template>
  <v-dialog @input="onDialogClosed" :value="value" width="400">
    <v-card>
      <v-card-title>Edit folder tags</v-card-title>
      <v-card-text>
        <v-autocomplete
            @keyup.enter="addNewItem"
            v-model="tagsListModel"
            @input="tagsSelected"
            :items="tags"
            :loading="isLoading"
            :search-input.sync="search"
            chips
            dense
            multiple
            return-object
        ></v-autocomplete>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="save">Save</v-btn>
        <v-btn text @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "EditSourceTagsDialog",
  props: {value: Boolean, sourceId: Number},
  methods: {
    save() {
      this.$store.dispatch("sources/setSourceTags", this.sourceId)
      this.onDialogClosed(false);
    },
    tagsSelected(event) {
      this.$store.dispatch("sources/selectTags", event)
    },
    cancel() {
      this.onDialogClosed(false);
    },
    addNewItem() {
      this.tagsListModel.push(this.search)
      this.$store.dispatch("sources/selectTags", this.tagsListModel)
      this.$store.dispatch("sources/newTag", this.search)
      this.search = ""
    },

    onDialogClosed(event) {
      this.$emit('input', event);
      this.$store.dispatch("sources/clearStoredTags");
    }
  },
  data() {
    return {
      tagsListModel: [],
      isLoading: false,
      search: null,
    }
  },
  mounted() {
    this.tagsListModel = this.source.tags;
    this.$store.dispatch("sources/selectTags", this.tagsListModel)
  },
  computed: {
    source: function() {
      return this.$store.getters["sources/getById"](this.sourceId)
    },
    ...mapGetters({
        tags: "sources/tags",
    }),
  },
  watch: {
    search(val) {
      if (!val || val.trim() === "") {
        return
      }
      this.$store.dispatch("sources/searchTags", val)
    }
  }
}
</script>

<style scoped>

</style>