<template>
    <div class="w-100">
        <div class="alert alert-danger fade show"
             :class="{gone: errorMsg === null}" role="alert">
            {{errorMsg}}
        </div>
        <form class="col-md-12" @submit.prevent="submit"
              @keydown="clearErrors($event.target.name)">
            <div class="form-group">
                <label for="name">Name<span class="text-danger">*</span></label>
                <input id="name" type="text" class="form-control"
                       name="name" v-model="name" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('name')}">
                    {{fieldError('name')}}
                </span>
            </div>
            <div class="form-group">
                <label for="category_id">Parent Category<span class="text-danger">*</span></label>
                <select id="category_id" class="form-control" v-model="parent" name="parent_category_id">
                    <option v-for="category in categories" :value="category.id">{{category.name}}</option>
                </select>
                <span class="text-danger" :class="{hidden: !fieldHasError('parent_category_id')}">
                    {{fieldError('parent_category_id')}}
                </span>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-block btn-success" :class="{disabled: anyError}">Save</button>
            </div>
        </form>
    </div>

</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import * as getters from '../../store/getter-types'
  import * as mutations from '../../store/mutation-types'
  import * as actions from '../../store/action-types'

  const {mapGetters, mapMutations, mapActions} = createNamespacedHelpers('categories')

  export default {
    name: 'category-form',
    data () {
      return {
      }
    },
    methods: {
      ...mapMutations({
        setFormField: mutations.SET_FORM_FIELD,
        clearErrors: mutations.CLEAR_ERRORS,
        recordErrors: mutations.RECORD_ERRORS,
        reset: mutations.RESET
      }),
      ...mapActions({
        loadCategories: actions.FETCH
      }),
      setCategory (category) {
        this.name = category.name
        this.parent = category.parent_id
      },
      submit () {
        if (this.anyError) {
          return
        }
        this.$emit('submitCategory')
      }
    },
    computed: {
      ...mapGetters({
        getFormField: getters.GET_FORM_FIELD,
        errorMsg: getters.GET_ERROR_MSG,
        fieldHasError: getters.HAS_ERROR_IN_FIELD,
        anyError: getters.ANY_ERRORS,
        fieldError: getters.GET_ERROR_BY_FIELD,
        categories: getters.ALL
      }),
      name: {
        get () {
          return this.getFormField('name')
        },
        set (value) {
          this.setFormField({field: 'name', value: value})
        }
      },
      parent: {
        get () {
          return this.getFormField('parent_category_id')
        },
        set (value) {
          this.setFormField({field: 'parent_category_id', value: value})
        }
      }
    },
    mounted () {
      this.loadCategories()
    }
  }
</script>

<style scoped>
    label {
        font-weight: bolder;
    }
</style>