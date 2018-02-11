import Form from '../form'

class UserEmailSubscriptionForm extends Form {
  constructor () {
    super({
      user_id: null,
      email_subscription_id: null,
      is_active: null
    })
  }
}

export default UserEmailSubscriptionForm
