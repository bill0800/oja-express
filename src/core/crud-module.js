import {formGetters, formMutations} from './form-method-gen'
import {dictGetters, dictMutations} from './dict'
import repository from './repository'
import relationship from './relationship'

class CrudModule {
  constructor (name, form, api, groupKey) {
    this.name = name
    this.form = form
    this.formGetters = formGetters()
    this.formMutations = formMutations()
    this.dictGetters = dictGetters(groupKey)
    this.dictMutations = dictMutations(groupKey)
    let config = {api: api, name: name}
    if (groupKey) {
      config.groupKey = groupKey
    }
    this.repoActions = repository(config)
    this.relationshipActions = {}
    if (api.hasOwnProperty('attach')) {
      this.relationshipActions = relationship(api)
    }
  }

  state () {
    return {
      repository: {
        all: {},
        pagination: {}
      },
      form: this.form
    }
  }

  getters () {
    return {
      ...this.dictGetters,
      ...this.formGetters
    }
  }

  mutations () {
    return {
      ...this.dictMutations,
      ...this.formMutations
    }
  }

  actions () {
    return {
      ...this.repoActions,
      ...this.relationshipActions
    }
  }
}

export default CrudModule
