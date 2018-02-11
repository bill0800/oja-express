import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/product-review-form'
import api from '../../api/product-reviews'

let form = new Form()
let module = new CrudModule('product_reviews', form, api, 'product_id')
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
