import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/user-email-subscription-form'
import api from '../../api/user-email-subscriptions'

let form = new Form()
let module = new CrudModule('user_email_subscriptions', form, api, 'user_id')
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
