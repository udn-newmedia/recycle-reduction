// styles
import 'normalize.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@/assets/styles/UdnFontSize.css'
// runtime detector
import MobileDetect from 'mobile-detect'
import DetectInApp from 'detect-inapp'
// scrollmagic & gsap
import ScrollMagic from 'scrollmagic'
import 'animation.gsap'
import 'debug.addIndicators'
// vue
import Vue from 'vue'
import VueMq from 'vue-mq'
import App from './App.vue'

Vue.config.productionTip = false

const device = new MobileDetect(window.navigator.userAgent)
const inApp = new DetectInApp(window.navigator.userAgent)

Vue.prototype.$isMobile = device.mobile()
Vue.prototype.$isInApp = inApp.isInApp
Vue.prototype.$sm = ScrollMagic

Vue.use(VueMq, {
  breakpoints: {
    mobile: 520,
    smallTablet: 760,
    tablet: 960,
    desktop: 1280,
    desktopWide: Infinity
  },
  defaultBreakpoint: 'mobile'
})

new Vue({
  render: h => h(App)
}).$mount('#app')
