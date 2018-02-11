<template>
    <div class="container px-lg-5 px-md-3 px-sm-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-list mr-3"></i> Edit Product</span>
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
  import * as getters from '../store/getter-types'
  import * as actions from '../store/action-types'
  import { PRODUCTS, PRODUCT } from '../router/route-names'

  const {mapGetters, mapActions} = createNamespacedHelpers('products')

  export default {
    components: {ProductForm},
    name: 'edit-product',
    data () {
      return {
        form: null,
        links: {
          all: PRODUCTS
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
      product () {
        return this.getEntity(this.id)
      }
    },
    methods: {
      ...mapActions({
        load: actions.GET,
        update: actions.UPDATE
      }),
      onEntityLoaded (response) {
        this.form.setEntity(response.data.data)
      },
      onEntityUpdated (response) {
        this.form.reset()
        this.$router.push({name: PRODUCT, params: {id: response.data.data.id}})
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