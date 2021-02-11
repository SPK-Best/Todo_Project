<template>
  <v-app style="
    background: #3A1C71;
    background: -webkit-linear-gradient(to right, #FFAF7B, #D76D77, #3A1C71);
    background: linear-gradient(to right, #FFAF7B, #D76D77, #42b983);
  ">
  <div id="app">
    <div id="nav">
      <v-btn text>
        <router-link to="/">Home</router-link>
      </v-btn>|

      <v-btn text>
        <router-link to="/login">Login</router-link>
      </v-btn>|

      <v-btn text>
        <router-link to="/register">Register</router-link>
      </v-btn>
    </div>
    <router-view/>
  </div>
    </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
