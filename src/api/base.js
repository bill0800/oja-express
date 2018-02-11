import axios from 'axios'

export const BASE = 'https://api.staging.ojaexpress.com/v1/'
// export const BASE = 'https://api.oja.dev/v1/'

export let server = axios.create({
  baseURL: BASE,
  // timeout: 1000,
  headers: {'Accept': 'application/json'}
})

server.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'

export let qs = require('querystring')

// AUTH
export const LOGIN = 'clients/web/admin/login'
export const REGISTER = 'register'
export const GET_USER_PROFILE = 'user/info?include=socialProfiles'
export const RESET_PASSWORD = 'user/reset-password'
export const REQUEST_PASSWORD_RESET_LINK = 'user/password/reset-link'

// STORES
export const GET_STORES = 'admin/stores'
export const CREATE_STORE = 'stores'
export const UPDATE_STORE = 'stores/:id'
export const DELETE_STORE = 'stores/:id'
export const GET_STORE = 'stores/:id'

// CATEGORIES
export const GET_CATEGORIES = 'categories?include=parent'
export const GET_STORE_CATEGORIES = 'categories?search'
export const CREATE_CATEGORY = 'categories'
export const UPDATE_CATEGORY = 'categories/:id'
export const DELETE_CATEGORY = 'categories/:id'
export const GET_CATEGORY = 'categories/:id?include=parent'

// PRODUCTS
export const GET_PRODUCTS = 'admin/products?include=images&orderBy=updated_at&sortedBy=desc'
export const GET_STORE_PRODUCTS = 'products?search'
export const CREATE_PRODUCT = 'products'
export const UPDATE_PRODUCT = 'products/:id'
export const DELETE_PRODUCT = 'products/:id'
export const GET_PRODUCT = 'products/:id?include=images,categories'

// PRODUCTS
export const GET_PRODUCT_IMAGES = 'products/images?orderBy=updated_at&sortedBy=desc'
export const GET_STORE_PRODUCT_IMAGES = 'products/images?search'
export const CREATE_PRODUCT_IMAGE = 'products/images'
export const UPDATE_PRODUCT_IMAGE = 'products/images/:id'
export const DELETE_PRODUCT_IMAGE = 'products/images/:id'
export const GET_PRODUCT_IMAGE = 'products/images/:id'

// COUPONS
export const GET_COUPONS = 'admin/coupons'
export const GET_STORE_COUPONS = 'coupons?search'
export const CREATE_COUPON = 'coupons'
export const UPDATE_COUPON = 'coupons/:id'
export const DELETE_COUPON = 'coupons/:id'
export const GET_COUPON = 'coupons/:id'

// COUNTRIES
export const GET_COUNTRIES = 'countries'
export const CREATE_COUNTRY = 'countries'
export const UPDATE_COUNTRY = 'countries/:id'
export const DELETE_COUNTRY = 'countries/:id'
export const GET_COUNTRY = 'countries/:id'

// ORDERS
export const GET_ORDERS = 'admin/orders?orderBy=created_at&sortedBy=desc'
export const GET_STORE_ORDERS = 'orders'
export const CREATE_ORDER = 'orders'
export const UPDATE_ORDER = 'orders/:id'
export const DELETE_ORDER = 'orders/:id'
export const GET_ORDER = 'orders/:id?include=cartItems'

// TRANSACTIONS
export const GET_TRANSACTIONS = 'admin/transactions'
export const GET_STORE_TRANSACTIONS = 'transactions?search'
export const CREATE_TRANSACTION = 'transactions'
export const UPDATE_TRANSACTION = 'transactions/:id'
export const DELETE_TRANSACTION = 'transactions/:id'
export const GET_TRANSACTION = 'transactions/:id'

// USER
export const GET_USERS = 'users'
export const GET_STORE_USERS = 'users?search'
export const CREATE_USER = 'users'
export const UPDATE_USER = 'users/:id'
export const DELETE_USER = 'users/:id'
export const GET_USER = 'users/:id'

// APP ROLE
export const GET_APP_ROLES = 'app/roles'
export const CREATE_APP_ROLE = 'app/roles'
export const UPDATE_APP_ROLE = 'app/roles/:id'
export const DELETE_APP_ROLE = 'app/roles/:id'
export const GET_APP_ROLE = 'app/roles/:id'

// USER APP ROLE
export const GET_USER_APP_ROLES = 'user/roles'
export const ASSIGN_USER_APP_ROLE = 'user/roles/assign'
export const REVOKE_USER_APP_ROLE = 'user/roles/revoke'
export const SYNC_USER_APP_ROLE = 'user/roles/sync'

// APP ROLE PERMISSION
export const ATTACH_APP_PERMISSIONS_TO_APP_ROLE = 'app/permissions/attach'
export const DETACH_APP_PERMISSIONS_FROM_APP_ROLE = 'app/permissions/detach'
export const SYNC_APP_ROLE_PERMISSIONS = 'app/permissions/sync'

// APP PERMISSION
export const GET_APP_PERMISSIONS = 'app/permissions'
export const CREATE_APP_PERMISSION = 'app/permissions'
export const UPDATE_APP_PERMISSION = 'app/permissions/:id'
export const DELETE_APP_PERMISSION = 'app/permissions/:id'
export const GET_APP_PERMISSION = 'app/permissions/:id'

// USER APP PERMISSION
export const GET_USER_APP_PERMISSIONS = 'user/permissions'
export const ASSIGN_USER_APP_PERMISSIONS = 'user/permissions/assign'
export const REVOKE_USER_APP_PERMISSION = 'user/permissions/revoke'
export const SYNC_USER_APP_PERMISSION = 'user/permissions/sync'

// STORE ROLE
export const GET_STORE_ROLES = 'stores/roles'
export const CREATE_STORE_ROLE = 'stores/roles'
export const UPDATE_STORE_ROLE = 'stores/roles/:id'
export const DELETE_STORE_ROLE = 'stores/roles/:id'
export const GET_STORE_ROLE = 'stores/roles/:id'

// USER STORE ROLE
export const GET_USER_STORE_ROLES = 'user/store-roles'
export const ASSIGN_USER_STORE_ROLE = 'user/store-roles/assign'
export const REVOKE_USER_STORE_ROLE = 'user/store-roles/revoke'
export const SYNC_USER_STORE_ROLE = 'user/store-roles/sync'

// STORE PERMISSION
export const GET_STORE_PERMISSIONS = 'stores/permissions'
export const CREATE_STORE_PERMISSION = 'stores/permissions'
export const UPDATE_STORE_PERMISSION = 'stores/permissions/:id'
export const DELETE_STORE_PERMISSION = 'stores/permissions/:id'
export const GET_STORE_PERMISSION = 'stores/permissions/:id'

// STORE ROLE PERMISSION
export const ATTACH_STORE_PERMISSIONS_TO_STORE_ROLE = 'stores/permissions/attach'
export const DETACH_STORE_PERMISSIONS_FROM_STORE_ROLE = 'stores/permissions/detach'
export const SYNC_STORE_ROLE_PERMISSIONS = 'stores/permissions/sync'

// USER STORE PERMISSION
export const GET_USER_STORE_PERMISSIONS = 'user/store-permissions'
export const ASSIGN_USER_STORE_PERMISSIONS = 'user/store-permissions/assign'
export const REVOKE_USER_STORE_PERMISSION = 'user/store-permissions/revoke'
export const SYNC_USER_STORE_PERMISSION = 'user/store-permissions/sync'

// DELIVERY
export const GET_DELIVERIES = 'orders/:order_id/deliveries'
export const CREATE_DELIVERY = 'deliveries'
export const UPDATE_DELIVERY = 'deliveries/:id'
export const DELETE_DELIVERY = 'deliveries/:id'
export const GET_DELIVERY = 'deliveries/:id'

// DELIVERY TRANSITION
export const GET_DELIVERY_TRANSITIONS = 'deliveries/transitions'
export const CREATE_DELIVERY_TRANSITION = 'deliveries/transitions'
export const UPDATE_DELIVERY_TRANSITION = 'deliveries/transitions/:id'
export const DELETE_DELIVERY_TRANSITION = 'deliveries/transitions/:id'
export const GET_DELIVERY_TRANSITION = 'deliveries/transitions/:id'

// DISCOUNT
export const GET_DISCOUNTS = 'products/:product_id/discounts'
export const CREATE_DISCOUNT = 'discounts'
export const UPDATE_DISCOUNT = 'discounts/:id'
export const DELETE_DISCOUNT = 'discounts/:id'
export const GET_DISCOUNT = 'discounts/:id'

// EMAIL SUBSCRIPTION
export const GET_EMAIL_SUBSCRIPTIONS = 'email-subscriptions'
export const CREATE_EMAIL_SUBSCRIPTION = 'email-subscriptions'
export const UPDATE_EMAIL_SUBSCRIPTION = 'email-subscriptions/:id'
export const DELETE_EMAIL_SUBSCRIPTION = 'email-subscriptions/:id'
export const GET_EMAIL_SUBSCRIPTION = 'email-subscriptions/:id'

// USER EMAIL SUBSCRIPTION
export const GET_USER_EMAIL_SUBSCRIPTIONS = 'user/email-subscriptions'
export const CREATE_USER_EMAIL_SUBSCRIPTION = 'user/email-subscriptions'
export const UPDATE_USER_EMAIL_SUBSCRIPTION = 'user/email-subscriptions/:id'
export const DELETE_USER_EMAIL_SUBSCRIPTION = 'user/email-subscriptions/:id'
export const GET_USER_EMAIL_SUBSCRIPTION = 'user/email-subscriptions/:id'

// PRODUCT REVIEW
export const GET_PRODUCT_REVIEWS = 'products/reviews'
export const CREATE_PRODUCT_REVIEW = 'products/reviews'
export const UPDATE_PRODUCT_REVIEW = 'products/reviews/:id'
export const DELETE_PRODUCT_REVIEW = 'products/reviews/:id'
export const GET_PRODUCT_REVIEW = 'products/reviews/:id'

// PRODUCT REVIEW COMMENT
export const GET_PRODUCT_REVIEW_COMMENTS = 'products/review-comments'
export const CREATE_PRODUCT_REVIEW_COMMENT = 'products/review-comments'
export const UPDATE_PRODUCT_REVIEW_COMMENT = 'products/review-comments/:id'
export const DELETE_PRODUCT_REVIEW_COMMENT = 'products/review-comments/:id'
export const GET_PRODUCT_REVIEW_COMMENT = 'products/review-comments/:id'

// STORE REVIEW
export const GET_STORE_REVIEWS = 'stores/:store_id/reviews'
export const CREATE_STORE_REVIEW = 'stores/reviews'
export const UPDATE_STORE_REVIEW = 'stores/reviews/:id'
export const DELETE_STORE_REVIEW = 'stores/reviews/:id'
export const GET_STORE_REVIEW = 'stores/reviews/:id'

// STORE REVIEW COMMENT
export const GET_STORE_REVIEW_COMMENTS = 'stores/review-comments'
export const CREATE_STORE_REVIEW_COMMENT = 'stores/review-comments'
export const UPDATE_STORE_REVIEW_COMMENT = 'stores/review-comments/:id'
export const DELETE_STORE_REVIEW_COMMENT = 'stores/review-comments/:id'
export const GET_STORE_REVIEW_COMMENT = 'stores/review-comments/:id'

// STOP POINT
export const GET_STOP_POINTS = 'stop-points'
export const CREATE_STOP_POINT = 'stop-points'
export const UPDATE_STOP_POINT = 'stop-points/:id'
export const DELETE_STOP_POINT = 'stop-points/:id'
export const GET_STOP_POINT = 'stop-points/:id'

// STORE ADDRESS
export const GET_STORE_ADDRESSES = 'stores/:store_id/addresses'
export const CREATE_STORE_ADDRESS = 'stores/addresses'
export const UPDATE_STORE_ADDRESS = 'stores/addresses/:id'
export const DELETE_STORE_ADDRESS = 'stores/addresses/:id'
export const GET_STORE_ADDRESS = 'stores/addresses/:id'

// STORE SCHEDULE
export const GET_STORE_SCHEDULES = 'stores/:store_id/schedules'
export const CREATE_STORE_SCHEDULE = 'stores/schedules'
export const UPDATE_STORE_SCHEDULE = 'stores/schedules/:id'
export const DELETE_STORE_SCHEDULE = 'stores/schedules/:id'
export const GET_STORE_SCHEDULE = 'stores/schedules/:id'

// TAG
export const GET_TAGS = 'tags'
export const CREATE_TAG = 'tags'
export const UPDATE_TAG = 'tags/:id'
export const DELETE_TAG = 'tags/:id'
export const GET_TAG = 'tags/:id'
