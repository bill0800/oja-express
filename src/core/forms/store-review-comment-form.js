import Form from '../form'

class StoreReviewCommentForm extends Form {
  constructor () {
    super({
      store_review_id: null,
      parent_id: null,
      user_id: null,
      comment: null
    })
  }
}

export default StoreReviewCommentForm
