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
              v-model="user.name"
              label="Name"
              required
          ></v-text-field>

          <v-text-field
              v-model="user.email"
              type="email"
              label="E-mail"
              required
          ></v-text-field>

          <v-text-field
              v-model="user.password"
              type="password"
              label="Password"
              required
          ></v-text-field>

          <v-text-field
              v-model="user.confirmPassword"
              type="password"
              label="Confirm Password"
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

export default {
  name: "Register.vue",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }
    };
  },
  methods: {
    userRegister() {
      if (this.user.password === this.user.confirmPassword) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.user.email, this.user.password)
            .then((data) => {
              data.user
                  .updateProfile({
                    displayName: this.user.name
                  })
                  .then(() => {
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