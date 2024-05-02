<script>
import Tabs from "@/components/Tabs.vue";
import {useAuthStore} from "@/store/AuthStore.js";
import LoginPage from "@/components/login/LoginPage.vue";
import Title from "@/components/Title.vue";

export default {
  name: "MainPage",
  components: {Title, LoginPage, Tabs},
  setup() {
    const authStore = useAuthStore();
    return {authStore}
  }
}
</script>

<template>
  <div>
    <Tabs v-if="authStore.isLogin"/>
    <LoginPage v-if="!authStore.isLogin"/>
  </div>
</template>

<style scoped>

</style>
