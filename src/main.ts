import { createApp } from 'vue'
import pinia from '@/stores'
import App from './App.vue'
import router from '@/router'
import 'vant/es/notify/style'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
// import { Tabbar, TabbarItem } from 'vant'

const app = createApp(App)

// vant
// app.use(Tabbar)
// app.use(TabbarItem)

app.use(pinia)
app.use(router)
app.mount('#app')
