<template>
  <v-navigation-drawer
      app
      :temporary="this.getDrawerForSize()"
      v-model="drawer"
  >
    <v-list dense>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title>
            <SearchSource/>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item :to="{ name: 'content', params: { query: 'all' } }">
        <v-list-item-icon>
          <v-icon>mdi-inbox-arrow-down</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>All</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item :to="{ name: 'content', params: { query: 'starred' } }">
        <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Starred</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-treeview
        dense
        item-key="treeNodeId"
        hoverable
        open-on-click
        :items="navigationTree"
    >
      <template slot="label" slot-scope="{ item }">
        <SourceItem :source="item" v-if="item.type === 'source'"></SourceItem>
        <FolderItem :folder="item" v-if="item.type === 'folder'"></FolderItem>
      </template>
    </v-treeview>
  </v-navigation-drawer>
</template>

<script>
import SearchSource from "./SearchSource";
import SourceItem from "./SourceItem";
import FolderItem from "./FolderItem";

export default {
  name: "Navigation",
  components: { SearchSource, SourceItem, FolderItem },
  computed: {
    navigationTree: function () {
      if (!this.$store.state.folders.loaded) return
      let folders = {}
      this.$store.state.folders.folders.forEach((f) => folders[f.id] = Object.assign({

      }, f, {children: [],
        treeNodeId: `folder-${f.id}`,
        type: "folder",}))
      let tree = []

      this.$store.state.sources.sources.forEach(s => {
        let source = Object.assign({}, s, {type: "source", treeNodeId: `source-${s.id}`,})
        if (!source.folderId) {
          tree.push(source)
        } else {
          let folder = folders[source.folderId];
          folder.children.push(source)
        }
      })

      Object.values(folders).forEach(f => {
        if (!f.parentFolderId) {
          tree.push(f)
        } else {
          let folder = folders[f.parentFolderId];
          folder.children.push(f)
        }
      })
      return tree
    }
  },
  data: () => ({
    drawer: false,
  }),
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    getDrawerForSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "lg":
          return false;
        case "xl":
          return false;
        default:
          return true;
      }
    }
  },
  created() {
    this.$vueEventBus.$on("toggleNavigation", this.toggleDrawer);
  },
  mounted() {
    this.drawer = !this.getDrawerForSize();
  }
};
</script>

<style scoped></style>
