import Form from '../form'

class UserStorePermissionForm extends Form {
  constructor () {
    super({
      user_id: null,
      store_permission_ids: null
    })
  }
}

export default UserStorePermissionForm
