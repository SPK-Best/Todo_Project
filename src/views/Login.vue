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
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('Must be valid e-mail');
      !this.$v.email.required && errors.push('E-mail is required');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      // eslint-disable-next-line no-unused-expressions
      !this.$v.password.required && errors.push('Password is required');
      return errors;
    },
  },
  methods: {
    userLogin(){
      this.$v.$touch();
      firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((data) => {
            this.$store.dispatch('userLogin', data.user);
            this.$store.dispatch('userRegister', { data });
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
        this.$store.dispatch('userLogin', data.user);
        this.$store.dispatch('userRegister', { data });
        this.$router.push('/todo')
      }).catch((err) => {
        alert(err.message);
      });
    },
  },
};

</script>