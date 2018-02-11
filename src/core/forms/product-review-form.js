import Form from '../form'

class ProductReviewForm extends Form {
  constructor () {
    super({
      product_id: null,
      user_id: null,
      caption: null,
      percentage_rating: null,
      scale_max: null,
      comment: null
    })
  }
}

export default ProductReviewForm
