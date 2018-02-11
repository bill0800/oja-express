import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_STORE_REVIEWS.replace(':store_id', params._key))
  },
  get (id) {
    return api.server.get(api.GET_STORE_REVIEW.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_STORE_REVIEW, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_STORE_REVIEW.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_STORE_REVIEW.replace(':id', id), data)
  }
}
