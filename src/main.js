import '@/styles/global.scss'

import { createApp } from 'vue'

import router from '@/router/index.js'

import BasePlate from '@/components/UI/BasePlate.vue'
import BaseButton from '@/components/UI/BaseButton.vue'
import BaseInput from '@/components/UI/BaseInput.vue'
import BaseContainer from '@/components/UI/BaseContainer.vue'
import BaseDialog from '@/components/UI/BaseDialog.vue'
import TheLoader from '@/components/UI/TheLoader.vue'

import App from './App.vue'

const app = createApp(App)
app.component('base-plate', BasePlate)
app.component('base-button', BaseButton)
app.component('base-input', BaseInput)
app.component('base-container', BaseContainer)
app.component('base-dialog', BaseDialog)
app.component('the-loader', TheLoader)

app.use(router)
app.mount('#app')
