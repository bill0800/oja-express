import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/tag-form'
import api from '../../api/tags'

let form = new Form()
let module = new CrudModule('tags', form, api)
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
