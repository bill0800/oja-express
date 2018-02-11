import * as getterTypes from '../getter-types'
import * as mutationTypes from '../mutation-types'
import {LOGIN, LOGOUT, DESTROY_SESSION} from '../action-types'
import auth from '../../api/auth'
import CrudModule from '../../core/crud-module'
import Form from '../../core/forms/auth-form'
import Event from '../../core/Event'

let form = new Form()
let module = new CrudModule('auth', form, auth)

const state = {
  ...module.state(),
  tokenType: null,
  token: null,
  user: null
}

const getters = {
  [getterTypes.IS_LOGGED_IN]: state => state.user !== null,
  [getterTypes.AUTH_USER]: state => state.user,
  ...module.getters()
}

const mutations = {
  [mutationTypes.SAVE_AUTH_DATA] (state, data) {
    if (data.hasOwnProperty('token_type') &&
      data.hasOwnProperty('access_token') &&
      data.hasOwnProperty('user')) {
      state.tokenType = data.token_type
      state.token = data.access_token
      state.user = data.user.data
    }
  },
  [mutationTypes.CACHE_AUTH_DATA] (state) {
    window.localStorage.setItem('tokenType', state.tokenType)
    window.localStorage.setItem('token', state.token)
    window.localStorage.setItem('user', JSON.stringify(state.user))
  },
  [mutationTypes.RETRIEVE_CACHED_AUTH_DATA] (state) {
    state.tokenType = window.localStorage.getItem('tokenType')
    state.token = window.localStorage.getItem('token')
    let userJsonString = window.localStorage.getItem('user')
    state.user = userJsonString ? JSON.parse(userJsonString) : null
  },
  [mutationTypes.CLEAR_CACHED_AUTH_DATA] (state) {
    window.localStorage.clear()
  },
  [mutationTypes.CLEAR_AUTH_DATA] (state) {
    state.tokenType = state.token = state.user = null
  },
  ...module.mutations()
}

const actions = {
  [LOGIN] ({commit}, data) {
    return auth.login(data)
  },
  [LOGOUT] ({commit}) {
    commit(mutationTypes.CLEAR_AUTH_DATA)
    commit(mutationTypes.CLEAR_CACHED_AUTH_DATA)
  },
  [DESTROY_SESSION] ({state, dispatch}, payload) {
    dispatch(LOGOUT)
    if (!state.user) {
      return
    }
    Event.$emit('sessionDestroyed')
  },
  ...module.actions()
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
