<script>
export default {
  name: "Tabs",
  data() {
    return {
      tab: 1,
    }
  }
}
</script>

<template>
  <v-card>
    <v-tabs
        v-model="tab">
      <v-tab value="1">링크 추가</v-tab>
      <v-tab value="2">허브 링크 추가</v-tab>
      <v-tab value="3">로그인</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="1">
        </v-window-item>
        <v-window-item value="2">
        </v-window-item>
        <v-window-item value="3">
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
