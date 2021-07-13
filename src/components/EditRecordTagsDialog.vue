<template>
  <v-dialog @input="$emit('input', $event)" :value="value" width="400">
    <v-card>
      <v-card-text>
        <v-autocomplete
            v-model="tagsListModel"
            :items="items"
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
        <v-btn text @click="save"></v-btn>
        <v-btn text @click="cancel"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditRecordTagsDialog",
  props: {value: Boolean, sourceId: String},
  methods: {
    save() {

    }
  },
  data() {
    return {
      tags: [],
      tagsListModel: null,
      isLoading: false,
      search: null,
    }
  },
  computed: {
    items () {
      return this.tags
    },
  },
  watch: {
    search(val) {
      console.debug(val);
      if (this.tags.length > 0) return

      if (this.isLoading) return

      this.isLoading = true

      this.tags = ["foo", "bar", "it", "baz"]
      this.isLoading = false;
    }
  }
}
</script>

<style scoped>

</style>