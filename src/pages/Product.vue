<template>
    <div class="container px-lg-5 px-md-3 px-sm-1">
        <nav-pill-tabs>
            <tab title="Details" id="product-details" :active="true">
                <div class="row pb-1">
                    <span class="content-title"><i class="fa fa-shopping-basket mr-3"></i> Product </span>
                    <div class="d-flex ml-auto justify-content-around">
                        <router-link :to="{name: links.edit}" class="btn btn-success text-white">
                            <i class="fa fa-edit"></i> Edit
                        </router-link>
                    </div>
                </div>
                <div class="row w-100">
                    <div v-if="!product && !isLoading" class="m-auto">
                        <h3> Product with id: {{id}} not found</h3>
                    </div>
                    <div v-if="product" class="w-100">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <img :src="image" alt="Product Image" class="w-100" />
                                    </div>
                                    <div class="card-footer" style="display: inline-flex; overflow-x: scroll;">
                                        <img class="img-bordered-orange thumbnail mx-2" v-for="image in product.images.data"
                                             :src="image.image_url"
                                             @mouseenter="selectImage(image.image_url)"
                                             style="height: 100px; width: auto;"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h2>{{product.name}}</h2>
                                <span v-if="product.is_active">
                                    <span class="badge badge-success">Enabled</span>
                                </span>
                                <span v-if="!product.is_active">
                                    <span class="badge badge-danger">Disabled</span>
                                </span>
                                <h4>${{product.price | to2dp}} per {{product.unit_of_measure}}</h4>
                                <p>
                                    <span class="field">Tax charge</span>
                                    <span class="value">${{product.tax_charge | to2dp}}</span>
                                </p>
                                <p>
                                    <span class="field">Delivery charge</span>
                                    <span class="value">${{product.delivery_charge | to2dp}}</span>
                                </p>
                                <hr>
                                <span class="label label-primary"> Timing </span>
                                <p>
                                    <span class="field">Created at</span>
                                    <span class="value">{{product.created_at | readable_time}}</span>
                                </p>
                                <p>
                                    <span class="field">Updated at</span>
                                    <span class="value">{{product.updated_at | readable_time}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="row px-3 w-100">
                            <h3 class="w-100">Description</h3>
                            <br>
                            <p class="w-100">{{product.description}}</p>
                        </div>
                        <div class="row px-3">
                            <h3>Discounts</h3>

                        </div>
                        <div class="row px-3">
                            <h3>Reviews</h3>
                        </div>
                    </div>
                </div>
            </tab>
            <tab title="Discounts" id="product-discounts">
                <div class="row pb-1">
                    <span class="content-title"><i class="fa fa-shopping-basket mr-3"></i> Discounts </span>
                    <div class="d-flex ml-auto justify-content-around">
                        <a href="#" class="btn btn-success text-white" data-toggle="modal"
                           data-target="#createDiscount" @click="showCreateDiscountModal">
                            <i class="fa fa-plus"></i> Add New Discount
                        </a>
                    </div>
                </div>
                <div class="row w-100">
                    <div v-if="!product && !isLoading" class="m-auto">
                        <h3> Product with id: {{id}} not found</h3>
                    </div>
                    <div v-for="discount in discounts" class="card">
                        <div class="card-body">
                            {{discount.id}}
                            <a class="btn btn-primary" data-toggle="modal" data-target="#editDiscount"
                               @click="showEditDiscountModal(discount)">
                                <i class="fa fa-edit"></i> Edit
                            </a>
                        </div>
                    </div>
                </div>
            </tab>
        </nav-pill-tabs>
        <edit-discount></edit-discount>
        <create-discount></create-discount>
    </div>
</template>

<script>
  import EditDiscount from './modals/EditDiscount.vue'
  import CreateDiscount from './modals/CreateDiscount.vue'
  import NavPillTabs from '../components/NavPillTabs.vue'
  import Tab from '../components/Tab.vue'
  import { mapGetters, createNamespacedHelpers } from 'vuex'
  import * as getters from '../store/getter-types'
  import * as actions from '../store/action-types'
  import { EDIT_PRODUCT } from '../router/route-names'

  const productMap = createNamespacedHelpers('products')
  const discountMap = createNamespacedHelpers('discounts')

  export default {
    components: {NavPillTabs, Tab, CreateDiscount, EditDiscount},
    name: 'product-page',
    data () {
      return {
        links: {
          edit: EDIT_PRODUCT
        },
        selectedImage: null,
        selectedDiscount: null
      }
    },
    computed: {
      ...mapGetters({
        isLoading: getters.IS_LOADING
      }),
      ...discountMap.mapGetters({
        getDiscounts: getters.ALL
      }),
      ...productMap.mapGetters({
        getEntity: getters.ITEM
      }),
      discounts () {
        return this.getDiscounts(this.id)
      },
      id () {
        return this.$route.params.id
      },
      product () {
        return this.getEntity(this.id)
      },
      image () {
        if (this.selectedImage === null && this.product !== null && this.product.images.data.length > 0) {
          this.selectedImage = this.product.images.data[0].image_url
        }
        return this.selectedImage
      }
    },
    methods: {
      ...productMap.mapActions({
        load: actions.GET
      }),
      ...discountMap.mapActions({
        loadDiscounts: actions.FETCH
      }),
      showCreateDiscountModal () {
        this.createDiscountModal.setProduct({id: this.id})
      },
      showEditDiscountModal (discount) {
        this.selectedDiscount = discount
        this.editDiscountModal.setDiscount(discount)
      },
      selectImage (image) {
        this.selectedImage = image
      }
    },
    mounted () {
      this.load({id: this.id}).then(
        (response) => {}
      )
      this.loadDiscounts({_key: this.id}).then(
        (response) => {}
      )
      this.editDiscountModal = this.$children[this.$children.length - 2]
      this.createDiscountModal = this.$children[this.$children.length - 1]
    }
  }
</script>