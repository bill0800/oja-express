import * as api from './base'

export default {
  attach (data) {
    return api.server.post(api.ATTACH_APP_PERMISSIONS_TO_APP_ROLE, data)
  },
  detach (data) {
    return api.server.post(api.DETACH_APP_PERMISSIONS_FROM_APP_ROLE, data)
  },
  sync (data) {
    return api.server.post(api.SYNC_APP_ROLE_PERMISSIONS, data)
  }
}
