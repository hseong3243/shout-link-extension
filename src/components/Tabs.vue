<script>
import LoginPage from "@/components/login/LoginPage.vue";
import {useAuthStore} from "@/store/AuthStore.js";
import LinkPage from "@/components/link/LinkPage.vue";

export default {
  name: "Tabs",
  components: {LinkPage, LoginPage},
  setup() {
    const authStore = useAuthStore();
    return {authStore}
  },
  data() {
    return {
      tab: 1,
    }
  },
  methods: {
    changeTabNumber() {
      this.tab = 1;
    }
  }
}
</script>

<template>
  <v-card>
    <v-tabs v-model="tab" grow>
      <v-tab value="1">링크 추가</v-tab>
      <v-tab value="2">허브 링크 추가</v-tab>
      <v-tab value="3" v-if="!authStore.isLogin">로그인</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="1">
          <LinkPage/>
        </v-window-item>
        <v-window-item value="2">
        </v-window-item>
        <v-window-item value="3">
          <LoginPage @loginEvent="changeTabNumber"/>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
