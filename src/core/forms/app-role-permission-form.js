import Form from '../form'

class AppRolePermissionForm extends Form {
  constructor () {
    super({
      role_id: null,
      permission_ids: null
    })
  }
}

export default AppRolePermissionForm
