<template>
  <v-form>

    <v-img
        src="http://irtrd.in/wp-content/uploads/2018/03/1429683477000_loginlogo_-1.jpg"
        height="180"
        contain
    >
    </v-img>

    <v-container align-center justify-center>
      <v-layout align-center justify-center>
    <v-col
        cols="18"
        md="6"
    >

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
    </v-col>
      </v-layout>
    </v-container>

    <v-btn
        color="#558B2F"
        type="submit"
        class="mr-4"
        @click="userLogin"
    >
      Login
    </v-btn>

    <v-btn
        @click="googleLogin"
        color="#757575">
      Sign in with Google
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
            console.log(error)
            alert("Invalid username or password");
          });
    },
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(() => {
        this.$router.replace('/todo');
      }).catch((err) => {
        alert(err.message);
      });
    }
  }
}
</script>

<style scoped>

</style>