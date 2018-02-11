import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/product-image-form'
import api from '../../api/product-images'

let form = new Form()
let module = new CrudModule('product_images', form, api, 'product_id')
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
