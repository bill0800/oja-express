<template>
    <div>
        <modal title="Create Store Permission" id="createStorePermission">
            <div class="loader-parent">
                <loader :class="{gone: !isLoading}"></loader>
            </div>
            <store-permission-form @submitStorePermission="submit"></store-permission-form>
        </modal>
        <template slot="footer">
            <span class="text-sm text-center">OjaExpress 2018</span>
        </template>
    </div>
</template>

<script>
  import Modal from '../../components/Modal.vue'
  import Loader from '../../components/Loader.vue'
  import StorePermissionForm from '../../components/forms/StorePermissionForm.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as actions from '../../store/action-types'

  const {mapActions} = createNamespacedHelpers('storePermissions')

  export default {
    name: 'create-store-permission-modal',
    components: {Modal, Loader, StorePermissionForm},
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
        this.$emit('storePermissionCreated', response.data.data)
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