<template>
  <div>
    <h1>Sign in</h1>
    <v-form v-model="valid" @submit="login">
      <v-text-field v-model="username" label="Login" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          type="button"
          @click="login"
      >
        Login
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    username: "",
    password: "",
    valid: true,
  }),
  methods: {
    login: function () {
      const {username, password} = this;
      this.$store.dispatch("auth/login", {username, password}).then(resp => {
        console.log(resp)
        this.$router.push("/");
      })
    }
  }

}
</script>

<style scoped>

</style>