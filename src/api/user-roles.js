import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_USER_APP_ROLES.replace(':user_id', params._key))
  },
  attach (data) {
    return api.server.post(api.ASSIGN_USER_APP_ROLE, data)
  },
  detach (data) {
    return api.server.post(api.REVOKE_USER_APP_ROLE, data)
  },
  sync (data) {
    return api.server.post(api.SYNC_USER_APP_ROLE, data)
  }
}
