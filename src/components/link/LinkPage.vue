<script>
import api from "@/axios/index.js";

export default {
  name: "LinkPage",
  data() {
    return {
      selectedLinkBundle: {},
      linkBundles: [
        {}
      ],
      createLinkRequest: {
        linkBundleId: Number,
        url: "",
        description: "",
      },
      dataReady: false,
    }
  },
  async mounted() {
    await this.findLinkBundlesApiCall();
    await this.getUrl();
    this.dataReady = true;
  },
  methods: {
    async getUrl() {
      let tabs = await chrome.tabs.query({active: true, currentWindow: true});
      console.log(tabs);
      this.createLinkRequest.url = tabs[0].url;
      this.createLinkRequest.description = tabs[0].title;
    },
    async findLinkBundlesApiCall() {
      const response = await api.get("/api/link-bundles");
      const data = response.data;
      this.linkBundles = data.linkBundles;
      const defaultLinkBundle = this.linkBundles.filter(linkBundle => linkBundle.isDefault)
      if(defaultLinkBundle.length !== 0) {
        this.selectedLinkBundle = defaultLinkBundle[0];
      }
    },
    createLinkApiCall() {
      api.post('/api/links', {
        linkBundleId: this.selectedLinkBundle.linkBundleId,
        url: this.createLinkRequest.url,
        description: this.createLinkRequest.description
      })
      .then((response) => {
        alert('새로운 링크가 추가되었습니다!');
        this.dialog = false;
        this.$emit('addLinkEvent');
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
        v-model="selectedLinkBundle"
        label="링크 묶음 선택"
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
        v-model="createLinkRequest.description"
    ></v-text-field>
    <div class="text-end">
      <v-btn
          variant="outlined"
          @click="createLinkApiCall">추가
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>

</style>
