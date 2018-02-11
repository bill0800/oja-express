import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_PRODUCT_IMAGES.replace(':product_id', params._key))
  },
  get (id) {
    return api.server.get(api.GET_PRODUCT_IMAGE.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_PRODUCT_IMAGE, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_PRODUCT_IMAGE.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_PRODUCT_IMAGE.replace(':id', id), data)
  }
}
