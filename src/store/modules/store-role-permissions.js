import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/store-role-permission-form'
import api from '../../api/store-role-permissions'

let form = new Form()
let module = new CrudModule('store_role_permissions', form, api, 'role_id')
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
