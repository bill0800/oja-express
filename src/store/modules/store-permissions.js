import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/store-permission-form'
import api from '../../api/store-permissions'

let form = new Form()
let module = new CrudModule('store_permissions', form, api)
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
