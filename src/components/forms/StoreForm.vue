<template>
    <div>
        <div class="alert alert-danger fade show"
             :class="{gone: errorMsg === null}" role="alert">
            {{errorMsg}}
        </div>
        <form class="col-md-12" enctype="multipart/form-data" @submit.prevent="submit" @keydown="clearErrors($event.target.name)">
            <div class="form-group">
                <label for="name">Name<span class="text-danger">*</span></label>
                <input id="name" type="text" class="form-control"
                       name="name" v-model="name" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('name')}">
                                    {{fieldError('name')}}
                                </span>
            </div>
            <div class="form-group">
                <label for="street_address">Street Address<span class="text-danger">*</span></label>
                <textarea id="street_address" class="form-control"
                          name="name" v-model="streetAddress" required>
                                </textarea>
                <span class="text-danger" :class="{hidden: !fieldHasError('street_address')}">
                                    {{fieldError('street_address')}}
                                </span>
            </div>
            <div class="form-group">
                <label for="extended_address">Extended Address</label>
                <textarea id="extended_address" class="form-control"
                          name="name" v-model="extendedAddress">
                                </textarea>
                <span class="text-danger" :class="{hidden: !fieldHasError('extended_address')}">
                                    {{fieldError('extended_address')}}
                                </span>
            </div>
            <div class="form-group">
                <label for="locality">Locality</label>
                <textarea id="locality" class="form-control"
                          name="name" v-model="locality">
                                </textarea>
                <span class="text-danger" :class="{hidden: !fieldHasError('locality')}">
                                    {{fieldError('locality')}}
                                </span>
            </div>
            <div class="form-group">
                <label for="phone_number">Phone Number<span class="text-danger">*</span></label>
                <input id="phone_number" type="text" class="form-control"
                       name="phone_number" v-model="phoneNumber" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('phone_number')}">
                                    {{fieldError('phone_number')}}
                                </span>
            </div>
            <div class="form-group">
                <label for="country_id">Country<span class="text-danger">*</span></label>
                <select id="country_id" class="form-control" v-model="country">
                    <option v-for="country in countries" :value="country.id">{{country.name}}</option>
                </select>
                <span class="text-danger" :class="{hidden: !fieldHasError('country_id')}">
                                    {{fieldError('country_id')}}
                                </span>
            </div>
            <div class="form-group">
                <label for="zip_code">Zip Code<span class="text-danger">*</span></label>
                <input id="zip_code" type="text" class="form-control"
                       name="zip_code" v-model="zipCode" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('zip_code')}">
                                    {{fieldError('zip_code')}}
                                </span>
            </div>
            <div class="form-group">
                <label for="admin">Admin<span class="text-danger">*</span></label>
                <input id="admin" type="text" name="admin" class="form-control"
                       v-model="searchEmail" placeholder="start typing the admin email"/>
                <span class="text-danger" :class="{hidden: !fieldHasError('admin_id')}">
                    {{fieldError('admin_id')}}
                </span>
            </div>
            <div class="list-group">
                <a v-for="user in usersPageData" class="list-group-item" @click="selectUser(user)"
                   :class="{active: admin && user.id === admin.id}">
                    <img class="img-circle pull-left" :src="user | user_avatar"
                         style="width:50px; height: 50px; display: inline">
                    <div style="margin-left: 60px; padding: 5px">
                        <h4 class="list-group-item-heading">{{user.last_name}} {{user.first_name}}</h4>
                        <p class="list-group-item-text">{{user.email}}</p>
                    </div>
                </a>
            </div>
            <div class="text-center">
                <pagination :hasMore="hasMoreUsers" :list="filteredUsers"
                            :itemsPerPage="5" @noNext="next">
                </pagination>
            </div>
            <div class="form-group">
                <label for="tax_charge_mode">Tax Charge Mode<span class="text-danger">*</span></label>
                <select id="tax_charge_mode" class="form-control"
                        name="tax_charge_mode" v-model="taxChargeMode" required>
                    <option v-for="chargeMode in Object.values(chargeModes)" :value="chargeMode.key">{{chargeMode.desc}}</option>
                </select>
                <span class="text-danger" :class="{hidden: !fieldHasError('tax_charge_mode')}">
                    {{fieldError('tax_charge_mode')}}
                </span>
            </div>
            <div class="form-group">
                <label for="tax_charge">Default Tax Charge<span v-if="flatTaxChargeRequired" class="text-danger">*</span></label>
                <input id="tax_charge" type="text" class="form-control"
                       name="tax_charge" v-model="taxCharge" :required="flatTaxChargeRequired"/>
                <span class="text-danger" :class="{hidden: !fieldHasError('tax_charge')}">
                    {{fieldError('tax_charge')}}
                </span>
            </div>
            <div class="form-group">
                <label for="percentage_tax_charge">Percentage Tax Charge<span v-if="percentageTaxChargeRequired" class="text-danger">*</span></label>
                <input id="percentage_tax_charge" type="text" class="form-control"
                       name="percentage_tax_charge" v-model="percentageTaxCharge" :required="percentageTaxChargeRequired"/>
                <span class="text-danger" :class="{hidden: !fieldHasError('percentage_tax_charge')}">
                    {{fieldError('percentage_tax_charge')}}
                </span>
            </div>
            <div class="form-group">
                <label for="delivery_charge_mode">Delivery Charge Mode<span class="text-danger">*</span></label>
                <select id="delivery_charge_mode" class="form-control"
                       name="delivery_charge_mode" v-model="deliveryChargeMode" required>
                    <option v-for="chargeMode in Object.values(chargeModes)" :value="chargeMode.key">{{chargeMode.desc}}</option>
                </select>
                <span class="text-danger" :class="{hidden: !fieldHasError('delivery_charge_mode')}">
                    {{fieldError('delivery_charge_mode')}}
                </span>
            </div>
            <div class="form-group">
                <label for="delivery_charge">Default Delivery Charge<span v-if="flatDeliveryChargeRequired" class="text-danger">*</span></label>
                <input id="delivery_charge" type="text" class="form-control"
                       name="delivery_charge" v-model="deliveryCharge" :required="flatDeliveryChargeRequired"/>
                <span class="text-danger" :class="{hidden: !fieldHasError('delivery_charge')}">
                    {{fieldError('delivery_charge')}}
                </span>
            </div>
            <div class="form-group">
                <label for="percentage_delivery_charge">Percentage Delivery Charge<span v-if="percentageDeliveryChargeRequired" class="text-danger">*</span></label>
                <input id="percentage_delivery_charge" type="text" class="form-control"
                       name="percentage_delivery_charge" v-model="percentageDeliveryCharge" :required="percentageDeliveryChargeRequired"/>
                <span class="text-danger" :class="{hidden: !fieldHasError('percentage_delivery_charge')}">
                    {{fieldError('percentage_delivery_charge')}}
                </span>
            </div>
            <div class="form-group">
                <label for="avatar">Avatar</label>
                <input id="avatar" type="file" class="form-control-file" name="avatar" @change="setAvatar($event.target.files[0])"/>
                <span class="text-danger" :class="{hidden: !fieldHasError('avatar')}">
                    {{fieldError('avatar')}}
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

  const storeMaps = createNamespacedHelpers('stores')
  const userMaps = createNamespacedHelpers('users')
  const countryMaps = createNamespacedHelpers('countries')

  export default {
    name: 'store-form',
    components: {Pagination},
    data () {
      return {
        searchEmail: null,
        admin: null,
        pagination: null,
        chargeModes: {
          flat: {
            key: 'FLAT-CHARGE-ONLY',
            desc: 'Flat Charge Only'
          },
          percentage: {
            key: 'PERCENTAGE-CHARGE-ONLY',
            desc: 'Percentage Charge Only'
          },
          both: {
            key: 'FLAT-PLUS-PERCENTAGE-CHARGE',
            desc: 'Flat Charge + Percentage Charge'
          }
        }
      }
    },
    methods: {
      ...storeMaps.mapMutations({
        setFormField: mutations.SET_FORM_FIELD,
        clearErrors: mutations.CLEAR_ERRORS,
        recordErrors: mutations.RECORD_ERRORS,
        reset: mutations.RESET
      }),
      ...userMaps.mapActions({
        next: actions.FETCH_NEXT
      }),
      selectUser (user) {
        this.admin = user
        this.setFormField({field: 'admin_id', value: this.admin.id})
        this.clearErrors('admin_id')
      },
      setAvatar (avatar) {
        this.setFormField({field: 'avatar', value: avatar})
      },
      setStore (store) {
        this.name = store.name
        this.setFormField({field: 'admin_id', value: store.admin_id})
        if (store.hasOwnProperty('addresses') && store.addresses.data.length > 0) {
          let address = store.addresses.data[0]
          this.streetAddress = address.street_address
          this.extendedAddress = address.extended_address
          this.locality = address.locality
          this.phoneNumber = address.phone_number
          this.country = address.country_id
          this.zipCode = address.zip_code
        }
      },
      submit () {
        if (this.anyError) {
          return
        }
        this.$emit('submitStore')
      }
    },
    computed: {
      ...storeMaps.mapGetters({
        getFormField: getters.GET_FORM_FIELD,
        errorMsg: getters.GET_ERROR_MSG,
        fieldHasError: getters.HAS_ERROR_IN_FIELD,
        anyError: getters.ANY_ERRORS,
        fieldError: getters.GET_ERROR_BY_FIELD
      }),
      ...userMaps.mapGetters({
        users: getters.ALL,
        paginationData: getters.PAGINATION
      }),
      ...countryMaps.mapGetters({
        countries: getters.ALL
      }),
      usersPageData () {
        return (this.pagination) ? this.pagination.pageData : []
      },
      hasMoreUsers () {
        return this.paginationData.hasOwnProperty('links') && this.paginationData.links.hasOwnProperty('next')
      },
      filteredUsers () {
        if (!this.searchEmail) {
          return this.users
        }
        return this.users.filter((user) => user.email.indexOf(this.searchEmail) !== -1)
      },
      flatTaxChargeRequired () {
        return [this.chargeModes.flat.key, this.chargeModes.both.key].indexOf(this.taxChargeMode) > 0
      },
      percentageTaxChargeRequired () {
        return [this.chargeModes.percentage.key, this.chargeModes.both.key].indexOf(this.taxChargeMode) > 0
      },
      flatDeliveryChargeRequired () {
        return [this.chargeModes.flat.key, this.chargeModes.both.key].indexOf(this.deliveryChargeMode) > 0
      },
      percentageDeliveryChargeRequired () {
        return [this.chargeModes.flat.key, this.chargeModes.both.key].indexOf(this.deliveryChargeMode) > 0
      },
      name: {
        get () {
          return this.getFormField('name')
        },
        set (value) {
          this.setFormField({field: 'name', value: value})
        }
      },
      streetAddress: {
        get () {
          return this.getFormField('street_address')
        },
        set (value) {
          this.setFormField({field: 'street_address', value: value})
        }
      },
      extendedAddress: {
        get () {
          return this.getFormField('extended_address')
        },
        set (value) {
          this.setFormField({field: 'extended_address', value: value})
        }
      },
      locality: {
        get () {
          return this.getFormField('locality')
        },
        set (value) {
          this.setFormField({field: 'locality', value: value})
        }
      },
      phoneNumber: {
        get () {
          return this.getFormField('phone_number')
        },
        set (value) {
          this.setFormField({field: 'phone_number', value: value})
        }
      },
      country: {
        get () {
          return this.getFormField('country_id')
        },
        set (value) {
          this.setFormField({field: 'country_id', value: value})
        }
      },
      zipCode: {
        get () {
          return this.getFormField('zip_code')
        },
        set (value) {
          this.setFormField({field: 'zip_code', value: value})
        }
      },
      taxCharge: {
        get () {
          return this.getFormField('tax_charge')
        },
        set (value) {
          this.setFormField({field: 'tax_charge', value: value})
        }
      },
      percentageTaxCharge: {
        get () {
          return this.getFormField('percentage_tax_charge')
        },
        set (value) {
          this.setFormField({field: 'percentage_tax_charge', value: value})
        }
      },
      maxTaxCharge: {
        get () {
          return this.getFormField('max_tax_charge')
        },
        set (value) {
          this.setFormField({field: 'max_tax_charge', value: value})
        }
      },
      taxChargeMode: {
        get () {
          return this.getFormField('tax_charge_mode')
        },
        set (value) {
          this.setFormField({field: 'tax_charge_mode', value: value})
        }
      },
      deliveryCharge: {
        get () {
          return this.getFormField('delivery_charge')
        },
        set (value) {
          this.setFormField({field: 'delivery_charge', value: value})
        }
      },
      percentageDeliveryCharge: {
        get () {
          return this.getFormField('percentage_delivery_charge')
        },
        set (value) {
          this.setFormField({field: 'percentage_delivery_charge', value: value})
        }
      },
      maxDeliveryCharge: {
        get () {
          return this.getFormField('max_delivery_charge')
        },
        set (value) {
          this.setFormField({field: 'max_delivery_charge', value: value})
        }
      },
      deliveryChargeMode: {
        get () {
          return this.getFormField('delivery_charge_mode')
        },
        set (value) {
          this.setFormField({field: 'delivery_charge_mode', value: value})
        }
      }
    },
    mounted () {
      this.pagination = this.$children[this.$children.length - 1]
    }
  }
</script>

<style scoped>
    .list-group-item.active {
        background-color: white !important;
        border: 3px solid darkgreen;
    }

    label {
        font-weight: bolder;
    }
</style>