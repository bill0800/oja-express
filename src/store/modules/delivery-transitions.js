import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/delivery-transition-form'
import api from '../../api/delivery-transitions'

let form = new Form()
let module = new CrudModule('delivery_transitions', form, api, 'delivery')
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
