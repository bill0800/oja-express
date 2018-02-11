import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_APP_ROLES)
  },
  get (id) {
    return api.server.get(api.GET_APP_ROLE.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_APP_ROLE, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_APP_ROLE.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_APP_ROLE.replace(':id', id), data)
  }
}
