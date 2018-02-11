import * as api from './base'

export default {
  attach (data) {
    return api.server.post(api.ATTACH_STORE_PERMISSIONS_TO_STORE_ROLE, data)
  },
  detach (data) {
    return api.server.post(api.DETACH_STORE_PERMISSIONS_FROM_STORE_ROLE, data)
  },
  sync (data) {
    return api.server.post(api.SYNC_STORE_ROLE_PERMISSIONS, data)
  }
}
