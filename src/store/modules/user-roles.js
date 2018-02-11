import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/user-role-form'
import api from '../../api/user-roles'

let form = new Form()
let module = new CrudModule('user_roles', form, api, 'user_id')
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
