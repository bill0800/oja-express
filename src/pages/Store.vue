<template>
    <div class="container px-lg-5 px-md-3 px-sm-1">
        <nav-pill-tabs>
            <tab title="Details" id="store-details" :active="true">
                <div class="row pb-1">
                    <span class="content-title"><i class="fa fa-university mr-3"></i> Store Details</span>
                    <div class="d-flex ml-auto justify-content-around">
                        <router-link :to="{name: links.edit}" class="btn btn-success text-white">
                            <i class="fa fa-edit"></i> Edit
                        </router-link>
                    </div>
                </div>
                <div class="w-100">
                    <div v-if="!store && !isLoading" class="m-auto">
                        <h3> Store with id: {{id}} not found</h3>
                    </div>
                    <div v-if="store" class="row justify-content-around">
                        <div class="card col-md-3">
                            <img class="card-img-top" :src="store | store_avatar" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">{{store.name}}</h5>
                                <p class="card-text">{{store.admin_email}}</p>
                            </div>
                        </div>
                        <div class="card col-md-9">
                            <div class="card-body">
                                <div class="col">
                                    <p>
                                        <span class="field">Main Address</span>
                                        <span class="value">{{store.street_address}}</span>
                                    </p>
                                    <p>
                                        <span class="field">Phone Number</span>
                                        <span class="value">{{store.phone_number}}</span>
                                    </p>

                                </div>
                                <div class="col">
                                    <p>
                                        <span class="field">Default Tax Mode</span>
                                        <span class="value">{{store.tax_charge_mode}}</span>
                                    </p>
                                    <p>
                                        <span class="field">Tax Charges</span>
                                        <span class="value">{{store.tax_charge}} + {{store.percentage_tax_charge}}%</span>
                                    </p>
                                    <p>
                                        <span class="field">Max Tax Charge</span>
                                        <span class="value">{{store.max_tax_charge}}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="addresses" class="card w-100 mt-5">
                        <div class="card-header">
                            <span class="content-title"> Branches </span>
                            <div class="d-flex-inline pull-right">
                                <button class="btn btn-success"
                                        @click="showCreateAddressModal" data-toggle="modal" data-target="#createStoreAddress">
                                    <i class="fa fa-plus"></i> Create New Store Branch
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div v-for="address in addresses" class="card"
                                 :class="{'border-success': selectedAddress && selectedAddress.id === address.id}">
                                <div class="card-body" style="display: flex; cursor: hand"
                                     @click="showEditAddressModal(address)" data-toggle="modal" data-target="#editStoreAddress">
                                    <div class="col">
                                        <span class="d-inline-block font-weight-bold">Street Address</span>
                                        <p>{{address.street_address}}</p>
                                    </div>
                                    <div class="col">
                                        <span class="d-inline-block font-weight-bold">Extended Address</span>
                                        <p>{{address.extended_address}}</p>
                                    </div>
                                    <div class="col">
                                        <span class="d-inline-block font-weight-bold">Phone Number</span>
                                        <p>{{address.phone_number}}</p>
                                    </div>
                                    <div class="col">
                                        <span class="d-inline-block font-weight-bold">Zip Code</span>
                                        <p>{{address.zip_code}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 mt-5">
                        <h3 class="w-100">Reviews</h3>
                        <div v-if="reviews.length === 0 && !isLoading">
                            <h4 class="w-100">No reviews yet</h4>
                        </div>
                        <div v-for="review in reviews">
                            <div class="card">
                                <div class="card-body">
                                    <h5>{{review.caption}}</h5>
                                    <p>{{review.comment}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </tab>
            <tab title="Schedules" id="store-schedules">
                <div class="row pb-1">
                    <span class="content-title"><i class="fa fa-university mr-3"></i> Store Schedules</span>
                    <div class="d-flex ml-auto justify-content-around">
                        <a href="#" class="btn btn-success text-white" data-toggle="modal"
                           data-target="#createStoreSchedule" @click="showCreateScheduleModal">
                            <i class="fa fa-plus"></i> Create New Schedule
                        </a>
                    </div>
                </div>
                <div class="w-100">
                    <div v-if="!store && !isLoading" class="m-auto">
                        <h3> Store with id: {{id}} not found</h3>
                    </div>
                </div>
            </tab>
        </nav-pill-tabs>
        <edit-store-schedule></edit-store-schedule>
        <create-store-schedule></create-store-schedule>
        <edit-store-address></edit-store-address>
        <create-store-address></create-store-address>
    </div>
</template>

<script>
  import CreateStoreSchedule from './modals/CreateStoreSchedule.vue'
  import EditStoreSchedule from './modals/EditStoreSchedule.vue'
  import CreateStoreAddress from './modals/CreateStoreAddress.vue'
  import EditStoreAddress from './modals/EditStoreAddress.vue'
  import NavPillTabs from '../components/NavPillTabs.vue'
  import Tab from '../components/Tab.vue'
  import { mapGetters, createNamespacedHelpers } from 'vuex'
  import * as getters from '../store/getter-types'
  import * as actions from '../store/action-types'
  import { EDIT_STORE } from '../router/route-names'

  const storeMap = createNamespacedHelpers('stores')
  const addressMap = createNamespacedHelpers('storeAddresses')
  const reviewMap = createNamespacedHelpers('storeReviews')
  const scheduleMap = createNamespacedHelpers('storeSchedules')

  export default {
    name: 'store-page',
    components: {CreateStoreSchedule, EditStoreSchedule, CreateStoreAddress, EditStoreAddress, NavPillTabs, Tab},
    data () {
      return {
        links: {
          edit: EDIT_STORE
        },
        selectedAddress: null
      }
    },
    computed: {
      ...mapGetters({
        isLoading: getters.IS_LOADING
      }),
      ...storeMap.mapGetters({
        getStore: getters.ITEM
      }),
      ...addressMap.mapGetters({
        getAddresses: getters.ALL
      }),
      ...reviewMap.mapGetters({
        getReviews: getters.ALL
      }),
      ...scheduleMap.mapGetters({
        getSchedules: getters.ALL
      }),
      addresses () {
        return this.getAddresses(this.id)
      },
      reviews () {
        return this.getReviews(this.id)
      },
      schedules () {
        return this.getSchedules(this.id)
      },
      id () {
        return this.$route.params.id
      },
      store () {
        return this.getStore(this.id)
      }
    },
    methods: {
      ...storeMap.mapActions({
        loadStore: actions.GET
      }),
      ...addressMap.mapActions({
        loadAddresses: actions.FETCH
      }),
      ...scheduleMap.mapActions({
        loadSchedules: actions.FETCH
      }),
      showCreateAddressModal () {
        this.createStoreAddressModal.setStore(this.store)
      },
      showEditAddressModal (address) {
        this.selectedAddress = address
        this.editStoreAddressModal.setAddress(address)
      },
      showCreateScheduleModal () {
        this.createStoreScheduleModal.setStore(this.store)
      },
      showEditScheduleModal (schedule) {
        this.selectedAddress = schedule
        this.editStoreScheduleModal.setSchedule(schedule)
      }
    },
    mounted () {
      this.loadStore({id: this.id}).then(
        (response) => {}
      )
      this.loadAddresses({_key: this.id}).then(
        (response) => {}
      )
      this.loadSchedules({_key: this.id}).then(
        (response) => {}
      )
      this.editStoreScheduleModal = this.$children[this.$children.length - 4]
      this.createStoreScheduleModal = this.$children[this.$children.length - 3]
      this.editStoreAddressModal = this.$children[this.$children.length - 2]
      this.createStoreAddressModal = this.$children[this.$children.length - 1]
    }
  }
</script>

<style scoped>
    .field{
        color: black;
        font-weight: 300;
        font-size: large;
    }
    .value{
        font-weight: 500;
        font-size: larger;
        color: black;
    }
</style>