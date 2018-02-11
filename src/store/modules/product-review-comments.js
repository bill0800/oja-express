import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/product-review-comment-form'
import api from '../../api/product-review-comments'

let form = new Form()
let module = new CrudModule('product_review_comments', form, api, 'review_id')
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
