import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/coupon-form'
import api from '../../api/coupons'

let form = new Form()
let module = new CrudModule('coupons', form, api)
export default {
  namespaced: true,
  state: {
    ...module.state()
  },
  getters: {
    ...module.getters()
  },
  mutations: {
    ...module.mutations()
  },
  actions: {
    ...module.actions()
  }
}
