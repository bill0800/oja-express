import * as types from '../mutation-types'

const state = {
  open: true
}

const mutations = {
  [types.TOGGLE_SIDEBAR] (state) {
    state.open = !state.open
  }
}

export default {
  state,
  mutations
}
