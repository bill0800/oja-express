import * as getterTypes from '../store/getter-types'
import * as mutationTypes from '../store/mutation-types'

export let formGetters = function () {
  return {
    [getterTypes.HAS_ERROR_IN_FIELD]: (state) => (field) => state.form.hasError(field),
    [getterTypes.ANY_ERRORS]: state => state.form.anyError(),
    [getterTypes.GET_ERROR_MSG]: state => state.form.getErrorMsg(),
    [getterTypes.GET_ERROR_BY_FIELD]: (state) => (field) => state.form.getError(field),
    [getterTypes.GET_FORM_FIELD]: (state) => (field) => state.form[field],
    [getterTypes.GET_FORM]: (state) => (field) => state.form
  }
}

export let formMutations = function () {
  return {
    [mutationTypes.RECORD_ERRORS]: (state, data) => { state.form.recordErrors(data) },
    [mutationTypes.CLEAR_ERRORS]: (state, field) => { state.form.clearErrors(field) },
    [mutationTypes.RESET]: (state) => { state.form.reset() },
    [mutationTypes.SET_FORM_FIELD]: (state, {field, value}) => { state.form[field] = value }
  }
}
