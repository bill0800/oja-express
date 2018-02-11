import Form from '../form'

class StoreForm extends Form {
  constructor () {
    super({
      name: null,
      admin_id: null,
      street_address: null,
      extended_address: null,
      locality: null,
      phone_number: null,
      country_id: null,
      zip_code: null,
      avatar: null,
      tax_charge: null,
      percentage_tax_charge: null,
      tax_charge_mode: 'FLAT-CHARGE-ONLY',
      max_tax_charge: null,
      delivery_charge: null,
      percentage_delivery_charge: null,
      delivery_charge_mode: 'FLAT-CHARGE-ONLY',
      max_delivery_charge: null
    })
  }
}

export default StoreForm
