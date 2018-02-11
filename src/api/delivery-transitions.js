import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_DELIVERY_TRANSITIONS.replace(':delivery_id', params._key))
  },
  get (id) {
    return api.server.get(api.GET_DELIVERY_TRANSITIONS.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_DELIVERY_TRANSITION, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_DELIVERY_TRANSITION.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_DELIVERY_TRANSITION.replace(':id', id), data)
  }
}
