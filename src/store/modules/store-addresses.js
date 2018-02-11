import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/store-address-form'
import api from '../../api/store-addresses'

let form = new Form()
let module = new CrudModule('store_addresses', form, api, 'store_id')
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
