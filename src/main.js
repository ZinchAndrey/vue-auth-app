import '@/styles/global.scss';

import { createApp } from 'vue'

import BaseButton from '@/components/UI/BaseButton.vue';
import BaseInput from '@/components/UI/BaseInput.vue';

import App from './App.vue'
// import router from './router'

const app = createApp(App);
app.component('base-button', BaseButton);
app.component('base-input', BaseInput);


// app.use(router)

app.mount('#app')
