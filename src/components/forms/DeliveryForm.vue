<template>
    <div class="w-100">
        <div class="alert alert-danger fade show"
             :class="{gone: errorMsg === null}" role="alert">
            {{errorMsg}}
        </div>
        <form class="col-md-12" @submit.prevent="submit"
              @keydown="clearErrors($event.target.name)">
            <div v-if="deliveryStopPoint" class="card">
                <div class="card-header">
                    <h3>Order Delivery Stop Point</h3>
                </div>
                <div class="card-body">
                    <div class="col-md-2">
                        <i class="fa fa-location"></i>
                    </div>
                    <div class="col-auto">
                        <span class="field">Street Address</span>
                        <span class="value">{{deliveryStopPoint.street_address}}</span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>Select store stop point to dispatch order from</label>
                <div class="row col-md-12 mb-2">
                    <div v-for="stopPoint in storeStopPointsPageData" class="list-group-item card col"
                         @click="selectStoreStopPoint(stopPoint)" :class="{active: selectedStoreStopPoint && selectedStoreStopPoint.id === stopPoint.id}">
                        <div class="card-body">
                            <span class="d-inline-block font-weight-bold">{{stopPoint.street_address}}</span>
                            <span class="d-inline-block">{{stopPoint.locality}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <pagination :hasMore="hasMoreStoreStopPoints" :list="storeStopPoints"
                            :itemsPerPage="5" @noNext="nextStopPoints">
                </pagination>
            </div>
            <div class="form-group">
                <label for="delivery_due_at">Delivery Due datetime</label>
                <textarea id="delivery_due_at" class="form-control"
                          name="delivery_due_at" v-model="deliveryDueAt">
                </textarea>
                <span class="text-danger" :class="{hidden: !fieldHasError('delivery_due_at')}">
                    {{fieldError('delivery_due_at')}}
                </span>
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

  const {mapGetters, mapMutations} = createNamespacedHelpers('deliveries')
  const stopPointMaps = createNamespacedHelpers('stopPoints')

  export default {
    name: 'delivery-form',
    components: {Pagination},
    data () {
      return {
        selectedStoreStopPoint: null,
        storeStopPointsPagination: null,
        deliveryStopPoint: null
      }
    },
    methods: {
      ...mapMutations({
        setFormField: mutations.SET_FORM_FIELD,
        clearErrors: mutations.CLEAR_ERRORS,
        recordErrors: mutations.RECORD_ERRORS,
        reset: mutations.RESET
      }),
      ...stopPointMaps.mapActions({
        fetchStopPoints: actions.FETCH,
        nextStopPoints: actions.FETCH_NEXT,
        loadStopPoint: actions.GET
      }),
      selectStoreStopPoint (stopPoint) {
        this.selectedStopPoint = stopPoint
        this.storeStopPointId = stopPoint.id
        this.clearErrors('store_stop_point_id')
      },
      setDelivery (delivery) {
        this.orderId = delivery.order_id
        this.storeStopPointId = delivery.store_stop_point_id
        this.deliveryAddressStopPointId = delivery.delivery_address_stop_point_id
        if (this.deliveryAddressStopPointId) {
          this.loadStopPoint({id: this.deliveryAddressStopPointId})
        }
        this.deliveryDueAt = delivery.delivery_due_at
      },
      submit () {
        if (this.anyError) {
          return
        }
        this.$emit('submitDelivery')
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
      ...stopPointMaps.mapGetters({
        storeStopPoints: getters.ALL,
        storeStopPointsPaginationData: getters.PAGINATION,
        getStopPoint: getters.ITEM
      }),
      storeStopPointsPageData () {
        return (this.storeStopPointsPagination) ? this.storeStopPointsPagination.pageData : []
      },
      hasMoreStoreStopPoints () {
        return this.storeStopPointsPaginationData.hasOwnProperty('links') &&
          this.storeStopPointsPaginationData.links.hasOwnProperty('next')
      },
      orderId: {
        get () {
          return this.getFormField('order_id')
        },
        set (value) {
          this.setFormField({field: 'order_id', value: value})
        }
      },
      storeStopPointId: {
        get () {
          return this.getFormField('store_stop_point_id')
        },
        set (value) {
          this.setFormField({field: 'store_stop_point_id', value: value})
        }
      },
      deliveryAddressStopPointId: {
        get () {
          return this.getFormField('delivery_stop_point_id')
        },
        set (value) {
          this.setFormField({field: 'delivery_stop_point_id', value: value})
        }
      },
      deliveryDueAt: {
        get () {
          return this.getFormField('delivery_due_at')
        },
        set (value) {
          this.setFormField({field: 'delivery_due_at', value: value})
        }
      }
    },
    created () {
      this.fetchStopPoints()
    },
    mounted () {
      this.storeStopPointsPagination = this.$children[this.$children.length - 1]
    }
  }
</script>

<style scoped>
    label {
        font-weight: bolder;
    }
</style>