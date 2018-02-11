import Form from '../form'

class UserStoreRoleForm extends Form {
  constructor () {
    super({
      user_id: null,
      store_role_ids: null
    })
  }
}

export default UserStoreRoleForm
