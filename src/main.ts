import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from "./store/store";

const app = createApp(App, {store});
app.use(store as any);
app.mount('#app');
