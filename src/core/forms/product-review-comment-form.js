import Form from '../form'

class ProductReviewCommentForm extends Form {
  constructor () {
    super({
      product_review_id: null,
      parent_id: null,
      user_id: null,
      comment: null
    })
  }
}

export default ProductReviewCommentForm
