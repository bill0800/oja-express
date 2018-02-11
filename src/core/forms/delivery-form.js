import Form from '../form'

class DeliveryForm extends Form {
  constructor () {
    super({
      order_id: null,
      store_stop_point_id: null,
      delivery_address_stop_point_id: null,
      delivery_due_at: null
    })
  }
}

export default DeliveryForm
