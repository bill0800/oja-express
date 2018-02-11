import * as mutationTypes from '../store/mutation-types'
import * as actionTypes from '../store/action-types'

export default function (api) {
  let getErrorHandler = function (commit, dispatch) {
    return (error) => {
      commit(mutationTypes.STOP_LOADER, null, { root: true })
      if (error.response.status === 401) {
        dispatch(`auth/${actionTypes.DESTROY_SESSION}`, null, { root: true })
      }
    }
  }
  return {
    [actionTypes.ATTACH]: ({state, commit, dispatch}, payload) => {
      commit(mutationTypes.START_LOADER, null, { root: true })
      return new Promise((resolve, reject) => {
        api.attach(state.form.data()).then(
          (response) => {
            commit(mutationTypes.STOP_LOADER, null, { root: true })
            commit(mutationTypes.ADD_ITEM, response.data.data)
            resolve(response)
          },
          (error) => {
            commit(mutationTypes.RECORD_ERRORS, error.response.data)
            getErrorHandler(commit, dispatch)(error)
            reject(error)
          }
        )
      })
    },
    [actionTypes.DETACH]: ({state, commit, dispatch}, payload) => {
      commit(mutationTypes.START_LOADER, null, { root: true })
      return new Promise((resolve, reject) => {
        api.detach(state.form.data()).then(
          (response) => {
            commit(mutationTypes.STOP_LOADER, null, { root: true })
            commit(mutationTypes.ADD_ITEM, response.data.data)
            resolve(response)
          },
          (error) => {
            commit(mutationTypes.RECORD_ERRORS, error.response.data)
            getErrorHandler(commit, dispatch)(error)
            reject(error)
          }
        )
      })
    },
    [actionTypes.SYNC]: ({state, commit, dispatch}, payload) => {
      commit(mutationTypes.START_LOADER, null, { root: true })
      return new Promise((resolve, reject) => {
        api.sync(state.form.data()).then(
          (response) => {
            commit(mutationTypes.STOP_LOADER, null, { root: true })
            commit(mutationTypes.ADD_ITEM, response.data.data)
            resolve(response)
          },
          (error) => {
            commit(mutationTypes.RECORD_ERRORS, error.response.data)
            getErrorHandler(commit, dispatch)(error)
            reject(error)
          }
        )
      })
    }
  }
}
