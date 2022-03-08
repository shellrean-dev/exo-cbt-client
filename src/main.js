import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/coreui'
import VueSweetalert2 from 'vue-sweetalert2'
import {
 TablePlugin,
 ButtonPlugin,
 CardPlugin,
 SpinnerPlugin,
 FormGroupPlugin,
 InputGroupPlugin,
 PaginationPlugin,
 FormCheckboxPlugin,
 BadgePlugin,
 FormSelectPlugin,
 ProgressPlugin ,
 FormInputPlugin,
 ModalPlugin,
 ToastPlugin,
 FormRadioPlugin,
 CollapsePlugin,
} from 'bootstrap-vue';

[TablePlugin, ButtonPlugin, CardPlugin, SpinnerPlugin, FormGroupPlugin, 
InputGroupPlugin, PaginationPlugin, FormCheckboxPlugin, BadgePlugin,
FormSelectPlugin,ProgressPlugin, FormInputPlugin, ModalPlugin, ToastPlugin,
FormRadioPlugin, CollapsePlugin ].forEach(comp => {
  Vue.use(comp);
});

import VueHtmlToPaper from 'vue-html-to-paper';
import CKEditor from 'ckeditor4-vue';

import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false
Vue.config.performance = true

if (process.env.VUE_APP_ENV === 'production') {
  Vue.config.devtools = false;
  Vue.config.debug = false;
  Vue.config.silent = true; 
}

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
    '/css/free.min.css'
  ],
  windowTitle: window.document.title
}

Vue.use(VueHtmlToPaper, options);
Vue.use(CoreuiVue)
Vue.use(VueSweetalert2)
Vue.use(CKEditor);

import { mapActions, mapGetters } from 'vuex'

new Vue({
  router,
  store,
  render: h => h(App),
  computed: {
    ...mapGetters(['isAuth'])
  },
  methods: {
    ...mapActions('user', ['getUserLogin']),
    ...mapActions('setting',['getConfig','getSettingSekolah', 'getSettingUjian'])
  },
  async created() {
    await this.getConfig()
    if (this.isAuth) {
      try {
        await this.getUserLogin()
        this.getSettingSekolah()
        this.getSettingUjian()
      } catch (error) {
        this.$bvToast.toast(error.message, {
          title: "Error",
          variant: 'danger',
          solid: true
        })
      }
    }
  }
}).$mount('#app')
