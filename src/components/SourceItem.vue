<template>
  <div
    @click="showSourceContent"
  >
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-list-item
             @contextmenu.prevent="on.click">
          <v-list-item-icon v-if="source.image" >
            <img width="35px" :src="source.image" />
          </v-list-item-icon>
          <v-list-item-title v-text="source.name" class="subtitle-2 text-wrap"></v-list-item-title>
        </v-list-item>
      </template>
      <v-list dense>
        <v-list-item @click="showChangeFolderDialog = true">
          <v-list-item-title>
            Move to...
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="deleteSource()">
          <v-list-item-title>
            Delete
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <ChangeSourceFolderDialog v-if="showChangeFolderDialog" :sourceId="source.id" v-model="showChangeFolderDialog"></ChangeSourceFolderDialog>
  </div>
</template>

<script>
import ChangeSourceFolderDialog from "./ChangeSourceFolderDialog";

export default {
  name: "SourceItem",
  props: ["source"],
  components: {
    ChangeSourceFolderDialog
  },
  data: () => ({
    showChangeFolderDialog: false
  }),
  methods: {
    async deleteSource() {
      await this.$store.dispatch(
          "sources/deleteSource",
          this.source.id
      );
    },
    showSourceContent: function() {
      this.$store.dispatch("records/loadRecords", {
        sourceId: this.source.id,
        replace: true
      });
    },
  }
};
</script>

<style scoped></style>
