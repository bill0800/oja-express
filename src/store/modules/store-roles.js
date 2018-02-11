import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/store-role-form'
import api from '../../api/store-roles'

let form = new Form()
let module = new CrudModule('store_roles', form, api)
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
