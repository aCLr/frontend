<template>
  <v-dialog @input="$emit('input', $event)" :value="value" width="400">
    <v-card>
      <v-card-title>Choose folder to move</v-card-title>
      <v-card-text>
        <v-treeview
            dense
            open-on-click
            :items="folders"
            @update:active="onUpdate"
        >
          <template slot="label" slot-scope="{ item }">
            <a @click="onUpdate(item)">{{ item.name }}</a>
          </template>
        </v-treeview>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: "ChangeSourceFolderDialog",
  props: {value: Boolean, sourceId: Number},
  computed: {
    folders() {
      let tree = []
      let folders = {}
      this.$store.state.folders.folders.forEach((f) => folders[f.id] = Object.assign({
        children: [],
      }, f))

      Object.values(folders).forEach(f => {
        if (!f.parentFolderId) {
          tree.push(f)
        } else {
          let folder = folders[f.parentFolderId];
          folder.children.push(f)
        }
      })
      return tree
    },
    source() {
      return this.$store.getters["sources/getById"](this.sourceId)
    }
  },
  methods: {
    onUpdate(sel) {
      this.$store.dispatch("folders/loadFolders")
    }
  },
  data() {
    return {
      tags: [],
      tagsListModel: null,
      isLoading: false,
      search: null,
    }
  }
}
</script>

<style scoped>

</style>