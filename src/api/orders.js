import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_ORDERS)
  },
  get (id) {
    return api.server.get(api.GET_ORDER.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_ORDER, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_ORDER.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_ORDER.replace(':id', id), data)
  }
}
