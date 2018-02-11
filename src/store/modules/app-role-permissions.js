import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/app-role-permission-form'
import api from '../../api/app-role-permissions'

let form = new Form()
let module = new CrudModule('app_role_permissions', form, api, 'role_id')
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
