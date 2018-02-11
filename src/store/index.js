import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import sidebar from './modules/sidebar'
import appPermissions from './modules/app-permissions'
import appRoles from './modules/app-roles'
import appRolePermissions from './modules/app-role-permissions'
import auth from './modules/auth'
import categories from './modules/categories'
import coupons from './modules/coupons'
import deliveries from './modules/deliveries'
import deliveryTransitions from './modules/delivery-transitions'
import discounts from './modules/discounts'
import emailSubscriptions from './modules/email-subscriptions'
import orders from './modules/orders'
import productImages from './modules/product-images'
import productReviews from './modules/product-reviews'
import productReviewComments from './modules/product-review-comments'
import products from './modules/products'
import stopPoints from './modules/stop-points'
import storeAddresses from './modules/store-addresses'
import storePermissions from './modules/store-permissions'
import storeReviews from './modules/store-reviews'
import storeReviewComments from './modules/store-review-comments'
import storeRoles from './modules/store-roles'
import storeRolePermissions from './modules/store-role-permissions'
import storeSchedules from './modules/store-schedules'
import stores from './modules/stores'
import tags from './modules/tags'
import transactions from './modules/transactions'
import userEmailSubscriptions from './modules/user-email-subscriptions'
import userPermissions from './modules/user-permissions'
import userRoles from './modules/user-roles'
import userStorePermissions from './modules/user-store-permissions'
import userStoreRoles from './modules/user-store-roles'
import users from './modules/users'
import countries from './modules/countries'
import loader from './modules/loader'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  modules: {
    sidebar,
    appPermissions,
    appRoles,
    appRolePermissions,
    auth,
    loader,
    categories,
    coupons,
    deliveries,
    deliveryTransitions,
    discounts,
    emailSubscriptions,
    orders,
    productImages,
    productReviews,
    productReviewComments,
    products,
    stopPoints,
    storeAddresses,
    storePermissions,
    storeReviewComments,
    storeReviews,
    storeRoles,
    storeRolePermissions,
    storeSchedules,
    stores,
    tags,
    transactions,
    userEmailSubscriptions,
    userPermissions,
    userRoles,
    userStorePermissions,
    userStoreRoles,
    users,
    countries
  },
  strict: debug
})
