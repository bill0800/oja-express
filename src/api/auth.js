import * as api from './base'

export default {
  login ({email, password}) {
    return api.server.post(api.LOGIN, {
      email: email,
      password: password
    })
  }
}
