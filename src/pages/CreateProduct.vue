<template>
    <div class="container px-lg-5 px-md-3 px-sm-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-shopping-basket mr-3"></i> Create Product</span>
            <div class="d-flex ml-auto justify-content-around">
                <router-link :to="{name: links.all}" class="btn btn-success text-white">
                    <i class="fa fa-table"></i> View all
                </router-link>
            </div>

        </div>
        <div class="row col-md-12">
            <div class="card w-100">
                <div class="card-body">
                    <div class="row justify-content-center">
                        <product-form @submitProduct="submit"></product-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import ProductForm from '../components/forms/ProductForm.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as actions from '../store/action-types'
  import {PRODUCT, PRODUCTS} from '../router/route-names'

  const {mapActions} = createNamespacedHelpers('products')

  export default {
    name: 'create-product-page',
    components: {ProductForm},
    data () {
      return {
        links: {
          all: PRODUCTS
        }
      }
    },
    methods: {
      ...mapActions({
        create: actions.CREATE
      }),
      redirect (response) {
        this.form.reset()
        this.$router.replace({name: PRODUCT, params: {id: response.data.data.id}})
      },
      submit () {
        this.create().then(this.redirect.bind(this))
      }
    },
    mounted () {
      this.form = this.$children[this.$children.length - 1]
    }
  }
</script>

<style scoped>
</style>