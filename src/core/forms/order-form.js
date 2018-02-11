import Form from '../form'

class OrderForm extends Form {
  constructor () {
    super({
      name: null,
      adminId: null,
      avatar: null
    })
  }
}

export default OrderForm
