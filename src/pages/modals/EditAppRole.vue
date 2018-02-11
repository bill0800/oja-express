<template>
    <div>
        <modal title="Edit App Role" id="editAppRole">
            <div class="loader-parent">
                <loader :class="{gone: !isLoading}"></loader>
            </div>
            <app-role-form @submitAppRole="submit"></app-role-form>
        </modal>
        <template slot="footer">
            <span class="text-sm text-center">OjaExpress 2018</span>
        </template>
    </div>
</template>

<script>
  import Modal from '../../components/Modal.vue'
  import Loader from '../../components/Loader.vue'
  import AppRoleForm from '../../components/forms/AppRoleForm.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as actions from '../../store/action-types'

  const {mapActions} = createNamespacedHelpers('appRoles')

  export default {
    name: 'edit-app-role-modal',
    components: {Modal, AppRoleForm, Loader},
    data () {
      return {
        appRole: null,
        isLoading: false
      }
    },
    methods: {
      ...mapActions({
        update: actions.UPDATE
      }),
      setAppRole (appRole) {
        this.form.setAppRole(appRole)
        this.appRole = appRole
      },
      success (response) {
        this.isLoading = false
        this.$emit('appRoleUpdated', response.data.data)
        this.modal.close()
      },
      error (error) {
        this.isLoading = false
        console.log(error)
      },
      submit () {
        this.isLoading = true
        this.update({id: this.appRole.id}).then(this.success.bind(this)).catch(this.error.bind(this))
      }
    },
    mounted () {
      this.modal = this.$children[0]
      this.form = this.modal.$children[this.modal.$children.length - 1]
    }
  }
</script>