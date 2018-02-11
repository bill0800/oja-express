<template>
    <div class="w-100">
        <div class="alert alert-danger fade show"
             :class="{gone: errorMsg === null}" role="alert">
            {{errorMsg}}
        </div>
        <form class="col-md-12" @submit.prevent="submit"
              @keydown="clearErrors($event.target.name)">
            <div class="form-group">
                <label>To which of your stores does this product belong ?</label>
                <div class="row col-md-12 mb-2">
                    <div v-for="localStore in storesPageData" class="store-item card col"
                         @click="selectStore(localStore)" :class="{active: store && store.id === localStore.id}">
                        <div class="card-body">
                            <img class="img-circle pull-left" :src="localStore | store_avatar"
                                 style="width:50px; height: 50px; display: inline-block">
                            <div>
                                <span class="d-inline-block font-weight-bold">{{localStore.name}}</span>
                                <p class="list-group-item-text">{{localStore.admin.email}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <pagination :hasMore="hasMoreStores" :list="stores"
                                :itemsPerPage="5" @noNext="nextStores">
                    </pagination>
                </div>
            </div>
            <div class="form-group">
                <label for="name">Name<span class="text-danger">*</span></label>
                <input id="name" type="text" class="form-control"
                       name="name" v-model="name" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('name')}">
                    {{fieldError('name')}}
                </span>
            </div>
            <div class="form-group">
                <label for="code">Code<span class="text-danger">*</span></label>
                <input id="code" type="text" class="form-control"
                       name="code" v-model="code" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('code')}">
                    {{fieldError('code')}}
                </span>
            </div>
            <div class="form-group">
                <label for="min_purchase_cost">What's the minimum purchase user must make to qualify for this?</label>
                <input id="min_purchase_cost" type="text" class="form-control"
                       name="min_purchase_cost" v-model="minPurchaseCost"/>
                <span class="text-danger" :class="{hidden: !fieldHasError('min_purchase_cost')}">
                    {{fieldError('min_purchase_cost')}}
                </span>
            </div>
            <div class="form-group">
                <label for="percentage_deduction">Percentage Deduction to apply on goods cost</label>
                <input id="percentage_deduction" type="text" class="form-control"
                       name="percentage_deduction" v-model="percentageDeduction"/>
                <span class="text-danger" :class="{hidden: !fieldHasError('percentage_deduction')}">
                    {{fieldError('percentage_deduction')}}
                </span>
            </div>
            <div class="form-group">
                <label for="max_cost_deduction">Maximum cost deduction allowed</label>
                <input id="max_cost_deduction" type="text" class="form-control"
                       name="max_cost_deduction" v-model="maxCostDeduction"/>
                <span class="text-danger" :class="{hidden: !fieldHasError('max_cost_deduction')}">
                    {{fieldError('max_cost_deduction')}}
                </span>
            </div>
            <div class="form-group">
                <label for="min_cost_deduction">Minimum cost deduction</label>
                <input id="min_cost_deduction" type="text" class="form-control"
                       name="min_cost_deduction" v-model="minCostDeduction"/>
                <span class="text-danger" :class="{hidden: !fieldHasError('min_cost_deduction')}">
                    {{fieldError('min_cost_deduction')}}
                </span>
            </div>
            <div class="form-group">
                <input id="is_for_purchase_cost" type="checkbox" class="form-check-input"
                       name="is_for_purchase_cost" v-model="isForPurchaseCost" required/>
                <label for="is_for_purchase_cost" class="form-check-label">This coupon is applicable to purchase cost?<span class="text-danger">*</span></label>
                <span class="text-danger" :class="{hidden: !fieldHasError('is_for_purchase_cost')}">
                    {{fieldError('is_for_purchase_cost')}}
                </span>
            </div>
            <div class="form-group">
                <input id="is_for_delivery_charges" type="checkbox" class="form-check-input"
                       name="is_for_delivery_charges" v-model="isForDeliveryCharges" required/>
                <label for="is_for_delivery_charges" class="form-check-label">This coupon is applicable to delivery charges?<span class="text-danger">*</span></label>
                <span class="text-danger" :class="{hidden: !fieldHasError('is_for_delivery_charges')}">
                    {{fieldError('is_for_delivery_charges')}}
                </span>
            </div>
            <div class="form-group">
                <input id="is_for_tax_charges" type="checkbox" class="form-check-input"
                       name="is_for_tax_charges" v-model="isForTaxCharges" required/>
                <label for="is_for_tax_charges" class="form-check-label">This coupon is applicable to tax charges?<span class="text-danger">*</span></label>
                <span class="text-danger" :class="{hidden: !fieldHasError('is_for_tax_charges')}">
                    {{fieldError('is_for_tax_charges')}}
                </span>
            </div>
            <div class="form-group">
                <label for="expires_at">Expiry Datetime<span class="text-danger">*</span></label>
                <input id="expires_at" type="datetime-local" class="form-control"
                       name="expires_at" v-model="expiresAt" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('expires_at')}">
                    {{fieldError('expires_at')}}
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
  import * as actions from '../../store/action-types'
  import * as mutations from '../../store/mutation-types'

  const {mapGetters, mapMutations} = createNamespacedHelpers('coupons')
  const storeMaps = createNamespacedHelpers('stores')

  export default {
    name: 'coupon-form',
    data () {
      return {
        storesPagination: null,
        store: null
      }
    },
    methods: {
      ...mapMutations({
        setFormField: mutations.SET_FORM_FIELD,
        clearErrors: mutations.CLEAR_ERRORS,
        recordErrors: mutations.RECORD_ERRORS,
        reset: mutations.RESET
      }),
      ...storeMaps.mapActions({
        nextStores: actions.FETCH_NEXT
      }),
      selectStore (store) {
        this.store = store
        this.setFormField({field: 'store_id', value: store.id})
        this.clearErrors('store_id')
      },
      setCoupon (coupon) {
        this.name = coupon.name
        this.parent = coupon.parent_id
      },
      submit () {
        if (this.anyError) {
          return
        }
        this.$emit('submitCoupon')
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
      ...storeMaps.mapGetters({
        stores: getters.ALL,
        storesPaginationData: getters.PAGINATION
      }),
      storesPageData () {
        return (this.storesPagination) ? this.storesPagination.pageData : []
      },
      hasMoreStores () {
        return this.storesPaginationData.hasOwnProperty('links') && this.storesPaginationData.links.hasOwnProperty('next')
      },
      name: {
        get () {
          return this.getFormField('name')
        },
        set (value) {
          this.setFormField({field: 'name', value: value})
        }
      },
      code: {
        get () {
          return this.getFormField('code')
        },
        set (value) {
          this.setFormField({field: 'code', value: value})
        }
      },
      minPurchaseCost: {
        get () {
          return this.getFormField('min_purchase_cost')
        },
        set (value) {
          this.setFormField({field: 'min_purchase_cost', value: value})
        }
      },
      percentageDeduction: {
        get () {
          return this.getFormField('percentage_deduction')
        },
        set (value) {
          this.setFormField({field: 'percentage_deduction', value: value})
        }
      },
      maxCostDeduction: {
        get () {
          return this.getFormField('max_cost_deduction')
        },
        set (value) {
          this.setFormField({field: 'max_cost_deduction', value: value})
        }
      },
      isForPurchaseCost: {
        get () {
          return this.getFormField('is_for_purchase_cost')
        },
        set (value) {
          this.setFormField({field: 'is_for_purchase_cost', value: value})
        }
      },
      isForDeliveryCharges: {
        get () {
          return this.getFormField('is_for_delivery_charges')
        },
        set (value) {
          this.setFormField({field: 'is_for_delivery_charges', value: value})
        }
      },
      isForTaxCharges: {
        get () {
          return this.getFormField('is_for_tax_charges')
        },
        set (value) {
          this.setFormField({field: 'is_for_tax_charges', value: value})
        }
      },
      expiresAt: {
        get () {
          return this.getFormField('expires_at')
        },
        set (value) {
          this.setFormField({field: 'expires_at', value: value})
        }
      },
      storeId: {
        get () {
          return this.getFormField('store_id')
        },
        set (value) {
          this.setFormField({field: 'store_id', value: value})
        }
      }
    },
    mounted () {
      this.storesPagination = this.$children[0]
    }
  }
</script>

<style scoped>
    label {
        font-weight: bolder;
    }
    .store-item.active {
        background-color: #cad8d9 !important;
        border: 3px solid darkgreen;
        color: black
    }
</style>