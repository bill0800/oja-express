import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_CATEGORIES)
  },
  get (id) {
    return api.server.get(api.GET_CATEGORY.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_CATEGORY, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_CATEGORY.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_CATEGORY.replace(':id', id), data)
  }
}
