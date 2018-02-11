import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/email-subscription-form'
import api from '../../api/email-subscriptions'

let form = new Form()
let module = new CrudModule('email_subscriptions', form, api)
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
