import Form from '../form'

class UserPermissionForm extends Form {
  constructor () {
    super({
      user_id: null,
      permission_ids: null
    })
  }
}

export default UserPermissionForm
