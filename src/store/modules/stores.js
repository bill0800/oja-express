import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/store-form'
import api from '../../api/stores'

let form = new Form()
let module = new CrudModule('stores', form, api)
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
