<template>
  <v-form
      ref="form"
      lazy-validation>

    <v-text-field
        v-model="user.email"
        type="email"
        label="Email"
        required
    ></v-text-field>

    <v-text-field
        v-model="user.password"
        type="password"
        label="Password"
        required
    ></v-text-field>

    <v-btn
        color="#558B2F"
        type="submit"
        class="mr-4"
        @click="userLogin"
    >
      Login
    </v-btn>
  </v-form>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    userLogin(){
      firebase
          .auth()
          .signInWithEmailAndPassword(this.user.email, this.user.password)
          .then(() => {
            this.$router.push('/todo')
          })
          .catch((error) => {
            alert(error.message);
          });
    }
  }
}
</script>

<style scoped>

</style>