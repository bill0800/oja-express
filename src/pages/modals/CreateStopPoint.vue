<template>
    <div>
        <modal title="Create Stop Point" id="createStopPoint">
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
    name: 'create-stop-point-modal',
    components: {Modal, Loader, StopPointForm},
    data () {
      return {
        isLoading: false
      }
    },
    methods: {
      ...mapActions({
        create: actions.CREATE
      }),
      success (response) {
        this.isLoading = false
        this.$emit('stopPointCreated', response.data.data)
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