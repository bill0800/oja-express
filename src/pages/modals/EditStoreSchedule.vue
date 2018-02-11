<template>
    <div>
        <modal title="Edit Store Branch" id="editStoreSchedule">
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
    name: 'edit-store-schedule-modal',
    components: {Modal, StoreScheduleForm, Loader},
    data () {
      return {
        schedule: null,
        isLoading: false
      }
    },
    methods: {
      ...mapActions({
        update: actions.UPDATE
      }),
      setSchedule (schedule) {
        this.form.setSchedule(schedule)
        this.schedule = schedule
      },
      success (response) {
        this.isLoading = false
        this.$emit('storeScheduleUpdated', response.data.data)
        this.modal.close()
      },
      error (error) {
        this.isLoading = false
        console.log(error)
      },
      submit () {
        this.isLoading = true
        this.update({id: this.schedule.id}).then(this.success.bind(this)).catch(this.error.bind(this))
      }
    },
    mounted () {
      this.modal = this.$children[0]
      this.form = this.modal.$children[this.modal.$children.length - 1]
    }
  }
</script>