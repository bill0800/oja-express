import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_TAGS)
  },
  get (id) {
    return api.server.get(api.GET_TAG.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_TAG, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_TAG.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_TAG.replace(':id', id), data)
  }
}
