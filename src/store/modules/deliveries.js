import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/delivery-form'
import api from '../../api/deliveries'

let form = new Form()
let module = new CrudModule('deliveries', form, api, 'order_id')
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
