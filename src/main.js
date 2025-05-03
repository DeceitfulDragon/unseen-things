import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

import { Buffer } from 'buffer';
window.Buffer = Buffer;

import RandomText   from './components/RandomText.vue'
import ImageCaption from './components/ImageCaption.vue'
import Tabs from './components/Tabs.vue'

const app = createApp(App);
app.use(router);
app.component('RandomText', RandomText);
app.component('ImageCaption', ImageCaption);
app.component('Tabs', Tabs);
app.mount('#app');