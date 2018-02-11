import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/store-schedule-form'
import api from '../../api/store-schedules'

let form = new Form()
let module = new CrudModule('store_schedules', form, api, 'store_id')
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
