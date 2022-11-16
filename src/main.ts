import { createApp } from 'vue';
import App from './App.vue';
import { key, store } from './store';

import './assets/main.css';

const app = createApp(App);

app.use(store, key);

app.mount('#app');
