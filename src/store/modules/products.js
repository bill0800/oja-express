import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/product-form'
import api from '../../api/products'

let form = new Form()
let module = new CrudModule('products', form, api)
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
