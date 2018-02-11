import * as getterTypes from '../store/getter-types'
import * as mutationTypes from '../store/mutation-types'

export let dictGetters = function (groupKey) {
  if (groupKey) {
    return {
      [getterTypes.ALL]: (state) => {
        return (key) => {
          if (!state.repository.all[key]) {
            return []
          }
          return Object.values(state.repository.all[key]).sort((item1, item2) => item2._position < item1._position)
        }
      },
      [getterTypes.COUNT]: (state) => (key) => (state.repository.all[key]) ? Object.values(state.repository.all[key]).length : 0,
      [getterTypes.ITEM]: (state) => (key, id) => state.repository.all[key][id],
      [getterTypes.ITEMS_BY_STORE]: (state) =>
        (key, storeId) => (state.repository.all[key]) ? Object.values(state.repository.all[key])
          .filter(item => item.store.id === storeId) : [],
      [getterTypes.PAGINATION]: (state) => (key) => (state.repository.pagination[key]) ? state.repository.pagination[key] : {}
    }
  }
  return {
    [getterTypes.ALL]: (state) => Object.values(state.repository.all).sort((item1, item2) => { return item2._position < item1._position }),
    [getterTypes.COUNT]: (state) => Object.values(state.repository.all).length,
    [getterTypes.ITEM]: (state) => (id) => state.repository.all[id],
    [getterTypes.ITEMS_BY_STORE]: (state) =>
      (storeId) => Object.values(state.repository.all)
        .filter(item => item.store.id === storeId),
    [getterTypes.PAGINATION]: (state) => state.repository.pagination
  }
}

function toDict (all, startPosition) {
  let items = {}
  let item
  let position = startPosition
  for (let key in all) {
    item = all[key]
    item._position = position++
    items[item.id] = item
  }
  return items
}

export let dictMutations = function (groupKey) {
  if (groupKey) {
    return {
      [mutationTypes.SET_PAGINATION]: (state, {pagination, key}) => { state.repository.pagination[key] = pagination },
      [mutationTypes.SET_ALL]: (state, {all, key}) => {
        let items = toDict(all, 0)
        let groupedItems = {}
        groupedItems[key] = items
        state.repository.all = {...groupedItems}
      },
      [mutationTypes.ADD_ITEM]: (state, {item, key}) => {
        let startPosition = (state.repository.all[key]) ? Object.keys(state.repository.all[key]).length : 0
        let newEntry = toDict([item], startPosition)
        let groupedItems = {}
        groupedItems[key] = newEntry
        state.repository.all = {...state.repository.all, ...groupedItems}
      },
      [mutationTypes.ADD_MANY_ITEMS]: (state, {all, key}) => {
        let startPosition = (state.repository.all[key]) ? Object.keys(state.repository.all[key]).length : 0
        let items = toDict(all, startPosition)
        let groupedItems = {}
        groupedItems[key] = items
        state.repository.all = {...state.repository.all, ...groupedItems}
      },
      [mutationTypes.REMOVE_ITEM]: (state, {id, key}) => {
        let remnant = {...state.repository.all}
        delete remnant[key][id]
        state.repository.all = {...remnant}
      },
      [mutationTypes.UPDATE_ITEM]: (state, {item, key}) => {
        let update = {}
        update[key] = state.repository.all[key]
        update[key][item.id] = item
        state.repository.all = {...state.repository.all, ...update}
      }
    }
  }
  return {
    [mutationTypes.SET_PAGINATION]: (state, pagination) => { state.repository.pagination = pagination },
    [mutationTypes.SET_ALL]: (state, all) => {
      let items = toDict(all, 0)
      state.repository.all = {...items}
    },
    [mutationTypes.ADD_ITEM]: (state, item) => {
      let newEntry = toDict([item], Object.keys(state.repository.all).length)
      state.repository.all = {...state.repository.all, ...newEntry}
    },
    [mutationTypes.ADD_MANY_ITEMS]: (state, listOfItems) => {
      let items = toDict(listOfItems, Object.keys(state.repository.all).length)
      state.repository.all = {...state.repository.all, ...items}
    },
    [mutationTypes.REMOVE_ITEM]: (state, id) => {
      let remnant = {...state.repository.all}
      delete remnant[id]
      state.repository.all = {...remnant}
    },
    [mutationTypes.UPDATE_ITEM]: (state, item) => {
      let update = {}
      update[item.id] = item
      state.repository.all = {...state.repository.all, ...update}
    }
  }
}
