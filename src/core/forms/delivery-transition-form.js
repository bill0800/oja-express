import Form from '../form'

class DeliveryTransitionForm extends Form {
  constructor () {
    super({
      delivery_id: null,
      departure_stop_point_id: null,
      departed_at: null,
      arrived_at: null,
      arrival_stop_point_id: null
    })
  }
}

export default DeliveryTransitionForm
