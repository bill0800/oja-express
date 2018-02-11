import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/app-role-form'
import api from '../../api/app-roles'

let form = new Form()
let module = new CrudModule('app_roles', form, api)
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
