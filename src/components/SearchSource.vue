<template>
  <v-text-field
    placeholder="Search"
    solo
    @input="search"
    v-model="query"
  ></v-text-field>
</template>

<script>
export default {
  name: "SearchSource",
  data: () => ({
    query: "",
    _timerId: null
  }),
  methods: {
    search: function() {
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        this.makeSearchQuery();
      }, 800);
    },
    makeSearchQuery: function() {
      console.log(this.query);
      this.$http
        .post("http://127.0.0.1:8088/api/v1/sources/", {
          origin: this.query
        })
        .then(resp => console.log(resp.data));
    }
  }
};
</script>

<style scoped></style>
