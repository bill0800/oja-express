import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_APP_PERMISSIONS)
  },
  get (id) {
    return api.server.get(api.GET_APP_PERMISSION.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_APP_PERMISSION, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_APP_PERMISSION.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_APP_PERMISSION.replace(':id', id), data)
  }
}
