import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/category-form'
import api from '../../api/categories'

let form = new Form()
let module = new CrudModule('categories', form, api)
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
