<template>
    <div class="w-100">
        <div class="alert alert-danger fade show"
             :class="{gone: errorMsg === null}" role="alert">
            {{errorMsg}}
        </div>
        <form class="col-md-12" @submit.prevent="submit"
              @keydown="clearErrors($event.target.name)">
            <div class="form-group">
                <label for="display_name">Display Name<span class="text-danger">*</span></label>
                <input id="display_name" type="text" class="form-control"
                       name="display_name" v-model="displayName" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('display_name')}">
                    {{fieldError('display_name')}}
                </span>
            </div>
            <div class="form-group">
                <label for="days_from_order">How many days from the order day is this delivery schedule?<span class="text-danger">*</span></label>
                <input id="days_from_order" type="text" class="form-control"
                       name="days_from_order" v-model="daysFromOrder" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('days_from_order')}">
                    {{fieldError('days_from_order')}}
                </span>
            </div>
            <div class="form-group">
                <label for="lower_bound_time">Schedule Start Time<span class="text-danger">*</span></label>
                <input id="lower_bound_time" type="text" class="form-control" placeholder="HH:MM"
                       name="lower_bound_time" v-model="lowerBoundTime" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('lower_bound_time')}">
                    {{fieldError('lower_bound_time')}}
                </span>
            </div>
            <div class="form-group">
                <label for="upper_bound_time">Schedule End Time<span class="text-danger">*</span></label>
                <input id="upper_bound_time" type="text" class="form-control" placeholder="HH:MM"
                       name="upper_bound_time" v-model="upperBoundTime" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('upper_bound_time')}">
                    {{fieldError('upper_bound_time')}}
                </span>
            </div>
            <div class="form-group">
                <label for="specific_delivery_day">Specific Day this schedule is for<span class="text-danger">*</span></label>
                <select id="specific_delivery_day" class="form-control"
                        name="specific_delivery_day" v-model="specificDeliveryDay">
                    <option v-for="day in days" :value="day">{{day}}</option>
                </select>
                <span class="text-danger" :class="{hidden: !fieldHasError('specific_delivery_day')}">
                    {{fieldError('specific_delivery_day')}}
                </span>
            </div>
            <div class="form-group">
                <label for="specific_no_delivery_day">Specific Day this schedule isn't available<span class="text-danger">*</span></label>
                <select id="specific_no_delivery_day" class="form-control"
                        name="specific_no_delivery_day" v-model="specificNoDeliveryDay">
                    <option v-for="day in days" :value="day">{{day}}</option>
                </select>
                <span class="text-danger" :class="{hidden: !fieldHasError('specific_no_delivery_day')}">
                    {{fieldError('specific_no_delivery_day')}}
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

  const {mapGetters, mapMutations} = createNamespacedHelpers('storeSchedules')

  export default {
    name: 'store-schedule-form',
    data () {
      return {
        days: [
          'Sunday', 'Monday', 'Tuesday',
          'Wednesday', 'Thursday', 'Friday',
          'Saturday'
        ]
      }
    },
    methods: {
      ...mapMutations({
        setFormField: mutations.SET_FORM_FIELD,
        clearErrors: mutations.CLEAR_ERRORS,
        recordErrors: mutations.RECORD_ERRORS,
        reset: mutations.RESET
      }),
      setSchedule (schedule) {
        this.storeId = schedule.store_id
        this.displayName = schedule.display_name
        this.daysFromOrder = schedule.days_from_order
        this.lowerBoundTime = schedule.lower_bound_time
        this.upperBoundTime = schedule.upper_bound_time
        this.specificDeliveryDay = schedule.specific_delivery_day
        this.specificNoDeliveryDay = schedule.specific_no_delivery_day
      },
      submit () {
        if (this.anyError) {
          return
        }
        this.$emit('submitStoreSchedule')
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
      storeId: {
        get () {
          return this.getFormField('store_id')
        },
        set (value) {
          this.setFormField({field: 'store_id', value: value})
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
      daysFromOrder: {
        get () {
          return this.getFormField('days_from_order')
        },
        set (value) {
          this.setFormField({field: 'days_from_order', value: value})
        }
      },
      lowerBoundTime: {
        get () {
          return this.getFormField('lower_bound_time')
        },
        set (value) {
          this.setFormField({field: 'lower_bound_time', value: value})
        }
      },
      upperBoundTime: {
        get () {
          return this.getFormField('upper_bound_time')
        },
        set (value) {
          this.setFormField({field: 'upper_bound_time', value: value})
        }
      },
      specificDeliveryDay: {
        get () {
          return this.getFormField('specific_delivery_day')
        },
        set (value) {
          this.setFormField({field: 'specific_delivery_day', value: value})
        }
      },
      specificNoDeliveryDay: {
        get () {
          return this.getFormField('specific_no_delivery_day')
        },
        set (value) {
          this.setFormField({field: 'specific_no_delivery_day', value: value})
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