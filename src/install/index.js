const install = function (Vue, opts = {}) {
  Vue.prototype.$caches = { isLogin: false, user: { } }
  // auto install
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
  }
}

export default { install }
