import Form from '../form'

class AuthForm extends Form {
  constructor () {
    super({
      email: null,
      password: null
    })
  }
}

export default AuthForm
