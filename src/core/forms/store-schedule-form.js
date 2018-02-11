import Form from '../form'

class StoreScheduleForm extends Form {
  constructor () {
    super({
      store_id: null,
      display_name: null,
      days_from_order: null,
      lower_bound_time: null,
      upper_bound_time: null,
      specific_delivery_day: null,
      specific_no_delivery_day: null
    })
  }
}

export default StoreScheduleForm
