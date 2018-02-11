import * as mutationTypes from '../store/mutation-types'
import * as actionTypes from '../store/action-types'

export default function ({api, name, groupKey}) {
  let getErrorHandler = function (commit, dispatch, stateName) {
    return (error) => {
      commit(mutationTypes.STOP_LOADER, {name: stateName}, { root: true })
      if (error.response && error.response.status === 401) {
        dispatch(`auth/${actionTypes.DESTROY_SESSION}`, null, { root: true })
      }
    }
  }
  if (groupKey) {
    return {
      [actionTypes.FETCH]: ({state, commit, dispatch, rootState}, payload) => {
        let key = payload._key
        let stateName = `${name}-${key}`
        if (state.repository.all[key] && Object.keys(state.repository.all[key]).length > 0 &&
          state.repository.pagination[key] && Object.keys(state.repository.pagination[key]).length > 0) {
          return
        }
        if (rootState.loader.loading.hasOwnProperty(stateName)) {
          return
        }
        commit(mutationTypes.START_LOADER, {name: stateName}, { root: true })
        return api.fetch({params: {_key: key}}).then(
          (response) => {
            commit(mutationTypes.STOP_LOADER, {name: stateName}, { root: true })
            commit(mutationTypes.SET_PAGINATION, {pagination: response.data.meta.pagination, key: key})
            commit(mutationTypes.ADD_MANY_ITEMS, {all: response.data.data, key: key})
          },
          getErrorHandler(commit, dispatch, stateName)
        )
      },
      [actionTypes.FETCH_NEXT]: ({state, commit, dispatch}, payload) => {
        let key = payload._key
        let stateName = `${name}-${key}`
        if (state.repository.pagination[key] && !state.repository.pagination[key].links.next) {
          return
        }
        commit(mutationTypes.START_LOADER, {name: stateName}, { root: true })
        return api.fetch({params: {_key: key}, absoluteUrl: state.repository.pagination.links.next}).then(
          (response) => {
            commit(mutationTypes.STOP_LOADER, {name: stateName}, { root: true })
            commit(mutationTypes.SET_PAGINATION, {pagination: response.data.meta.pagination, key: key})
            commit(mutationTypes.ADD_MANY_ITEMS, {all: response.data.data, key: key})
          },
          getErrorHandler(commit, dispatch, stateName)
        )
      },
      [actionTypes.GET]: ({state, commit, dispatch}, payload) => {
        let key = payload._key
        let stateName = `${name}-${key}`
        commit(mutationTypes.START_LOADER, {name: stateName}, { root: true })
        return new Promise((resolve, reject) => {
          api.get(payload.id).then(
            (response) => {
              commit(mutationTypes.STOP_LOADER, {name: stateName}, { root: true })
              commit(mutationTypes.ADD_ITEM, {item: response.data.data, key: key})
              resolve(response)
            },
            (error) => {
              commit(mutationTypes.RECORD_ERRORS, error.response.data)
              getErrorHandler(commit, dispatch, stateName)(error)
              reject(error)
            }
          )
        })
      },
      [actionTypes.CREATE]: ({state, commit, dispatch}, payload) => {
        let key = payload._key
        let stateName = `${name}-${key}`
        commit(mutationTypes.START_LOADER, {name: stateName}, { root: true })
        return new Promise((resolve, reject) => {
          api.create(state.form.data()).then(
            (response) => {
              commit(mutationTypes.STOP_LOADER, {name: stateName}, { root: true })
              commit(mutationTypes.ADD_ITEM, {item: response.data.data, key: key})
              resolve(response)
            },
            (error) => {
              commit(mutationTypes.RECORD_ERRORS, error.response.data)
              getErrorHandler(commit, dispatch, stateName)(error)
              reject(error)
            }
          )
        })
      },
      [actionTypes.UPDATE]: ({state, commit, dispatch}, payload) => {
        let key = payload._key
        let stateName = `${name}-${key}`
        commit(mutationTypes.START_LOADER, {name: stateName}, { root: true })
        return new Promise((resolve, reject) => {
          api.update(state.form.data(), payload.id).then(
            (response) => {
              commit(mutationTypes.STOP_LOADER, {name: stateName}, { root: true })
              commit(mutationTypes.UPDATE_ITEM, {item: response.data.data, key: key})
              resolve(response)
            },
            (error) => {
              commit(mutationTypes.RECORD_ERRORS, error.response.data)
              getErrorHandler(commit, dispatch, stateName)(error)
              reject(error)
            }
          )
        })
      },
      [actionTypes.DELETE]: ({commit, dispatch}, payload) => {
        let key = payload._key
        let stateName = `${name}-${key}`
        commit(mutationTypes.START_LOADER, {name: stateName}, { root: true })
        return new Promise((resolve, reject) => {
          api.delete(payload.id).then(
            (response) => {
              commit(mutationTypes.STOP_LOADER, {name: stateName}, { root: true })
              commit(mutationTypes.REMOVE_ITEM, {id: payload.id, key: key})
              resolve(response)
            },
            (error) => {
              commit(mutationTypes.RECORD_ERRORS, error.response.data)
              getErrorHandler(commit, dispatch, stateName)(error)
              reject(error)
            }
          )
        })
      }
    }
  }
  return {
    [actionTypes.FETCH]: ({state, commit, dispatch, rootState}, payload) => {
      if (Object.keys(state.repository.all).length > 0 && Object.keys(state.repository.pagination).length > 0) {
        return
      }
      if (rootState.loader.loading.hasOwnProperty(name)) {
        return
      }
      commit(mutationTypes.START_LOADER, {name: name}, { root: true })
      return api.fetch({}).then(
        (response) => {
          commit(mutationTypes.STOP_LOADER, {name: name}, { root: true })
          commit(mutationTypes.SET_PAGINATION, response.data.meta.pagination)
          commit(mutationTypes.ADD_MANY_ITEMS, response.data.data)
        },
        getErrorHandler(commit, dispatch, name)
      )
    },
    [actionTypes.FETCH_NEXT]: ({state, commit, dispatch}, payload) => {
      if (!state.repository.pagination.links.next) {
        return
      }
      commit(mutationTypes.START_LOADER, {name: name}, { root: true })
      return api.fetch({absoluteUrl: state.repository.pagination.links.next}).then(
        (response) => {
          commit(mutationTypes.STOP_LOADER, {name: name}, { root: true })
          commit(mutationTypes.SET_PAGINATION, response.data.meta.pagination)
          commit(mutationTypes.ADD_MANY_ITEMS, response.data.data)
        },
        getErrorHandler(commit, dispatch, name)
      )
    },
    [actionTypes.GET]: ({state, commit, dispatch}, payload) => {
      commit(mutationTypes.START_LOADER, {name: name}, { root: true })
      return new Promise((resolve, reject) => {
        api.get(payload.id).then(
          (response) => {
            commit(mutationTypes.STOP_LOADER, {name: name}, { root: true })
            commit(mutationTypes.ADD_ITEM, response.data.data)
            resolve(response)
          },
          (error) => {
            commit(mutationTypes.RECORD_ERRORS, error.response.data)
            getErrorHandler(commit, dispatch, name)(error)
            reject(error)
          }
        )
      })
    },
    [actionTypes.CREATE]: ({state, commit, dispatch}, payload) => {
      commit(mutationTypes.START_LOADER, {name: name}, { root: true })
      return new Promise((resolve, reject) => {
        api.create(state.form.data()).then(
          (response) => {
            commit(mutationTypes.STOP_LOADER, {name: name}, { root: true })
            commit(mutationTypes.ADD_ITEM, response.data.data)
            resolve(response)
          },
          (error) => {
            commit(mutationTypes.RECORD_ERRORS, error.response.data)
            getErrorHandler(commit, dispatch, name)(error)
            reject(error)
          }
        )
      })
    },
    [actionTypes.UPDATE]: ({state, commit, dispatch}, payload) => {
      commit(mutationTypes.START_LOADER, {name: name}, { root: true })
      return new Promise((resolve, reject) => {
        api.update(state.form.data(), payload.id).then(
          (response) => {
            commit(mutationTypes.STOP_LOADER, {name: name}, { root: true })
            commit(mutationTypes.UPDATE_ITEM, response.data.data)
            resolve(response)
          },
          (error) => {
            commit(mutationTypes.RECORD_ERRORS, error.response.data)
            getErrorHandler(commit, dispatch, name)(error)
            reject(error)
          }
        )
      })
    },
    [actionTypes.DELETE]: ({commit, dispatch}, payload) => {
      commit(mutationTypes.START_LOADER, {name: name}, { root: true })
      return new Promise((resolve, reject) => {
        api.delete(payload.id).then(
          (response) => {
            commit(mutationTypes.STOP_LOADER, {name: name}, { root: true })
            commit(mutationTypes.REMOVE_ITEM, payload.id)
            resolve(response)
          },
          (error) => {
            commit(mutationTypes.RECORD_ERRORS, error.response.data)
            getErrorHandler(commit, dispatch, name)(error)
            reject(error)
          }
        )
      })
    }
  }
}
