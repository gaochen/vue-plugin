// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import CaSliderPc from 'ca-slider-pc'
import basicInfo from './utils/basicInfo'
import Cookie from './utils/cookie'
import generateUUID from './utils/generateUUID'
import setMeta from './utils/meta'

Vue.prototype.$setMeta = setMeta

Vue.use(CaSliderPc)

Vue.config.productionTip = false

Vue.prototype.$basicInfo = basicInfo
Vue.prototype.$sendBasicInfo = function(basicInfo) {
  let args = ''
  let params = Object.assign({}, basicInfo)
  params.v = JSON.stringify(params.v)
  for (var i in params) {
    if (args !== '') {
      args += '&'
    }
    args += i + '=' + encodeURIComponent(params[i])
  }
  console.log(args)
  var img = new Image(1, 1)
  img.src = 'https://warriors.jd.com/log.gif?' + args
}

router.beforeEach((to, from, next) => {
  let now = new Date().getTime()
  // 来源
  Vue.prototype.$basicInfo.ref = document.referrer
  // 当前时间戳
  Vue.prototype.$basicInfo.rm = now
  // 当前时间戳
  Vue.prototype.$basicInfo.v.yt = now
  // 当前url
  Vue.prototype.$basicInfo.v.p0 = {url : window.location.href}

  // sid过期时间为1h
  let sid = Cookie.get('basic_sid')
  let xt = Cookie.get('basic_xt')
  if (!sid || !xt) {
    sid = generateUUID()
    xt = new Date().getTime()
  
    Cookie.set('basic_sid', sid, 3600, '.ca-b2b.com')
    Cookie.set('basic_xt', xt, 3600, '.ca-b2b.com')
  }
  Vue.prototype.$basicInfo.sid = sid
  Vue.prototype.$basicInfo.v.xt = xt

  // eid，每次进入页面重新生成
  let eid = generateUUID()
  Vue.prototype.$basicInfo.eid = eid

  document.addEventListener('DOMContentLoaded', function(){
      let domReady = new Date().getTime()

      // domComplete zt
      Vue.prototype.$basicInfo.v.zt = domReady - now
      // 白屏时间 bt
      Vue.prototype.$basicInfo.v.bt = domReady - now
      // domReady dt
      Vue.prototype.$basicInfo.v.dt = domReady - now
  }, false);

  window.onload=function(){
    let onload = new Date().getTime()

    // onload
    Vue.prototype.$basicInfo.v.et = onload - now
    // 首屏加载时间
    Vue.prototype.$basicInfo.v.ct = onload - now

    // let basicInfo = Object.arguments({}, Vue.prototype.$basicInfo)
    console.log(Vue.prototype.$basicInfo)
    Vue.prototype.$sendBasicInfo(Vue.prototype.$basicInfo)
  }

  next()
})

Vue.directive('stat', {
  bind: (el, binding) => {
    el.addEventListener('click', (event) => {
      const value = binding.value
      console.log(value.poi())

      // 点击类型，预定义

      // 位置信息
      Vue.prototype.$basicInfo.v.p0.poi = value.poi
      // text
      Vue.prototype.$basicInfo.v.p0.text = event.srcElement ? event.srcElement.innerText : event.target.innerText
      // desc
      Vue.prototype.$basicInfo.v.p0.desc = event.srcElement ? event.srcElement.innerText : event.target.innerText
      // url
      Vue.prototype.$basicInfo.v.p0.url = window.location.href

      console.log(Vue.prototype.$basicInfo)
      // Vue.prototype.$sendBasicInfo(Vue.prototype.$basicInfo)
    })
  }
})

// import * as Sentry from '@sentry/browser';

// Sentry.init({
//   dsn: 'https://c0ec245739d84ba18370aac3f1ee6a77@sentry.io/1291292',
//   release: 'vuetest@1.0.0',
//   integrations: [new Sentry.Integrations.Vue({ Vue })],
// })

// window.Sentry = Sentry

// Vue.config.errorHandler = function(err, vm, info) {
//   console.log(err)
//   console.log(vm)
//   console.log(info)
// }

// Vue.prototype.$throw = function(error) {
//   return errorHandler(error, this)
// }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})