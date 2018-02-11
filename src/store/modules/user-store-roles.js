import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/user-store-role-form'
import api from '../../api/user-store-roles'

let form = new Form()
let module = new CrudModule('user_store_roles', form, api, 'user_id')
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
