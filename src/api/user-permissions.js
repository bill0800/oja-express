import * as api from './base'

export default {
  attach (data) {
    return api.server.post(api.ASSIGN_USER_APP_PERMISSIONS, data)
  },
  detach (data) {
    return api.server.post(api.REVOKE_USER_APP_PERMISSION, data)
  },
  sync (data) {
    return api.server.post(api.SYNC_USER_APP_PERMISSION, data)
  }
}
