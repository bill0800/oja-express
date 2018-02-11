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
                <label for="display_name">Display Name</label>
                <input id="display_name" type="text" class="form-control"
                       name="display_name" v-model="displayName"/>
                <span class="text-danger" :class="{hidden: !fieldHasError('display_name')}">
                    {{fieldError('displa_name')}}
                </span>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" class="form-control"
                          name="description" v-model="desc">
                </textarea>
                <span class="text-danger" :class="{hidden: !fieldHasError('description')}">
                    {{fieldError('description')}}
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

  const {mapGetters, mapMutations} = createNamespacedHelpers('storePermissions')

  export default {
    name: 'app-permission-form',
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
      setStorePermission (permission) {
        this.name = permission.name
        this.displayName = permission.display_name
        this.desc = permission.description
      },
      submit () {
        if (this.anyError) {
          return
        }
        this.$emit('submitStorePermission')
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
      displayName: {
        get () {
          return this.getFormField('display_name')
        },
        set (value) {
          this.setFormField({field: 'display_name', value: value})
        }
      },
      desc: {
        get () {
          return this.getFormField('description')
        },
        set (value) {
          this.setFormField({field: 'description', value: value})
        }
      }
    },
    mounted () {
    }
  }
</script>

<style scoped>
    label {
        font-weight: bolder;
    }
</style>