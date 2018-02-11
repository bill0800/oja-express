import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/order-form'
import api from '../../api/orders'

let form = new Form()
let module = new CrudModule('orders', form, api)
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
