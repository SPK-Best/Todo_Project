<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="180"
        />
        <v-img
            src="https://static.observableusercontent.com/files/32f590240bbc5a7b09d46b1049ca4d5e5b29ba9a7d115e99f0144abd11e6c6e6c1ce8b0409d5897e40784f6f192542293b7205bf57e9748c514dc9cb56338890"
        height="180"
            contain
            >
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',
  }
</script>
