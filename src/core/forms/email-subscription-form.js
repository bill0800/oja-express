import Form from '../form'

class EmailSubscriptionForm extends Form {
  constructor () {
    super({
      name: null,
      slug: null,
      parent_id: null
    })
  }
}

export default EmailSubscriptionForm
