<template>
    <div>
        <modal title="Create Delivery" id="createDelivery">
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
    name: 'create-delivery-modal',
    components: {Modal, Loader, DeliveryForm},
    data () {
      return {
        isLoading: false
      }
    },
    methods: {
      ...mapActions({
        create: actions.CREATE
      }),
      setOrder (order) {
        this.form.setDelivery({order_id: order.id, delivery_address_stop_point_id: order.delivery_address_stop_point_id})
      },
      success (response) {
        this.isLoading = false
        this.$emit('deliveryCreated', response.data.data)
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