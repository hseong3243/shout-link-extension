import {defineStore} from "pinia";
import api from "@/axios/index.js";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: "",
    memberId: 0
  }),
  getters: {
    getBearerToken(state) {
      return 'Bearer ' + state.accessToken;
    },
    getMemberId(state) {
      return state.memberId;
    },
    isLogin(state) {
      return state.accessToken.length !== 0;
    }
  },
  actions: {
    loginApiCall(email, password) {
      api.post('/api/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        this.accessToken = data.accessToken;
        this.memberId = data.memberId;
      })
      .catch((error) => {
        const response = error.response.data;
        const errorCode = response.errorCode;
        switch (errorCode) {
          case 'SL101':
            alert('이메일/비밀번호가 일치하지 않습니다!');
            break;
        }
      })
    },
    logout() {
      this.accessToken = "";
      this.memberId = 0;
    }
  },
  persist: true
});
