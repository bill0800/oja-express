<template>
    <div>
        <modal title="Create Delivery Transition" id="createDeliveryTransition">
            <div class="loader-parent">
                <loader :class="{gone: !isLoading}"></loader>
            </div>
            <delivery-transition-form @submitDeliveryTransition="submit"></delivery-transition-form>
        </modal>
        <template slot="footer">
            <span class="text-sm text-center">OjaExpress 2018</span>
        </template>
    </div>
</template>

<script>
  import Modal from '../../components/Modal.vue'
  import Loader from '../../components/Loader.vue'
  import DeliveryTransitionForm from '../../components/forms/DeliveryTransitionForm.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as actions from '../../store/action-types'

  const {mapActions} = createNamespacedHelpers('deliveryTransitions')

  export default {
    name: 'create-delivery-transition-modal',
    components: {Modal, Loader, DeliveryTransitionForm},
    data () {
      return {
        isLoading: false
      }
    },
    methods: {
      ...mapActions({
        create: actions.CREATE
      }),
      setDelivery (delivery) {
        this.form.setDeliveryTransition({delivery_id: delivery.id})
      },
      success (response) {
        this.isLoading = false
        this.$emit('deliveryTransitionCreated', response.data.data)
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