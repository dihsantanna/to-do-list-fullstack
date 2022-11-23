import { createApp } from 'vue';
import ToastPlugin from 'vue-toast-notification';
import App from './App.vue';
import { key, store } from './store';

import 'vue-toast-notification/dist/theme-sugar.css';
import './assets/main.css';
import { router } from './routes';

const app = createApp(App);

app.use(ToastPlugin);

app.use(store, key);

app.use(router);

app.mount('#app');
