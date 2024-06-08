<script>
import api from "@/axios/index.js";
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import dayjs from "dayjs";

export default {
  name: "LinkPage",
  components: {VueDatePicker},
  data() {
    return {
      selectedLinkBundle: {},
      linkBundles: [
        {}
      ],
      selectedExpiredAt: false,
      createLinkRequest: {
        linkBundleId: Number,
        url: "",
        description: "",
        expiredAt: null,
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
      if (defaultLinkBundle.length !== 0) {
        this.selectedLinkBundle = defaultLinkBundle[0];
      }
    },
    createLinkApiCall() {
      let expiredAtStr = '';
      if (this.createLinkRequest.expiredAt !== null) {
        expiredAtStr = dayjs(this.createLinkRequest.expiredAt).format('YYYY-MM-DDTHH:mm:ss');
      }
      api.post('/api/links', {
        linkBundleId: this.selectedLinkBundle.linkBundleId,
        url: this.createLinkRequest.url,
        description: this.createLinkRequest.description,
        expiredAt: expiredAtStr,
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
    <div class="d-flex ga-1">
      <input type="checkbox" v-model="selectedExpiredAt"/>
      <p>만료일 지정</p>
    </div>
    <div class="d-flex justify-center pa-1" v-if="selectedExpiredAt">
      <vue-date-picker
          v-model="createLinkRequest.expiredAt"
          class="w-75"
          locale="ko"
          timezone="Asia/Seoul"
          inline
          auto-apply>
      </vue-date-picker>
    </div>
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
