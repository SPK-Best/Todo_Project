<template>
  <v-btn
      color="#E53935"
      type="submit"
      class="mr-4"
      @click="userLogout"
  >
    Logout
  </v-btn>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Todo.vue",
  data() {
    return {
      user: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    userLogout() {
      firebase.auth().signOut().then(() => {
        firebase.auth().onAuthStateChanged(() => {
          this.$router.push('/login')
        })
      })
    }
  }
};
</script>