import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_PRODUCT_REVIEW_COMMENTS.replace(':review_id', params._key))
  },
  get (id) {
    return api.server.get(api.GET_PRODUCT_REVIEW_COMMENT.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_PRODUCT_REVIEW_COMMENT, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_PRODUCT_REVIEW_COMMENT.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_PRODUCT_REVIEW_COMMENT.replace(':id', id), data)
  }
}
