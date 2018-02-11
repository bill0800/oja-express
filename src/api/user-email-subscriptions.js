import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_USER_EMAIL_SUBSCRIPTIONS.replace('user_id', params._key))
  },
  get (id) {
    return api.server.get(api.GET_USER_EMAIL_SUBSCRIPTION.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_USER_EMAIL_SUBSCRIPTION, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_USER_EMAIL_SUBSCRIPTION.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_USER_EMAIL_SUBSCRIPTION.replace(':id', id), data)
  }
}
