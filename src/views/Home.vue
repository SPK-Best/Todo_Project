<template>
  <div class="home">
    <h1>Welcome to Todo Application</h1>
    <h3>Please Register or Login</h3>
    <img alt="Vue logo"
         height="180"
         src="../assets/logo.png">
    <HelloWorld/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
