import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/stop-point-form'
import api from '../../api/stop-points'

let form = new Form()
let module = new CrudModule('stop_points', form, api)
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
