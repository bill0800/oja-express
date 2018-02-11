import {RETRIEVE_CACHED_AUTH_DATA} from '../store/mutation-types'
import * as actions from '../store/action-types'
import {server} from '../api/base'
import * as pages from '../router/route-names'

export let getAuthValidator = function (store) {
  return (to, from, next) => {
    store.commit(`auth/${RETRIEVE_CACHED_AUTH_DATA}`)
    if (store.state.auth.user === null) {
      if ([pages.LOGIN, pages.REGISTER].indexOf(to.name) === -1) {
        next({name: 'login'})
        return
      }
    }
    server.defaults.headers.common['Authorization'] = `Bearer ${store.state.auth.token}`
    switch (to.name) {
      case pages.HOME:
        store.dispatch(actions.FETCH_PRODUCTS)
        store.dispatch(actions.FETCH_STORES)
        store.dispatch(actions.FETCH_ORDERS)
        break
      case pages.PRODUCTS:
        store.dispatch(actions.FETCH_PRODUCTS)
        break
      case pages.CREATE_PRODUCT:
      case pages.EDIT_PRODUCT:
        store.dispatch(actions.FETCH_STORES)
        store.dispatch(actions.FETCH_CATEGORIES)
        break
      case pages.CATEGORIES:
        store.dispatch(actions.FETCH_CATEGORIES)
        break
      case pages.STORES:
        store.dispatch(actions.FETCH_STORES)
        break
      case pages.CREATE_STORE:
      case pages.EDIT_STORE:
        store.dispatch(actions.FETCH_USERS)
        store.dispatch(actions.FETCH_COUNTRIES)
        break
      case pages.COUPONS:
        store.dispatch(actions.FETCH_COUPONS)
        break
      case pages.ORDERS:
        store.dispatch(actions.FETCH_ORDERS)
        break
      case pages.TRANSACTIONS:
        store.dispatch(actions.FETCH_TRANSACTIONS)
        break
      case pages.USERS:
        store.dispatch(actions.FETCH_USERS)
        break
      case pages.APP_ROLES:
        store.dispatch(actions.FETCH_APP_ROLES)
        break
      case pages.APP_PERMISSIONS:
        store.dispatch(actions.FETCH_APP_PERMISSIONS)
        break
      case pages.STORE_ROLES:
        store.dispatch(actions.FETCH_STORE_ROLES)
        break
      case pages.STORE_PERMISSIONS:
        store.dispatch(actions.FETCH_STORE_PERMISSIONS)
        break
      // case pages.LOGIN:
      // case pages.REGISTER:
      //   next({name: 'home'})
      //   return
      default:
        console.log('No data pulled for this route!')
    }
    next()
  }
}
