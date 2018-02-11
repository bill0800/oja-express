import * as types from '../mutation-types'
import {IS_LOADING} from '../getter-types'

const state = {
  loading: {}
}

const getters = {
  [IS_LOADING]: state => Object.keys(state.loading).length > 0
}

const mutations = {
  [types.START_LOADER] (state, {name}) {
    let newState = {}
    newState[name] = true
    state.loading = {...state.loading, ...newState}
  },
  [types.STOP_LOADER] (state, {name}) {
    let newLoadingState = state.loading
    delete newLoadingState[name]
    state.loading = {...newLoadingState}
  }
}

export default {
  state,
  getters,
  mutations
}
