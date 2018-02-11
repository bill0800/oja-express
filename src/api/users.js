import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_USERS)
  },
  get (id) {
    return api.server.get(api.GET_USER.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_USER, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_USER.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_USER.replace(':id', id), data)
  }
}
