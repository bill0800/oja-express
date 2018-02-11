export default class {
  constructor (fieldValueObject) {
    this.properties = fieldValueObject
    for (let field in fieldValueObject) {
      this[field] = fieldValueObject[field]
    }
    this.errors = {}
    this.errorMsg = null
  }
  data () {
    let data = {}
    for (let field in this.properties) {
      data[field] = this[field]
    }
    return data
  }

  hasError (field) {
    return this.errors.hasOwnProperty(field)
  }

  anyError () {
    return Object.keys(this.errors).length > 0
  }

  getErrorMsg () {
    return this.errorMsg
  }

  getError (field) {
    if (!this.errors.hasOwnProperty(field)) {
      return null
    }
    return this.errors[field][0]
  }

  recordErrors (data) {
    if (data.hasOwnProperty('message')) {
      this.errorMsg = data.message
    }
    if (typeof data.errors === 'object') {
      this.errors = {...data.errors}
    }
  }

  clearErrors (field) {
    if (field) {
      let errors = {...this.errors}
      delete errors[field]
      this.errors = {...errors}
      return
    }
    this.errors = {}
  }

  reset () {
    for (let field in this.properties) {
      this[field] = this.properties[field]
    }
  }
}
