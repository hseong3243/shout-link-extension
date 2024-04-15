<script>
import {useAuthStore} from "@/store/AuthStore.js";
import api from "@/axios/index.js";

export default {
  name: "HubPage",
  setup() {
    const authStore = useAuthStore();
    return {authStore}
  },
  data() {
    return {
      selectedHub: {},
      selectedLinkBundle: {},
      hubs: [
        {}
      ],
      linkBundles: [
        {}
      ],
      createHubLinkRequest: {
        linkBundleId: 0,
        url: "",
        description: "",
      }
    }
  },
  async mounted() {
    await this.getUrl();
    await this.findMemberHubsApiCall();
    await this.findHubLinkBundlesApiCall();
  },
  methods: {
    async getUrl() {
      let tabs = await chrome.tabs.query({active: true, currentWindow: true});
      this.createHubLinkRequest.url = tabs[0].url;
      this.createHubLinkRequest.description = tabs[0].title;
    },
    async findMemberHubsApiCall() {
      const response = await api.get("/api/hubs/me", {
        params: {
          page: 0,
          size: 20
        }
      });
      this.hubs = response.data.hubs;
      if (this.hubs.length > 0) {
        this.selectedHub = this.hubs[0];
      }
    },
    async findHubLinkBundlesApiCall() {
      const response = await api.get(`/api/hubs/${this.selectedHub.hubId}/link-bundles`);
      this.linkBundles = response.data.linkBundles;
      const defaultLinkBundle = this.linkBundles.filter(linkBundle => linkBundle.isDefault);
      if (defaultLinkBundle.length > 0) {
        this.selectedLinkBundle = defaultLinkBundle[0];
      }
    },
    createHubLinkApiCall() {
      api.post(`/api/hubs/${this.selectedHub.hubId}/links`, {
        linkBundleId: this.selectedLinkBundle.linkBundleId,
        url: this.createHubLinkRequest.url,
        description: this.createHubLinkRequest.description
      })
      .then((response) => {
        alert('새로운 링크가 추가되었습니다!');
        this.dialog = false;
      })
      .catch((error) => {

      })
    }
  }
}
</script>

<template>
  <v-container>
    <v-select
        v-model="selectedHub"
        label="허브 선택"
        :items="hubs"
        item-title="name"
        item-value="hubId"
        variant="outlined"
        density="compact"
        return-object
    ></v-select>
    <v-select
        v-model="selectedLinkBundle"
        label="허브 링크 묶음 선택"
        :items="linkBundles"
        item-title="description"
        item-value="linkBundleId"
        variant="outlined"
        density="compact"
        return-object
    ></v-select>
    <v-text-field
        label="링크 설명"
        variant="outlined"
        density="compact"
        v-model="createHubLinkRequest.description"
    ></v-text-field>
    <div class="text-end">
      <v-btn
          variant="outlined"
          @click="createHubLinkApiCall">추가
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>

</style>
