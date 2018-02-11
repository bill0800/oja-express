<template>
    <div>
        <div class="alert alert-danger fade show"
             :class="{gone: errorMsg === null}" role="alert">
            {{errorMsg}}
        </div>
        <form class="col-md-12" enctype="multipart/form-data" @submit.prevent="submit" @keydown="clearErrors($event.target.name)">
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
                <input id="latitude" type="number" class="form-control"
                       name="latitude" v-model="latitude" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('latitude')}">
                    {{fieldError('latitude')}}
                </span>
            </div>
            <div class="form-group">
                <label for="longitude">Longitude<span class="text-danger">*</span></label>
                <input id="longitude" type="number" class="form-control"
                       name="longitude" v-model="longitude" required/>
                <span class="text-danger" :class="{hidden: !fieldHasError('longitude')}">
                    {{fieldError('longitude')}}
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

  const {mapGetters, mapMutations} = createNamespacedHelpers('stopPoints')
  const countryMaps = createNamespacedHelpers('countries')

  export default {
    name: 'stop-point-form',
    data () {
      return {
      }
    },
    methods: {
      ...mapMutations({
        setFormField: mutations.SET_FORM_FIELD,
        clearErrors: mutations.CLEAR_ERRORS,
        recordErrors: mutations.RECORD_ERRORS,
        reset: mutations.RESET
      }),
      setStopPoint (stopPoint) {
        this.name = stopPoint.name
        this.streetAddress = stopPoint.street_address
        this.extendedAddress = stopPoint.extended_address
        this.locality = stopPoint.locality
        this.phoneNumber = stopPoint.phone_number
        this.country = stopPoint.country_id
        this.zipCode = stopPoint.zip_code
      },
      submit () {
        if (this.anyError) {
          return
        }
        this.$emit('submitStopPoint')
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
      ...countryMaps.mapGetters({
        countries: getters.ALL
      }),
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
      }
    },
    mounted () {
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