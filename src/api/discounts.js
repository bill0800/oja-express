import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_DISCOUNTS.replace(':product_id', params._key))
  },
  get (id) {
    return api.server.get(api.GET_DISCOUNT.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_DISCOUNT, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_DISCOUNT.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_DISCOUNT.replace(':id', id), data)
  }
}
