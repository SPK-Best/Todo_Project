<template>
  <v-form>

    <v-img
        src="https://d21buns5ku92am.cloudfront.net/67862/images/325088-Unknown-d517f7-large-1564050124.jpeg"
        height="130"
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
              v-model="name"
              label="Name"
              hint="Enter your name"
              required
          ></v-text-field>

          <v-text-field
              v-model="email"
              type="email"
              hint="Enter your email"
              label="E-mail"
              required
          ></v-text-field>

          <v-text-field
              v-model="password"
              type="password"
              label="Password"
              hint="At least 6 characters"
              required
          ></v-text-field>

          <v-text-field
              v-model="confirmPassword"
              type="password"
              label="Confirm Password"
              hint="Confirm your password"
              required
          ></v-text-field>
        </v-col>
      </v-layout>
    </v-container>

    <v-btn
        color="#1976D2"
        type="submit"
        class="mr-4"
        @click="userRegister"
    >
      Register
    </v-btn>
  </v-form>
</template>

<script>
import firebase from "firebase";
import { required, email, minLength, sameAs,} from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
  name: "Register",
  data() {
    return {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };
  },
  mixins: [validationMixin],
  validations: {
    name: {required},
    email: {required, email},
    password: {required, minLength: minLength(6)},
    confirmedPassword: { required, sameAsPassword: sameAs('password') },
  },
  methods: {
    userRegister() {
      this.$v.$touch();
      if (this.password === this.confirmPassword) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then((data) => {
              data.user
                  .updateProfile({
                    displayName: this.name
                  })
                  .then(() => {
                    this.$store.dispatch('userRegister', { data, });
                    alert("Register Successfully !!")
                    this.$router.push('/login')
                  });
            })
            .catch(err => {
              alert(err.message);
            });
      }
      else {
        alert("Password and Confirm Password need to be the same")
      }
    }
  },
}
</script>

<style scoped>

</style>