<template>
    <div>
        <modal title="Edit App Permission" id="editAppPermission">
            <div class="loader-parent">
                <loader :class="{gone: !isLoading}"></loader>
            </div>
            <app-permission-form @submitAppPermission="submit"></app-permission-form>
        </modal>
        <template slot="footer">
            <span class="text-sm text-center">OjaExpress 2018</span>
        </template>
    </div>
</template>

<script>
  import Modal from '../../components/Modal.vue'
  import Loader from '../../components/Loader.vue'
  import AppPermissionForm from '../../components/forms/AppPermissionForm.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as actions from '../../store/action-types'

  const {mapActions} = createNamespacedHelpers('appPermissions')

  export default {
    name: 'edit-app-permission-modal',
    components: {Modal, AppPermissionForm, Loader},
    data () {
      return {
        appPermission: null,
        isLoading: false
      }
    },
    methods: {
      ...mapActions({
        update: actions.UPDATE
      }),
      setAppPermission (appPermission) {
        this.form.setAppPermission(appPermission)
        this.appPermission = appPermission
      },
      success (response) {
        this.isLoading = false
        this.$emit('appPermissionUpdated', response.data.data)
        this.modal.close()
      },
      error (error) {
        this.isLoading = false
        console.log(error)
      },
      submit () {
        this.isLoading = true
        this.update({id: this.appPermission.id}).then(this.success.bind(this)).catch(this.error.bind(this))
      }
    },
    mounted () {
      this.modal = this.$children[0]
      this.form = this.modal.$children[this.modal.$children.length - 1]
    }
  }
</script>