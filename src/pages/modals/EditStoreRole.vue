<template>
    <div>
        <modal title="Edit Store Role" id="editStoreRole">
            <div class="loader-parent">
                <loader :class="{gone: !isLoading}"></loader>
            </div>
            <store-role-form @submitStoreRole="submit"></store-role-form>
        </modal>
        <template slot="footer">
            <span class="text-sm text-center">OjaExpress 2018</span>
        </template>
    </div>
</template>

<script>
  import Modal from '../../components/Modal.vue'
  import Loader from '../../components/Loader.vue'
  import StoreRoleForm from '../../components/forms/StoreRoleForm.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as actions from '../../store/action-types'

  const {mapActions} = createNamespacedHelpers('storeRoles')

  export default {
    name: 'edit-store-role-modal',
    components: {Modal, StoreRoleForm, Loader},
    data () {
      return {
        storeRole: null,
        isLoading: false
      }
    },
    methods: {
      ...mapActions({
        update: actions.UPDATE
      }),
      setStoreRole (storeRole) {
        this.form.setStoreRole(storeRole)
        this.storeRole = storeRole
      },
      success (response) {
        this.isLoading = false
        this.$emit('storeRoleUpdated', response.data.data)
        this.modal.close()
      },
      error (error) {
        this.isLoading = false
        console.log(error)
      },
      submit () {
        this.isLoading = true
        this.update({id: this.storeRole.id}).then(this.success.bind(this)).catch(this.error.bind(this))
      }
    },
    mounted () {
      this.modal = this.$children[0]
      this.form = this.modal.$children[this.modal.$children.length - 1]
    }
  }
</script>