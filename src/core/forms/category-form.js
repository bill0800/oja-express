import Form from '../form'

class CategoryForm extends Form {
  constructor () {
    super({
      name: null,
      parent_category_id: null
    })
  }
}

export default CategoryForm
