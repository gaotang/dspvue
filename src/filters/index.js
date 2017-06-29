import Vue from 'vue'

/**
 * 清除时间字符串中的“T”和豪秒数
 */
Vue.filter('clearT', function (value = '') {
  if (value.indexOf('T') !== -1) {
    value = value.replace('T', ' ')
  }
  if (value.indexOf('.') !== -1) {
    value = value.split('.')[0]
  }
  return value
})

/**
 * 分割字符串
 */
Vue.filter('subStr', function (value = '', length = 4) {
  if (value) {
    value = value.substring(0, length)
  }
  return value
})
