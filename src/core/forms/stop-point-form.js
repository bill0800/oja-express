import Form from '../form'

class StopPointForm extends Form {
  constructor () {
    super({
      street_address: null,
      extended_address: null,
      locality: null,
      zip_code: null,
      extra_info: null,
      country_id: null,
      latitude: null,
      longitude: null
    })
  }
}

export default StopPointForm
