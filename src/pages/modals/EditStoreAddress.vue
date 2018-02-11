<template>
    <div>
        <modal title="Edit Store Branch" id="editStoreAddress">
            <div class="loader-parent">
                <loader :class="{gone: !isLoading}"></loader>
            </div>
            <store-address-form @submitStoreAddress="submit"></store-address-form>
        </modal>
        <template slot="footer">
            <span class="text-sm text-center">OjaExpress 2018</span>
        </template>
    </div>
</template>

<script>
  import Modal from '../../components/Modal.vue'
  import Loader from '../../components/Loader.vue'
  import StoreAddressForm from '../../components/forms/StoreAddressForm.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as actions from '../../store/action-types'

  const {mapActions} = createNamespacedHelpers('storeAddresses')

  export default {
    name: 'edit-store-address-modal',
    components: {Modal, StoreAddressForm, Loader},
    data () {
      return {
        address: null,
        isLoading: false
      }
    },
    methods: {
      ...mapActions({
        update: actions.UPDATE
      }),
      setAddress (address) {
        this.form.setAddress(address)
        this.address = address
      },
      success (response) {
        this.isLoading = false
        this.$emit('storeAddressUpdated', response.data.data)
        this.modal.close()
      },
      error (error) {
        this.isLoading = false
        console.log(error)
      },
      submit () {
        this.isLoading = true
        this.update({id: this.address.id}).then(this.success.bind(this)).catch(this.error.bind(this))
      }
    },
    mounted () {
      this.modal = this.$children[0]
      this.form = this.modal.$children[this.modal.$children.length - 1]
    }
  }
</script>