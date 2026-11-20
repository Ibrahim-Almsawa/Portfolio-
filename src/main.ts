import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import './motion.css'
import { i18n } from './i18n/index'
import { depthReveal } from './depthReveal'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.directive('depth', depthReveal)

app.mount('#app')
