import Form from '../form'

class UserRoleForm extends Form {
  constructor () {
    super({
      user_id: null,
      role_ids: null
    })
  }
}

export default UserRoleForm
