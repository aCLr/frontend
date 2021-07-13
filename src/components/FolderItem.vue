<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-list-item @contextmenu.prevent="on.click">
        <v-list-item-title v-text="folder.name" class="subtitle-2 text-wrap"></v-list-item-title>
      </v-list-item>
    </template>
    <v-list dense>
      <v-list-item @click="move">
        <v-list-item-title>
          Move to...
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="deleteFolder()">
        <v-list-item-title>
          Delete
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "FolderItem",
  props: ["folder"],
  methods: {
    move() {

    },
    deleteFolder() {

    }
  }
}
</script>

<style scoped>

</style>