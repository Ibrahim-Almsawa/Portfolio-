import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { i18n } from './i18n/index'

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')
