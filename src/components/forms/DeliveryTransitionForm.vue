<template>
    <div class="w-100">
        <div class="alert alert-danger fade show"
             :class="{gone: errorMsg === null}" role="alert">
            {{errorMsg}}
        </div>
        <form class="col-md-12" @submit.prevent="submit"
              @keydown="clearErrors($event.target.name)">
            <div class="form-group">
                <label for="departed_at">Departure Time<span class="text-danger">*</span></label>
                <input id="departed_at" type="text" class="form-control"
                       name="departed_at" v-model="departedAt" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('departed_at')}">
                    {{fieldError('departed_at')}}
                </span>
            </div>
            <div class="form-group">
                <label>From</label>
                <div class="row col-md-12 mb-2">
                    <div v-for="stopPoint in stopPointsPageData" class="list-group-item card col"
                         @click="selectDepartureStopPoint(stopPoint)" :class="{active: departureStopPoint && departureStopPoint.id === stopPoint.id}">
                        <div class="card-body">
                            <span class="d-inline-block font-weight-bold">{{stopPoint.street_address}}</span>
                            <span class="d-inline-block">{{stopPoint.locality}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <pagination :hasMore="hasMoreStopPoints" :list="stopPoints"
                            :itemsPerPage="5" @noNext="nextStopPoints">
                </pagination>
            </div>
            <div class="form-group">
                <label for="arrived_at">Arrival Time<span class="text-danger">*</span></label>
                <input id="arrived_at" type="text" class="form-control"
                       name="arrived_at" v-model="arrivedAt" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('arrived_at')}">
                    {{fieldError('arrived_at')}}
                </span>
            </div>
            <div class="form-group">
                <label>From</label>
                <div class="row col-md-12 mb-2">
                    <div v-for="stopPoint in stopPointsPageData" class="list-group-item card col"
                         @click="selectArrivalStopPoint(stopPoint)" :class="{active: arrivalStopPoint && arrivalStopPoint.id === stopPoint.id}">
                        <div class="card-body">
                            <span class="d-inline-block font-weight-bold">{{stopPoint.street_address}}</span>
                            <span class="d-inline-block">{{stopPoint.locality}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <pagination :hasMore="hasMoreStopPoints" :list="stopPoints"
                            :itemsPerPage="5" @noNext="nextStopPoints">
                </pagination>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-block btn-success" :class="{disabled: anyError}">Save</button>
            </div>
        </form>
    </div>

</template>

<script>
  import Pagination from '../../components/Pagination.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as getters from '../../store/getter-types'
  import * as mutations from '../../store/mutation-types'
  import * as actions from '../../store/action-types'

  const {mapGetters, mapMutations} = createNamespacedHelpers('deliveryTransitions')
  const stopPointMap = createNamespacedHelpers('stopPoints')

  export default {
    name: 'delivery-transition-form',
    components: {Pagination},
    data () {
      return {
        departureStopPoint: null,
        arrivalStopPoint: null,
        stopPointsPagination: null
      }
    },
    methods: {
      ...mapMutations({
        setFormField: mutations.SET_FORM_FIELD,
        clearErrors: mutations.CLEAR_ERRORS,
        recordErrors: mutations.RECORD_ERRORS,
        reset: mutations.RESET
      }),
      ...stopPointMap.mapActions({
        fetchStopPoints: actions.FETCH,
        nextStopPoints: actions.FETCH_NEXT
      }),
      selectDepartureStopPoint (stopPoint) {
        this.departureStopPoint = stopPoint
        this.departureStopPointId = stopPoint.id
        this.clearErrors('departure_stop_point_id')
      },
      selectArrivalStopPoint (stopPoint) {
        this.arrivalStopPoint = stopPoint
        this.arrivalStopPointId = stopPoint.id
        this.clearErrors('arrival_stop_point_id')
      },
      setDeliveryTransition (transition) {
        this.deliveryId = transition.delivery_id
        this.departureStopPointId = transition.departure_stop_point_id
        this.departedAt = transition.departed_at
        this.arrivedAt = transition.arrived_at
        this.arrivalStopPointId = transition.arrival_stop_point_id
      },
      submit () {
        if (this.anyError) {
          return
        }
        this.$emit('submitDeliveryTransition')
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
      ...stopPointMap.mapGetters({
        stopPoints: getters.ALL,
        stopPointsPaginationData: getters.PAGINATION
      }),
      stopPointsPageData () {
        return (this.stopPointsPagination) ? this.stopPointsPagination.pageData : []
      },
      hasMoreStopPoints () {
        return this.stopPointsPaginationData.hasOwnProperty('links') && this.stopPointsPaginationData.links.hasOwnProperty('next')
      },
      deliveryId: {
        get () {
          return this.getFormField('delivery_id')
        },
        set (value) {
          this.setFormField({field: 'delivery_id', value: value})
        }
      },
      departureStopPointId: {
        get () {
          return this.getFormField('delivery_stop_point_id')
        },
        set (value) {
          this.setFormField({field: 'delivery_stop_point_id', value: value})
        }
      },
      arrivalStopPointId: {
        get () {
          return this.getFormField('arrival_stop_point_id')
        },
        set (value) {
          this.setFormField({field: 'arrival_stop_point_id', value: value})
        }
      },
      departedAt: {
        get () {
          return this.getFormField('departed_at')
        },
        set (value) {
          this.setFormField({field: 'departed_at', value: value})
        }
      },
      arrivedAt: {
        get () {
          return this.getFormField('arrived_at')
        },
        set (value) {
          this.setFormField({field: 'arrived_at', value: value})
        }
      }
    },
    created () {
      this.fetchStopPoints()
    },
    mounted () {
      this.stopPointsPagination = this.$children[this.$children.length - 1]
    }
  }
</script>

<style scoped>
    label {
        font-weight: bolder;
    }
</style>