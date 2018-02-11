<template>
    <div>
        <modal title="Edit Discount" id="editDiscount">
            <div class="loader-parent">
                <loader :class="{gone: !isLoading}"></loader>
            </div>
            <discount-form @submitDiscount="submit"></discount-form>
        </modal>
        <template slot="footer">
            <span class="text-sm text-center">OjaExpress 2018</span>
        </template>
    </div>
</template>

<script>
  import Modal from '../../components/Modal.vue'
  import Loader from '../../components/Loader.vue'
  import DiscountForm from '../../components/forms/DiscountForm.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as actions from '../../store/action-types'

  const {mapActions} = createNamespacedHelpers('discounts')

  export default {
    name: 'edit-discount-modal',
    components: {Modal, DiscountForm, Loader},
    data () {
      return {
        discount: null,
        isLoading: false
      }
    },
    methods: {
      ...mapActions({
        update: actions.UPDATE
      }),
      setDiscount (discount) {
        this.form.setDiscount(discount)
        this.discount = discount
      },
      success (response) {
        this.isLoading = false
        this.$emit('discountUpdated', response.data.data)
        this.modal.close()
      },
      error (error) {
        this.isLoading = false
        console.log(error)
      },
      submit () {
        this.isLoading = true
        this.update({id: this.discount.id}).then(this.success.bind(this)).catch(this.error.bind(this))
      }
    },
    mounted () {
      this.modal = this.$children[0]
      this.form = this.modal.$children[this.modal.$children.length - 1]
    }
  }
</script>