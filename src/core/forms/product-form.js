import Form from '../form'

class ProductForm extends Form {
  constructor () {
    super({
      name: null,
      price: null,
      unit_of_measure: null,
      unit_of_measure_plural: null,
      tax_charge: 0.00,
      delivery_charge: 0.00,
      number_in_stock: 0,
      min_number_for_restock: 0,
      number_sold: 0,
      store_id: null,
      description: null,
      is_active: 1,
      images: null,
      categories: null
    })
  }

  data () {
    let data = new FormData()
    let value
    for (let field in this.properties) {
      value = this[field]
      if (Array.isArray(value)) {
        value.forEach((each) => {
          data.append(`${field}[]`, each)
        })
      } else {
        data.append(field, value)
      }
    }
    return data
  }
}

export default ProductForm
