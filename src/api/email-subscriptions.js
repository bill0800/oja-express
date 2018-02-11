import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_EMAIL_SUBSCRIPTIONS)
  },
  get (id) {
    return api.server.get(api.GET_EMAIL_SUBSCRIPTION.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_EMAIL_SUBSCRIPTION, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_EMAIL_SUBSCRIPTION.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_EMAIL_SUBSCRIPTION.replace(':id', id), data)
  }
}
