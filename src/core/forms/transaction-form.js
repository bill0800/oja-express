import Form from '../form'

class TransactionForm extends Form {
  constructor () {
    super({
      name: null,
      adminId: null,
      avatar: null
    })
  }
}

export default TransactionForm
