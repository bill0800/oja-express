<template>
    <div>
        <modal title="Edit Delivery" id="editDelivery">
            <div class="loader-parent">
                <loader :class="{gone: !isLoading}"></loader>
            </div>
            <delivery-form @submitDelivery="submit"></delivery-form>
        </modal>
        <template slot="footer">
            <span class="text-sm text-center">OjaExpress 2018</span>
        </template>
    </div>
</template>

<script>
  import Modal from '../../components/Modal.vue'
  import Loader from '../../components/Loader.vue'
  import DeliveryForm from '../../components/forms/DeliveryForm.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as actions from '../../store/action-types'

  const {mapActions} = createNamespacedHelpers('deliveries')

  export default {
    name: 'edit-delivery-modal',
    components: {Modal, DeliveryForm, Loader},
    data () {
      return {
        delivery: null,
        isLoading: false
      }
    },
    methods: {
      ...mapActions({
        update: actions.UPDATE
      }),
      setDelivery (delivery) {
        this.form.setDelivery(delivery)
        this.delivery = delivery
      },
      success (response) {
        this.isLoading = false
        this.$emit('deliveryUpdated', response.data.data)
        this.modal.close()
      },
      error (error) {
        this.isLoading = false
        console.log(error)
      },
      submit () {
        this.isLoading = true
        this.update({id: this.delivery.id}).then(this.success.bind(this)).catch(this.error.bind(this))
      }
    },
    mounted () {
      this.modal = this.$children[0]
      this.form = this.modal.$children[this.modal.$children.length - 1]
    }
  }
</script>