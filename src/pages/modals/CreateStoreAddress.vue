<template>
    <div>
        <modal title="Create Store Branch" id="createStoreAddress">
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
    name: 'create-store-address-modal',
    components: {Modal, Loader, StoreAddressForm},
    data () {
      return {
        isLoading: false
      }
    },
    methods: {
      ...mapActions({
        create: actions.CREATE
      }),
      setStore (store) {
        this.isLoading = false
        this.form.setAddress({store_id: store.id})
      },
      success (response) {
        this.isLoading = false
        this.$emit('storeAddressCreated', response.data.data)
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