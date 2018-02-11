import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_COUPONS)
  },
  get (id) {
    return api.server.get(api.GET_COUPON.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_COUPON, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_COUPON.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_COUPON.replace(':id', id), data)
  }
}
