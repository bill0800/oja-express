<template>
    <div>
        <modal title="Create Discount" id="createDiscount">
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
    name: 'create-discount-modal',
    components: {Modal, Loader, DiscountForm},
    data () {
      return {
        isLoading: false
      }
    },
    methods: {
      ...mapActions({
        create: actions.CREATE
      }),
      setProduct (product) {
        this.form.setDiscount({product_id: product.id})
      },
      success (response) {
        this.isLoading = false
        this.$emit('discountCreated', response.data.data)
        this.modal.close()
      },
      error (error) {
        console.log(error)
      },
      submit () {
        this.create().then(this.success.bind(this)).catch(this.error.bind(this))
      }
    },
    mounted () {
      this.modal = this.$children[0]
      this.form = this.modal.$children[this.modal.$children.length - 1]
    }
  }
</script>