import Form from '../form'

class DiscountForm extends Form {
  constructor () {
    super({
      name: null,
      display_name: null,
      product_id: null,
      percentage_deduction: null,
      min_deduction: null,
      min_required_purchase: null,
      is_cumulative_by_count: null,
      is_for_purchase_cost: null,
      is_for_delivery_charges: null,
      is_for_tax_charges: null
    })
  }
}

export default DiscountForm
