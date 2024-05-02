<script>
import LoginPage from "@/components/login/LoginPage.vue";
import LinkPage from "@/components/link/LinkPage.vue";
import HubPage from "@/components/hub/HubPage.vue";
import Title from "@/components/Title.vue";

export default {
  name: "Tabs",
  components: {Title, HubPage, LinkPage, LoginPage},
  data() {
    return {
      tab: "1",
    }
  },
  mounted() {
  },
  methods: {
    moveToSite() {
      this.tab = "1";
      window.open('https://shoutlink.me')
    },
  }
}
</script>

<template>
  <v-card>
    <v-tabs v-model="tab" grow>
      <v-tab value="1">링크 추가</v-tab>
      <v-tab value="2">허브 링크 추가</v-tab>
    </v-tabs>
    <v-card-text>
      <Title/>
      <v-window v-model="tab">
        <v-window-item value="1">
          <LinkPage/>
        </v-window-item>
        <v-window-item value="2">
          <HubPage/>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
