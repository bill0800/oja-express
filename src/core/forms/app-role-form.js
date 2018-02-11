import Form from '../form'

class AppRoleForm extends Form {
  constructor () {
    super({
      name: null,
      display_name: null,
      description: null
    })
  }
}

export default AppRoleForm
