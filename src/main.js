import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

// Pinia
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

// Day.js
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Seoul')

createApp(App)
.use(vuetify)
.use(pinia)
.use(dayjs)
.mount('#app')
