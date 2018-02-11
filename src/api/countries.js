import * as api from './base'

export default {
  fetch ({params, absoluteUrl}) {
    if (absoluteUrl) {
      return api.server.get(absoluteUrl)
    }
    return api.server.get(api.GET_COUNTRIES)
  },
  get (id) {
    return api.server.get(api.GET_COUNTRY.replace(':id', id))
  },
  create (data) {
    return api.server.post(api.CREATE_COUNTRY, data)
  },
  update (data, id) {
    return api.server.put(api.UPDATE_COUNTRY.replace(':id', id), data)
  },
  delete (data, id) {
    return api.server.delete(api.DELETE_COUNTRY.replace(':id', id), data)
  }
}
