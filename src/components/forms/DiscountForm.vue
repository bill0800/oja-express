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
                <label for="display_name">Display Name<span class="text-danger">*</span></label>
                <input id="display_name" type="text" class="form-control"
                       name="display_name" v-model="displayName" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('display_name')}">
                    {{fieldError('display_name')}}
                </span>
            </div>
            <div class="form-group">
                <label for="min_required_purchase">What's the minimum purchase user must make to qualify for this?</label>
                <input id="min_required_purchase" type="text" class="form-control"
                       name="min_required_purchase" v-model="minRequiredPurchase"/>
                <span class="text-danger" :class="{hidden: !fieldHasError('min_required_purchase')}">
                    {{fieldError('min_required_purchase')}}
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
                <label for="min_deduction">Minimum deduction</label>
                <input id="min_deduction" type="text" class="form-control"
                       name="min_deduction" v-model="minDeduction"/>
                <span class="text-danger" :class="{hidden: !fieldHasError('min_deduction')}">
                    {{fieldError('min_deduction')}}
                </span>
            </div>
            <div class="form-group">
                <input id="is_cumulative_by_count" type="checkbox" class="form-check-input"
                       name="is_cumulative_by_count" v-model="isForPurchaseCost" required/>
                <label for="is_cumulative_by_count" class="form-check-label">This discount adds up as number of items purchased increases?<span class="text-danger">*</span></label>
                <span class="text-danger" :class="{hidden: !fieldHasError('is_cumulative_by_count')}">
                    {{fieldError('is_cumulative_by_count')}}
                </span>
            </div>
            <div class="form-group">
                <input id="is_for_purchase_cost" type="checkbox" class="form-check-input"
                       name="is_for_purchase_cost" v-model="isForPurchaseCost" required/>
                <label for="is_for_purchase_cost" class="form-check-label">This discount is applicable to purchase cost?<span class="text-danger">*</span></label>
                <span class="text-danger" :class="{hidden: !fieldHasError('is_for_purchase_cost')}">
                    {{fieldError('is_for_purchase_cost')}}
                </span>
            </div>
            <div class="form-group">
                <input id="is_for_delivery_charges" type="checkbox" class="form-check-input"
                       name="is_for_delivery_charges" v-model="isForDeliveryCharges" required/>
                <label for="is_for_delivery_charges" class="form-check-label">This discount is applicable to delivery charges?<span class="text-danger">*</span></label>
                <span class="text-danger" :class="{hidden: !fieldHasError('is_for_delivery_charges')}">
                    {{fieldError('is_for_delivery_charges')}}
                </span>
            </div>
            <div class="form-group">
                <input id="is_for_tax_charges" type="checkbox" class="form-check-input"
                       name="is_for_tax_charges" v-model="isForTaxCharges" required/>
                <label for="is_for_tax_charges" class="form-check-label">This discount is applicable to tax charges?<span class="text-danger">*</span></label>
                <span class="text-danger" :class="{hidden: !fieldHasError('is_for_tax_charges')}">
                    {{fieldError('is_for_tax_charges')}}
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

  const {mapGetters, mapMutations} = createNamespacedHelpers('discounts')

  export default {
    name: 'discount-form',
    data () {
      return {
        product: null
      }
    },
    methods: {
      ...mapMutations({
        setFormField: mutations.SET_FORM_FIELD,
        clearErrors: mutations.CLEAR_ERRORS,
        recordErrors: mutations.RECORD_ERRORS,
        reset: mutations.RESET
      }),
      setDiscount (discount) {
        this.name = discount.name
        this.parent = discount.parent_id
      },
      submit () {
        if (this.anyError) {
          return
        }
        this.$emit('submitDiscount')
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
      percentageDeduction: {
        get () {
          return this.getFormField('percentage_deduction')
        },
        set (value) {
          this.setFormField({field: 'percentage_deduction', value: value})
        }
      },
      minDeduction: {
        get () {
          return this.getFormField('min_deduction')
        },
        set (value) {
          this.setFormField({field: 'min_deduction', value: value})
        }
      },
      minRequiredPurchase: {
        get () {
          return this.getFormField('min_required_purchase')
        },
        set (value) {
          this.setFormField({field: 'min_required_purchase', value: value})
        }
      },
      isCumByCount: {
        get () {
          return this.getFormField('is_cumulative_by_count')
        },
        set (value) {
          this.setFormField({field: 'is_cumulative_by_count', value: value})
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
      productId: {
        get () {
          return this.getFormField('product_id')
        },
        set (value) {
          this.setFormField({field: 'product_id', value: value})
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