<template>
    <div>
        <modal title="Edit Email Subscription" id="editEmailSubscription">
            <div class="loader-parent">
                <loader :class="{gone: !isLoading}"></loader>
            </div>
            <email-subscription-form @submitEmailSubscription="submit"></email-subscription-form>
        </modal>
        <template slot="footer">
            <span class="text-sm text-center">OjaExpress 2018</span>
        </template>
    </div>
</template>

<script>
  import Modal from '../../components/Modal.vue'
  import Loader from '../../components/Loader.vue'
  import EmailSubscriptionForm from '../../components/forms/EmailSubscriptionForm.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as actions from '../../store/action-types'

  const {mapActions} = createNamespacedHelpers('emailSubscriptions')

  export default {
    name: 'edit-email-subscription-modal',
    components: {Modal, EmailSubscriptionForm, Loader},
    data () {
      return {
        emailSubscription: null,
        isLoading: false
      }
    },
    methods: {
      ...mapActions({
        update: actions.UPDATE
      }),
      setEmailSubscription (emailSubscription) {
        this.form.setEmailSubscription(emailSubscription)
        this.emailSubscription = emailSubscription
      },
      success (response) {
        this.isLoading = false
        this.$emit('emailSubscriptionUpdated', response.data.data)
        this.modal.close()
      },
      error (error) {
        this.isLoading = false
        console.log(error)
      },
      submit () {
        this.isLoading = true
        this.update({id: this.emailSubscription.id}).then(this.success.bind(this)).catch(this.error.bind(this))
      }
    },
    mounted () {
      this.modal = this.$children[0]
      this.form = this.modal.$children[this.modal.$children.length - 1]
    }
  }
</script>