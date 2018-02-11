import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/app-permission-form'
import api from '../../api/app-permissions'

let form = new Form()
let module = new CrudModule('app_permissions', form, api)
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
