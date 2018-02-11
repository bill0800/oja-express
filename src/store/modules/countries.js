import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/country-form'
import api from '../../api/countries'

let form = new Form()
let module = new CrudModule('countries', form, api)
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
