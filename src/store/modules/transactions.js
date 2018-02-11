import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/transaction-form'
import api from '../../api/transactions'

let form = new Form()
let module = new CrudModule('transactions', form, api)
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
