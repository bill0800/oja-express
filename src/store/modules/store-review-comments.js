import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/store-review-comment-form'
import api from '../../api/store-review-comments'

let form = new Form()
let module = new CrudModule('store_review_comments', form, api, 'review_id')
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
