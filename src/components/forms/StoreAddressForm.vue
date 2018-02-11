<template>
    <div>
        <div class="alert alert-danger fade show"
             :class="{gone: errorMsg === null}" role="alert">
            {{errorMsg}}
        </div>
        <form class="col-md-12" enctype="multipart/form-data" @submit.prevent="submit" @keydown="clearErrors($event.target.name)">
            <div class="form-group">
                <div class="form-group">
                    <label for="admin">Admin<span class="text-danger">*</span></label>
                    <input id="admin" type="text" name="admin" class="form-control"
                           v-model="searchEmail" placeholder="start typing the admin email"/>
                    <span class="text-danger" :class="{hidden: !fieldHasError('admin_id')}">
                        {{fieldError('admin_id')}}
                    </span>
                </div>
                <label>Select a user as Branch Admin</label>
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
                <label for="zip_code">Zip Code<span class="text-danger">*</span></label>
                <input id="zip_code" type="text" class="form-control"
                       name="zip_code" v-model="zipCode" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('zip_code')}">
                    {{fieldError('zip_code')}}
                </span>
            </div>
            <div class="form-group">
                <label for="extra_info">Extra Information</label>
                <textarea id="extra_info" class="form-control"
                          name="name" v-model="extraInfo">
                </textarea>
                <span class="text-danger" :class="{hidden: !fieldHasError('extra_info')}">
                    {{fieldError('extra_info')}}
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
                <label for="latitude">Latitude<span class="text-danger">*</span></label>
                <input id="latitude" type="text" class="form-control"
                       name="latitude" v-model="latitude" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('latitude')}">
                    {{fieldError('latitude')}}
                </span>
            </div>
            <div class="form-group">
                <label for="longitude">Longitude<span class="text-danger">*</span></label>
                <input id="longitude" type="text" class="form-control"
                       name="longitude" v-model="longitude" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('longitude')}">
                    {{fieldError('longitude')}}
                </span>
            </div>
            <div class="form-group">
                <input id="is_headquarter" type="checkbox" class="form-check-input"
                       name="is_headquarter" v-model="isHeadquarter" required/>
                <label for="is_headquarter" class="form-check-label">Is Headquarter<span class="text-danger">*</span></label>
                <span class="text-danger" :class="{hidden: !fieldHasError('is_headquarter')}">
                    {{fieldError('is_headquarter')}}
                </span>
            </div>
            <div class="form-group">
                <input id="is_operational" type="checkbox" class="form-check-input"
                       name="is_operational" v-model="isOperational" required/>
                <label for="is_operational" class="form-check-label">Is Operational<span class="text-danger">*</span></label>
                <span class="text-danger" :class="{hidden: !fieldHasError('is_operational')}">
                    {{fieldError('is_operational')}}
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

  const {mapGetters, mapMutations} = createNamespacedHelpers('storeAddresses')
  const countryMaps = createNamespacedHelpers('countries')
  const userMaps = createNamespacedHelpers('users')

  export default {
    name: 'store-address-form',
    components: {Pagination},
    data () {
      return {
        searchEmail: null,
        admin: null,
        pagination: null
      }
    },
    methods: {
      ...userMaps.mapActions({
        fetchUsers: actions.FETCH,
        next: actions.FETCH_NEXT
      }),
      selectUser (user) {
        this.admin = user
        this.branchAdminId = this.admin.id
        this.clearErrors('branch_admin_id')
      },
      ...mapMutations({
        setFormField: mutations.SET_FORM_FIELD,
        clearErrors: mutations.CLEAR_ERRORS,
        recordErrors: mutations.RECORD_ERRORS,
        reset: mutations.RESET
      }),
      setAddress (address) {
        this.storeId = address.store_id
        this.admin = {
          id: address.branch_admin_id,
          email: address.branch_admin_email
        }
        this.branchAdminId = address.branch_admin_id
        this.streetAddress = address.street_address
        this.extendedAddress = address.extended_address
        this.locality = address.locality
        this.extraInfo = address.extra_info
        this.phoneNumber = address.phone_number
        this.country = address.country_id
        this.latitude = address.latitude
        this.longitude = address.longitude
        this.isHeadquarter = address.is_headquarter
        this.isOperational = address.is_operational
        this.zipCode = address.zip_code
      },
      submit () {
        if (this.anyError) {
          return
        }
        this.isHeadquarter = (this.isHeadquarter) ? 1 : 0
        this.isOperational = (this.isOperational) ? 1 : 0
        this.$emit('submitStoreAddress')
      }
    },
    computed: {
      ...mapGetters({
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
      storeId: {
        get () {
          return this.getFormField('store_id')
        },
        set (value) {
          this.setFormField({field: 'store_id', value: value})
        }
      },
      branchAdminId: {
        get () {
          return this.getFormField('branch_admin_id')
        },
        set (value) {
          this.setFormField({field: 'branch_admin_id', value: value})
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
      extraInfo: {
        get () {
          return this.getFormField('extra_info')
        },
        set (value) {
          this.setFormField({field: 'extra_info', value: value})
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
      latitude: {
        get () {
          return this.getFormField('latitude')
        },
        set (value) {
          this.setFormField({field: 'latitude', value: value})
        }
      },
      longitude: {
        get () {
          return this.getFormField('longitude')
        },
        set (value) {
          this.setFormField({field: 'longitude', value: value})
        }
      },
      isHeadquarter: {
        get () {
          return this.getFormField('is_headquarter')
        },
        set (value) {
          this.setFormField({field: 'is_headquarter', value: value})
        }
      },
      isOperational: {
        get () {
          return this.getFormField('is_operational')
        },
        set (value) {
          this.setFormField({field: 'is_operational', value: value})
        }
      }
    },
    mounted () {
      this.pagination = this.$children[this.$children.length - 1]
    },
    created () {
      this.fetchUsers()
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