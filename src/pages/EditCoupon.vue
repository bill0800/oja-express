<template>
    <div class="container px-lg-5 px-md-3 px-sm-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-list mr-3"></i> Edit Coupon</span>
            <div class="d-flex ml-auto justify-content-around">
                <router-link :to="{name: links.all}" class="btn btn-success text-white">
                    <i class="fa fa-table"></i> View all
                </router-link>
            </div>

        </div>
        <div class="row">
            <div class="card w-100">
                <div class="card-body">
                    <div class="row justify-content-center">
                        <coupon-form @submitCoupon="submit"></coupon-form>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
  import CouponForm from '../components/forms/CouponForm.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as getters from '../store/getter-types'
  import * as actions from '../store/action-types'
  import { COUPONS, COUPON } from '../router/route-names'

  const {mapGetters, mapActions} = createNamespacedHelpers('coupons')

  export default {
    components: {CouponForm},
    name: 'edit-coupon',
    data () {
      return {
        form: null,
        links: {
          all: COUPONS
        }
      }
    },
    computed: {
      ...mapGetters({
        getEntity: getters.ITEM
      }),
      id () {
        return this.$route.params.id
      },
      coupon () {
        return this.getEntity(this.id)
      }
    },
    methods: {
      ...mapActions({
        load: actions.GET,
        update: actions.UPDATE
      }),
      onEntityLoaded (response) {
        this.form.setCoupon(response.data.data)
      },
      onEntityUpdated (response) {
        this.form.reset()
        this.$router.push({name: COUPON, params: {id: response.data.data.id}})
      },
      submit () {
        this.update({id: this.id}).then(this.onEntityUpdated.bind(this))
      }
    },
    mounted () {
      this.load({id: this.id}).then(this.onEntityLoaded.bind(this))
      this.form = this.$children[this.$children.length - 1]
    }
  }
</script>