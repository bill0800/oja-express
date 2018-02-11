<template>
    <div class="w-100">
        <div class="alert alert-danger fade show"
             :class="{gone: errorMsg === null}" role="alert">
            {{errorMsg}}
        </div>
        <form class="col-md-12" @submit.prevent="submit"
              @keydown="clearErrors($event.target.name)">
            <div class="form-group">
                <label for="email_subscription_id">Select Email List to subscribe user to<span class="text-danger">*</span></label>
                <select id="email_subscription_id" class="form-control" v-model="parent" name="email_subscription_id">
                    <option v-for="subscription in emailSubscriptions" :value="subscription.id">{{subscription.name}}</option>
                </select>
                <span class="text-danger" :class="{hidden: !fieldHasError('email_subscription_id')}">
                    {{fieldError('email_subscription_id')}}
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

  const {mapGetters, mapMutations} = createNamespacedHelpers('userEmailSubscriptions')
  const subscriptionMap = createNamespacedHelpers('emailSubscriptions')

  export default {
    name: 'user-email-subscription-form',
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
      setUserEmailSubscription (userEmailSubscription) {
        this.userId = userEmailSubscription.user_id
        this.emailSubscriptionId = userEmailSubscription.email_subscription_id
        this.isActive = userEmailSubscription.is_active
      },
      submit () {
        if (this.anyError) {
          return
        }
        this.$emit('submitUserEmailSubscription')
      }
    },
    computed: {
      ...mapGetters({
        getFormField: getters.GET_FORM_FIELD,
        errorMsg: getters.GET_ERROR_MSG,
        fieldHasError: getters.HAS_ERROR_IN_FIELD,
        anyError: getters.ANY_ERRORS,
        fieldError: getters.GET_ERROR_BY_FIELD
      }),
      ...subscriptionMap.mapGetters({
        emailSubscriptions: getters.ALL
      }),
      userId: {
        get () {
          return this.getFormField('user_id')
        },
        set (value) {
          this.setFormField({field: 'user_id', value: value})
        }
      },
      emailSubscriptionId: {
        get () {
          return this.getFormField('email_subscription_id')
        },
        set (value) {
          this.setFormField({field: 'email_subscription_id', value: value})
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