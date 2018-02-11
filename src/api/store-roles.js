import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_STORE_ROLES)
  },
  get (id) {
    return api.server.get(api.GET_STORE_ROLE.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_STORE_ROLE, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_STORE_ROLE.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_STORE_ROLE.replace(':id', id), data)
  }
}
