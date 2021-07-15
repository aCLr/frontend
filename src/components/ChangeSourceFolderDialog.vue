<template>
  <v-dialog @input="$emit('input', $event)" :value="value" width="400">
    <v-card>
      <v-card-title>Choose folder to move</v-card-title>
      <v-card-text>
        <v-treeview
            dense
            activatable
            :active="[source.folderId]"
            @update:active="onUpdate"
            :items="folders"
        >
        </v-treeview>
        <v-spacer></v-spacer>
        <v-text-field
            dense
            @keyup.enter="createFolder"
            @click:append-outer="createFolder"
            v-model="newFolderName"
            append-outer-icon="mdi-map-marker"
            placeholder="Create new"
            value=""
        ></v-text-field>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

import {Folder} from "../models";

export default {
  name: "ChangeSourceFolderDialog",
  props: {value: Boolean, sourceId: Number},
  computed: {
    folders() {
      let tree = [new Folder(0, "[Move to top]", 0)]
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
    createFolder() {
      this.$store.dispatch("folders/createFolder",  this.newFolderName)
    },
    onUpdate(folder) {
      this.$store.dispatch("folders/setFolder", {folderId: folder[0], sourceId: this.source.id})
    }
  },
  data() {
    return {
      newFolderName: null,
    }
  }
}
</script>

<style scoped>

</style>