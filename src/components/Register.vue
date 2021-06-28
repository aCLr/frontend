<template>
  <div>
    <h1>Sign up</h1>
    <v-form v-model="valid">
      <v-text-field v-model="username" label="Login" required></v-text-field>
      <v-text-field v-model="password" label="Password" required></v-text-field>
      <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="register"
      >
        Register
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    username: "",
    password: "",
    valid: true,
  }),
  methods: {
    register: function () {
      const {username, password} = this;
      this.$store.dispatch("auth/register", {username, password}).then(() => {
        this.$router.push("/");
      })
    }
  }

}
</script>

<style scoped>

</style>