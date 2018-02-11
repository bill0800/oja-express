<template>
    <div>
        <modal title="Edit Stop Point" id="editStopPoint">
            <div class="loader-parent">
                <loader :class="{gone: !isLoading}"></loader>
            </div>
            <stop-point-form @submitStopPoint="submit"></stop-point-form>
        </modal>
        <template slot="footer">
            <span class="text-sm text-center">OjaExpress 2018</span>
        </template>
    </div>
</template>

<script>
  import Modal from '../../components/Modal.vue'
  import Loader from '../../components/Loader.vue'
  import StopPointForm from '../../components/forms/StopPointForm.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as actions from '../../store/action-types'

  const {mapActions} = createNamespacedHelpers('stopPoints')

  export default {
    name: 'edit-stop-point-modal',
    components: {Modal, StopPointForm, Loader},
    data () {
      return {
        stopPoint: null,
        isLoading: false
      }
    },
    methods: {
      ...mapActions({
        update: actions.UPDATE
      }),
      setStopPoint (stopPoint) {
        this.form.setStopPoint(stopPoint)
        this.stopPoint = stopPoint
      },
      success (response) {
        this.isLoading = false
        this.$emit('stopPointUpdated', response.data.data)
        this.modal.close()
      },
      error (error) {
        this.isLoading = false
        console.log(error)
      },
      submit () {
        this.isLoading = true
        this.update({id: this.stopPoint.id}).then(this.success.bind(this)).catch(this.error.bind(this))
      }
    },
    mounted () {
      this.modal = this.$children[0]
      this.form = this.modal.$children[this.modal.$children.length - 1]
    }
  }
</script>