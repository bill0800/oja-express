<template>
    <div>
        <modal title="Edit Store Permission" id="editStorePermission">
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
    name: 'edit-store-permission-modal',
    components: {Modal, StorePermissionForm, Loader},
    data () {
      return {
        storePermission: null,
        isLoading: false
      }
    },
    methods: {
      ...mapActions({
        update: actions.UPDATE
      }),
      setStorePermission (storePermission) {
        this.form.setStorePermission(storePermission)
        this.storePermission = storePermission
      },
      success (response) {
        this.isLoading = false
        this.$emit('storePermissionUpdated', response.data.data)
        this.modal.close()
      },
      error (error) {
        this.isLoading = false
        console.log(error)
      },
      submit () {
        this.isLoading = true
        this.update({id: this.storePermission.id}).then(this.success.bind(this)).catch(this.error.bind(this))
      }
    },
    mounted () {
      this.modal = this.$children[0]
      this.form = this.modal.$children[this.modal.$children.length - 1]
    }
  }
</script>