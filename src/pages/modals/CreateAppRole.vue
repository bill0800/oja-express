<template>
    <div>
        <modal title="Create App Role" id="createAppRole">
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
    name: 'create-app-role-modal',
    components: {Modal, Loader, AppRoleForm},
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
        this.$emit('appRoleCreated', response.data.data)
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