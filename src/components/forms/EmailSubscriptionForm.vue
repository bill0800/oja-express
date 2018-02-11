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
                <label for="slug">Slug<span class="text-danger">*</span></label>
                <input id="slug" type="text" class="form-control"
                       name="slug" v-model="slug" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('slug')}">
                    {{fieldError('slug')}}
                </span>
            </div>
            <div class="form-group">
                <label for="parent_id">Parent</label>
                <select id="parent_id" class="form-control" v-model="parent" name="parent_id">
                    <option v-for="subscription in subscriptions" :value="subscription.id">{{subscription.name}}</option>
                </select>
                <span class="text-danger" :class="{hidden: !fieldHasError('parent_id')}">
                    {{fieldError('parent_id')}}
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

  const {mapGetters, mapMutations} = createNamespacedHelpers('emailSubscriptions')

  export default {
    name: 'email-subscription-form',
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
      setEmailSubscription (subscription) {
        this.name = subscription.name
        this.slug = subscription.slug
        this.parent = subscription.parent_id
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
        subscriptions: getters.ALL
      }),
      name: {
        get () {
          return this.getFormField('name')
        },
        set (value) {
          this.setFormField({field: 'name', value: value})
        }
      },
      slug: {
        get () {
          return this.getFormField('slug')
        },
        set (value) {
          this.setFormField({field: 'slug', value: value})
        }
      },
      parent: {
        get () {
          return this.getFormField('parent_id')
        },
        set (value) {
          this.setFormField({field: 'parent_id', value: value})
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