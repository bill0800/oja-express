<template>
    <div>
        <modal title="Edit Delivery Transition" id="editDeliveryTransition">
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
    name: 'edit-delivery-transition-modal',
    components: {Modal, DeliveryTransitionForm, Loader},
    data () {
      return {
        deliveryTransition: null,
        isLoading: false
      }
    },
    methods: {
      ...mapActions({
        update: actions.UPDATE
      }),
      setDeliveryTransition (deliveryTransition) {
        this.form.setDeliveryTransition(deliveryTransition)
        this.deliveryTransition = deliveryTransition
      },
      success (response) {
        this.isLoading = false
        this.$emit('deliveryTransitionUpdated', response.data.data)
        this.modal.close()
      },
      error (error) {
        this.isLoading = false
        console.log(error)
      },
      submit () {
        this.isLoading = true
        this.update({id: this.deliveryTransition.id}).then(this.success.bind(this)).catch(this.error.bind(this))
      }
    },
    mounted () {
      this.modal = this.$children[0]
      this.form = this.modal.$children[this.modal.$children.length - 1]
    }
  }
</script>