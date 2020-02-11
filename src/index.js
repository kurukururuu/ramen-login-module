/* eslint-disable no-unused-vars */
import Vue from 'vue';
// import './../node_modules/bulma/css/bulma.css';
import LoginComponent from './components/LoginComponent.vue';

import '@/assets/scss/main.scss';

// Declare install function executed by Vue.use()
export function install(Vue, options = {}) {
	if (install.installed) return;
	install.installed = true;
	Vue.component(options.LoginComponentName || 'LoginComponent', LoginComponent);
}

// Create module definition for Vue.use()
const plugin = {
	install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default LoginComponent;