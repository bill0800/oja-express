// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import 'bootstrap'
import store from './store/index'
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(Vuex)

Vue.filter('user_avatar', (user) => {
  if (!user.avatar || user.avatar === 'users/default.png') {
    let name = [user.first_name, user.last_name, user.name].join(' ')
    return `https://ui-avatars.com/api/?rounded=true&size=256&background=FB7729&color=ffffff&name=${encodeURIComponent(name)}`
  }
  return user.avatar
})

Vue.filter('store_avatar', (store) => {
  if (!store.avatar) {
    return `https://ui-avatars.com/api/?rounded=true&size=256&background=FB7729&color=ffffff&name=${encodeURIComponent(store.name)}`
  }
  return store.avatar
})

Vue.filter('parent', (entity) => {
  if (!entity.hasOwnProperty('parent') || !entity.parent.hasOwnProperty('data')) {
    return 'No Parent'
  }
  return entity.parent.data.name
})

Vue.filter('rel_time', (dateObject) => {
  return moment.utc(dateObject.date, 'YYYY-MM-DD HH:mm:ss.SSS').local().fromNow()
})

Vue.filter('readable_time', (dateObject) => {
  return moment.utc(dateObject.date, 'YYYY-MM-DD HH:mm:ss.SSS').local().format('dddd, MMMM Do YYYY, h:mm:ss a')
})

Vue.filter('to2dp', (value) => {
  return Math.ceil(value * 100) / 100.0
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
