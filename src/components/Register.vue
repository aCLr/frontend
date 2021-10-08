<template>
  <div>
    <h1>Register</h1>
    <v-form v-model="valid" @submit="register">
      <v-text-field v-model="username" label="Login" required></v-text-field>
      <v-text-field v-model="password" type="password" label="Password" required></v-text-field>
      <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          type="button"
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

      }).catch(err => console.log(err))
    }
  }

}
</script>

<style scoped>

</style>