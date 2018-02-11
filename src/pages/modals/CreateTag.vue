<template>
    <div>
        <modal title="Create Tag" id="createTag">
            <div class="loader-parent">
                <loader :class="{gone: !isLoading}"></loader>
            </div>
            <tag-form @submitTag="submit"></tag-form>
        </modal>
        <template slot="footer">
            <span class="text-sm text-center">OjaExpress 2018</span>
        </template>
    </div>
</template>

<script>
  import Modal from '../../components/Modal.vue'
  import Loader from '../../components/Loader.vue'
  import TagForm from '../../components/forms/TagForm.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as actions from '../../store/action-types'

  const {mapActions} = createNamespacedHelpers('tags')

  export default {
    name: 'create-tag-modal',
    components: {Modal, Loader, TagForm},
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
        this.$emit('tagCreated', response.data.data)
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