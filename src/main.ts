import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/lib/theme-chalk/display.css';
import './assets/css/font-awesome.min.css';
import { axiosPlugin } from './plugins';
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import './assets/css/main.css'
VMdEditor.use(vuepressTheme);
VMdPreview.use(githubTheme);
const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(axiosPlugin)
app.use(VMdEditor)
app.use(VMdPreview)
app.mount('#app')
