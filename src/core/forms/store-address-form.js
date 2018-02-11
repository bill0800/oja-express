import Form from '../form'

class StoreAddressForm extends Form {
  constructor () {
    super({
      store_id: null,
      branch_admin_id: null,
      street_address: null,
      extended_address: null,
      locality: null,
      zip_code: null,
      extra_info: null,
      phone_number: null,
      country_id: null,
      latitude: null,
      longitude: null,
      is_headquarter: null,
      is_operational: null
    })
  }
}

export default StoreAddressForm
