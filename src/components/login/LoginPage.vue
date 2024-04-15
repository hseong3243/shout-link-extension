<script>
import {useAuthStore} from "@/store/AuthStore.js";

export default {
  name: "LoginPage",
  setup() {
    const authStore = useAuthStore();
    return {authStore}
  },
  emits: ['loginEvent'],
  data() {
    return {
      dialog: false,
      loginRequest: {
        email: "",
        password: "",
      }
    }
  },
  methods: {
    async login() {
      await this.authStore.loginApiCall(this.loginRequest.email, this.loginRequest.password);
      this.$emit('loginEvent');
    }
  }
}
</script>

<template>
  <v-container>
    <v-form>
      <v-text-field
          v-model="loginRequest.email"
          variant="outlined"
          density="compact"
          label="이메일">
      </v-text-field>
      <v-text-field
          v-model="loginRequest.password"
          variant="outlined"
          density="compact"
          label="비밀번호"
          type="password">
      </v-text-field>
      <v-btn
          @click="login"
          block>
        로그인
      </v-btn>
    </v-form>
  </v-container>
</template>

<style scoped>

</style>
