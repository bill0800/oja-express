import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_TRANSACTIONS)
  },
  get (id) {
    return api.server.get(api.GET_TRANSACTION.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_TRANSACTION, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_TRANSACTION.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_TRANSACTION.replace(':id', id), data)
  }
}
