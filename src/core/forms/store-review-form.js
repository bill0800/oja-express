import Form from '../form'

class StoreReviewForm extends Form {
  constructor () {
    super({
      store_id: null,
      user_id: null,
      caption: null,
      percentage_rating: null,
      scale_max: null,
      comment: null
    })
  }
}

export default StoreReviewForm
