import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_DELIVERIES.replace(':order_id', params._key))
  },
  get (id) {
    return api.server.get(api.GET_DELIVERY.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_DELIVERY, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_DELIVERY.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_DELIVERY.replace(':id', id), data)
  }
}
