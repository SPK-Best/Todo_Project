<template>
  <v-form>

    <v-img
        :src="require('../assets/login.jpg')"
        class="my-3"
        contain
        height="180"
    />

    <v-container align-center justify-center>
      <v-layout align-center justify-center>
    <v-col
        cols="18"
        md="6"
    >

    <v-text-field
        v-model="email"
        type="email"
        label="Email"
        required
    ></v-text-field>

    <v-text-field
        v-model="password"
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
import { required, email } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
  name: "Login",
  data() {
    return {
        email: '',
        password: '',
    };
  },
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required },
  },
  methods: {
    userLogin(){
      this.$v.$touch();
      firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((data) => {
            this.$store.dispatch('auth/userLogin', data.user);
            this.$store.dispatch('auth/userRegister', { data });
            this.$router.push('/todo')
          })
          .catch((error) => {
            console.log(error.message);
            alert("Invalid username or password");
          });
    },
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((data) => {
        this.$store.dispatch('auth/userLogin', data.user);
        this.$store.dispatch('auth/userRegister', { data });
        this.$router.push('/todo')
      }).catch((err) => {
        alert(err.message);
      });
    },
  },
};

</script>