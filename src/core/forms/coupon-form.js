import Form from '../form'

class CouponForm extends Form {
  constructor () {
    super({
      name: null,
      code: null,
      min_purchase_cost: null,
      percentage_deduction: null,
      max_cost_deduction: null,
      min_cost_deduction: null,
      is_for_purchase_cost: true,
      is_for_delivery_charges: false,
      is_for_tax_charges: false,
      expires_at: null,
      store_id: null
    })
  }
}

export default CouponForm
