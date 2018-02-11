import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_STOP_POINTS)
  },
  get (id) {
    return api.server.get(api.GET_STOP_POINT.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_STOP_POINT, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_STOP_POINT.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_STOP_POINT.replace(':id', id), data)
  }
}
