<template>
    <div class="container px-lg-5 px-md-3 px-sm-1">
        <nav-pill-tabs>
            <tab title="Details" id="order-details" :active="true">
                <div class="row pb-1">
                    <span class="content-title"><i class="fa fa-list mr-3"></i> Order </span>
                    <div class="d-flex ml-auto justify-content-around">
                        <router-link :to="{name: links.all}" class="btn btn-success text-white">
                            <i class="fa fa-edit"></i> View All
                        </router-link>
                    </div>
                </div>
                <div class="row w-100">
                    <div v-if="!order && !isLoading" class="m-auto">
                        <h3> Order with id: {{id}} not found</h3>
                    </div>
                    <div v-if="order" class="w-100">
                        <div class="row justify-content-around px-3">
                            <div class="card col-md-3">
                                <span class="text-center mt-3">
                                    <i class="fa fa-3x fa-shopping-cart"></i>
                                </span>
                                <div class="card-body">
                                    <span class="field">Order ID:</span>
                                    <p>{{order.id}}</p>
                                    <span class="field">Time</span>
                                    <p>{{order.created_at | readable_time}}</p>
                                    <p class="text-sm-right">{{order.created_at | rel_time}}</p>
                                </div>
                            </div>
                            <div class="card col-md-3">
                                <div class="text-center mt-3">
                                    <img class="w-50" :src="{first_name: order.user_first_name, last_name: order.user_last_name, avatar: order.user_avatar} | user_avatar" alt="Card image cap">
                                </div>
                                <div class="card-body">
                                    <h5 class="field">{{order.user_first_name}}</h5>
                                    <p>{{order.user_email}}</p>
                                </div>
                            </div>
                            <div class="card col-md-3">
                                <span class="text-center mt-3">
                                        <i class="fa fa-3x fa-location-arrow"></i>
                                    </span>
                                <div class="card-body">
                                    <span class="value d-inline-block my-2"><i class="fa fa-university"></i></span>
                                    <p>{{order.delivery_street_address}}, {{order.delivery_address__zip_code}}</p>
                                    <span class="value d-inline-block"><i class="fa fa-phone"></i></span>
                                    <p>{{order.delivery_address_phone_number}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="card mt-5">
                            <div class="card-header">
                                <div class="font-weight-bold">Cart Items</div>
                            </div>
                            <div class="card-body">
                                <div v-if="order.cartItems && order.cartItems.data.length > 0" class="row">
                                    <table class="table table-md-responsive table-striped">
                                        <thead>
                                        <tr class="field">
                                            <td scope="col">Image</td>
                                            <td scope="col">Description</td>
                                            <td scope="col">Quantity</td>
                                            <td scope="col">Unit Price</td>
                                            <td scope="col">Total Price</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="cartItem in order.cartItems.data">
                                            <td scope="row">
                                                <img :src="cartItem.product.data.image_url" width="64" class="product-img img-thumbnail"/>
                                            </td>
                                            <td scope="row">{{cartItem.product.data.name}}</td>
                                            <td scope="row">{{cartItem.count}}</td>
                                            <td scope="row">${{cartItem.product.data.price | to2dp}}</td>
                                            <td scope="row">${{cartItem.product.data.price * cartItem.count | to2dp}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div class="pull-right">
                                        <h3>Total: {{order.grand_net_cost | to2dp}}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </tab>
            <tab title="Deliveries" id="order-deliveries">
                <div class="row pb-1">
                    <span class="content-title"><i class="fa fa-list mr-3"></i> Order </span>
                    <div class="d-flex ml-auto justify-content-around">
                        <a href="#" class="btn btn-success text-white" data-toggle="modal"
                           data-target="#createDelivery" @click="showCreateDeliveryModal">
                            <i class="fa fa-plus"></i> Create New Delivery
                        </a>
                    </div>
                </div>
                <div class="row w-100">
                    <div v-if="!order && !isLoading" class="m-auto">
                        <h3> Order with id: {{id}} not found</h3>
                    </div>
                    <div class="card" v-for="delivery in deliveries">
                        <div class="card-body">
                            {{delivery.id}}
                            <a class="btn btn-primary" data-toggle="modal" data-target="#editDelivery"
                               @click="showEditDeliveryModal(delivery)">
                                <i class="fa fa-edit"></i> Edit
                            </a>
                        </div>
                    </div>
                </div>
            </tab>
            <tab :class="{disabled: !selectedDelivery}" title="Delivery Transitions" id="order-delivery-transitions">
                <div class="row pb-1">
                    <span class="content-title"><i class="fa fa-list mr-3"></i> Order </span>
                    <div class="d-flex ml-auto justify-content-around">
                        <a href="#" class="btn btn-success text-white" data-toggle="modal"
                           data-target="#createDeliveryTransition" @click="showCreateDeliveryTransitionModal">
                            <i class="fa fa-plus"></i> Create New Delivery Transition
                        </a>
                    </div>
                </div>
                <div class="row w-100">
                    <div v-if="!order && !isLoading" class="m-auto">
                        <h3> Order with id: {{id}} not found</h3>
                    </div>
                    <div class="card" v-for="transition in transitions">
                        <div class="card-body">
                            {{transition.id}}
                            <a class="btn btn-primary" data-toggle="modal" data-target="#editDeliveryTransition"
                               @click="showEditDeliveryTransitionModal(transition)">
                                <i class="fa fa-edit"></i> Edit
                            </a>
                        </div>
                    </div>
                </div>
            </tab>
        </nav-pill-tabs>

        <edit-delivery-transition></edit-delivery-transition>
        <create-delivery-transition></create-delivery-transition>
        <edit-delivery></edit-delivery>
        <create-delivery></create-delivery>
    </div>
</template>

<script>
  import CreateDelivery from './modals/CreateDelivery.vue'
  import EditDelivery from './modals/EditDelivery.vue'
  import CreateDeliveryTransition from './modals/CreateDeliveryTransition.vue'
  import EditDeliveryTransition from './modals/EditDeliveryTransition.vue'
  import NavPillTabs from '../components/NavPillTabs.vue'
  import Tab from '../components/Tab.vue'
  import DeliveryForm from '../components/forms/DeliveryForm.vue'
  import DeliveryTransitionForm from '../components/forms/DeliveryTransitionForm.vue'
  import { mapGetters, createNamespacedHelpers } from 'vuex'
  import * as getters from '../store/getter-types'
  import * as actions from '../store/action-types'
  import { ORDERS } from '../router/route-names'

  const orderMap = createNamespacedHelpers('orders')
  const deliveryMap = createNamespacedHelpers('deliveries')
  const deliveryTransitionMap = createNamespacedHelpers('deliveryTransition')

  export default {
    name: 'order-page',
    components: {
      CreateDelivery,
      EditDelivery,
      CreateDeliveryTransition,
      EditDeliveryTransition,
      DeliveryForm,
      DeliveryTransitionForm,
      NavPillTabs,
      Tab
    },
    data () {
      return {
        links: {
          all: ORDERS
        },
        selectedDelivery: null,
        selectedDeliveryTransition: null
      }
    },
    computed: {
      ...mapGetters({
        isLoading: getters.IS_LOADING
      }),
      ...orderMap.mapGetters({
        getEntity: getters.ITEM
      }),
      ...deliveryMap.mapGetters({
        getDeliveries: getters.ALL
      }),
      ...deliveryTransitionMap.mapGetters({
        getDeliveryTransitions: getters.ALL
      }),
      deliveries () {
        return this.getDeliveries(this.id)
      },
      transitions () {
        if (!this.selectedDelivery) {
          return []
        }
        return this.getDeliveryTransitions(this.selectedDelivery.id)
      },
      id () {
        return this.$route.params.id
      },
      order () {
        return this.getEntity(this.id)
      }
    },
    methods: {
      ...orderMap.mapActions({
        load: actions.GET
      }),
      ...deliveryMap.mapActions({
        loadDeliveries: actions.FETCH
      }),
      ...deliveryTransitionMap.mapActions({
        loadTransitions: actions.FETCH
      }),
      selectDelivery (delivery) {
        this.selectedDelivery = delivery
        this.loadTransitions({_key: this.id}).then(
          (response) => {}
        )
      },
      showCreateDeliveryModal () {
        this.createDeliveryModal.setOrder(this.order)
      },
      showEditDeliveryModal (delivery) {
        this.selectDelivery(delivery)
        this.editDeliveryModal.setDelivery(delivery)
      },
      showCreateDeliveryTransitionModal () {
        if (!this.selectedDelivery) {
          return
        }
        this.createDeliveryTransitionModal.setDelivery(this.selectedDelivery)
      },
      showEditDeliveryTransitionModal (transition) {
        this.selectedDeliveryTransition = transition
        this.editDeliveryTransitionModal.setDeliveryTransition(transition)
      }
    },
    mounted () {
      this.load({id: this.id}).then(
        (response) => {}
      )
      this.loadDeliveries({_key: this.id}).then(
        (response) => {}
      )
      this.editDeliveryTransitionModal = this.$children[this.$children.length - 4]
      this.createDeliveryTransitionModal = this.$children[this.$children.length - 3]
      this.editDeliveryModal = this.$children[this.$children.length - 2]
      this.createDeliveryModal = this.$children[this.$children.length - 1]
    }
  }
</script>