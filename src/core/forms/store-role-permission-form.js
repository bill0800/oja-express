import Form from '../form'

class StoreRolePermissionForm extends Form {
  constructor () {
    super({
      role_id: null,
      permission_ids: null
    })
  }
}

export default StoreRolePermissionForm
