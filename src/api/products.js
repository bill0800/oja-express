import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_PRODUCTS)
  },
  get (id) {
    return api.server.get(api.GET_PRODUCT.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_PRODUCT, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_PRODUCT.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_PRODUCT.replace(':id', id), data)
  }
}
