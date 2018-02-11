import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/user-form'
import api from '../../api/users'

let form = new Form()
let module = new CrudModule('users', form, api)
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
