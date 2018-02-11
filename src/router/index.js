import Vue from 'vue'
import store from '../store/index'
import * as pages from './route-names'
import {getAuthValidator} from './hooks'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import AppRoles from '@/pages/AppRoles'
import AppPermissions from '@/pages/AppPermissions'
import StoreRoles from '@/pages/StoreRoles'
import StorePermissions from '@/pages/StorePermissions'
import Products from '@/pages/Products'
import Product from '@/pages/Product'
import CreateProduct from '@/pages/CreateProduct'
import EditProduct from '@/pages/EditProduct'
import Stores from '@/pages/Stores'
import Store from '@/pages/Store'
import CreateStore from '@/pages/CreateStore'
import EditStore from '@/pages/EditStore'
import Categories from '@/pages/Categories'
import Orders from '@/pages/Orders'
import Order from '@/pages/Order'
import Users from '@/pages/Users'
import User from '@/pages/User'
import EditUser from '@/pages/EditUser'
import CreateUser from '@/pages/CreateUser'
import Coupons from '@/pages/Coupons'
import Coupon from '@/pages/Coupon'
import EditCoupon from '@/pages/EditCoupon'
import CreateCoupon from '@/pages/CreateCoupon'
import Transactions from '@/pages/Transactions'
import Transaction from '@/pages/Transaction'
import Tags from '@/pages/Tags'
import NotFound from '@/pages/NotFound'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      name: pages.LOGIN,
      component: Login
    },
    {
      path: '/register',
      name: pages.REGISTER,
      component: Register
    },
    {
      path: '/',
      name: pages.HOME,
      component: Home
    },
    {
      path: '/app-roles',
      name: pages.APP_ROLES,
      component: AppRoles
    },
    {
      path: '/app-permissions',
      name: pages.APP_PERMISSIONS,
      component: AppPermissions
    },
    {
      path: '/store-roles',
      name: pages.STORE_ROLES,
      component: StoreRoles
    },
    {
      path: '/store-permissions',
      name: pages.STORE_PERMISSIONS,
      component: StorePermissions
    },
    {
      path: '/stores',
      name: pages.STORES,
      component: Stores
    },
    {
      path: '/stores/:id/view',
      name: pages.STORE,
      component: Store
    },
    {
      path: '/stores/create',
      name: pages.CREATE_STORE,
      component: CreateStore
    },
    {
      path: '/stores/:id/edit',
      name: pages.EDIT_STORE,
      component: EditStore
    },
    {
      path: '/categories',
      name: pages.CATEGORIES,
      component: Categories
    },
    {
      path: '/tags',
      name: pages.TAGS,
      component: Tags
    },
    {
      path: '/products',
      name: pages.PRODUCTS,
      component: Products
    },
    {
      path: '/products/:id/view',
      name: pages.PRODUCT,
      component: Product
    },
    {
      path: '/products/create',
      name: pages.CREATE_PRODUCT,
      component: CreateProduct
    },
    {
      path: '/products/:id/edit',
      name: pages.EDIT_PRODUCT,
      component: EditProduct
    },
    {
      path: '/coupons',
      name: pages.COUPONS,
      component: Coupons
    },
    {
      path: '/coupons/:id/view',
      name: pages.COUPON,
      component: Coupon
    },
    {
      path: '/coupons/create',
      name: pages.CREATE_COUPON,
      component: CreateCoupon
    },
    {
      path: '/coupons/:id/edit',
      name: pages.EDIT_COUPON,
      component: EditCoupon
    },
    {
      path: '/orders',
      name: pages.ORDERS,
      component: Orders
    },
    {
      path: '/orders/:id/view',
      name: pages.ORDER,
      component: Order
    },
    {
      path: '/transactions',
      name: pages.TRANSACTIONS,
      component: Transactions
    },
    {
      path: '/transactions/:id/view',
      name: pages.TRANSACTION,
      component: Transaction
    },
    {
      path: '/users',
      name: pages.USERS,
      component: Users
    },
    {
      path: '/users/:id/profile',
      name: pages.USER,
      component: User
    },
    {
      path: '/users/create',
      name: pages.CREATE_USER,
      component: CreateUser
    },
    {
      path: '/users/:id/edit',
      name: pages.EDIT_USER,
      component: EditUser
    },
    {
      path: '*',
      component: NotFound
    }
  ],
  linkActiveClass: 'active'
})

router.beforeEach(getAuthValidator(store))

export default router
