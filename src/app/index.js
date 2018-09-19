import Vue from 'vue'
import router from '../routes'
import Firebase from 'firebase'
import VueFire from 'vuefire'
import App from '../app/components/App.vue'
import { Pagination } from 'bootstrap-vue/es/components'

Vue.use(Pagination);

Vue.config.productionTip = false
Vue.use(VueFire)
Vue.use(Pagination)

import config from '../config'
Firebase.initializeApp(config.firebase)
Firebase.auth().onAuthStateChanged(function(user) {
    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app')
})