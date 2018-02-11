<template>
    <div>
        <modal title="Create Store Schedule" id="createStoreSchedule">
            <div class="loader-parent">
                <loader :class="{gone: !isLoading}"></loader>
            </div>
            <store-schedule-form @submitStoreSchedule="submit"></store-schedule-form>
        </modal>
        <template slot="footer">
            <span class="text-sm text-center">OjaExpress 2018</span>
        </template>
    </div>
</template>

<script>
  import Modal from '../../components/Modal.vue'
  import Loader from '../../components/Loader.vue'
  import StoreScheduleForm from '../../components/forms/StoreScheduleForm.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as actions from '../../store/action-types'

  const {mapActions} = createNamespacedHelpers('storeSchedules')

  export default {
    name: 'create-store-schedule-modal',
    components: {Modal, Loader, StoreScheduleForm},
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
        this.form.setSchedule({store_id: store.id})
      },
      success (response) {
        this.isLoading = false
        this.$emit('storeScheduleCreated', response.data.data)
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