import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/discount-form'
import api from '../../api/discounts'

let form = new Form()
let module = new CrudModule('discounts', form, api, 'product_id')
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
