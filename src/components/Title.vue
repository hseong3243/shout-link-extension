<script>
export default {
  name: "Title",
  methods: {
    moveToHome() {
      window.open('https://shoutlink.me')
    }
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <h1>Shout Link!</h1>
        <v-chip
            @click="moveToHome"
            class="mt-1"
            variant="outlined"
            link>홈으로
        </v-chip>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
