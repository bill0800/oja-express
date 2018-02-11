import Form from '../form'

class UserForm extends Form {
  constructor () {
    super({
      name: null,
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      confirmed: null,
      is_client: null,
      gender: null,
      birth: null,
      country_id: null,
      zip_code: null,
      phone_number: null,
      avatar: null,
      device: null,
      platform: null
    })
  }
}

export default UserForm
