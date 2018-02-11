<template>
    <div>
        <modal title="Edit Tag" id="editTag">
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
    name: 'edit-tag-modal',
    components: {Modal, TagForm, Loader},
    data () {
      return {
        tag: null,
        isLoading: false
      }
    },
    methods: {
      ...mapActions({
        update: actions.UPDATE
      }),
      setTag (tag) {
        this.form.setTag(tag)
        this.tag = tag
      },
      success (response) {
        this.isLoading = false
        this.$emit('tagUpdated', response.data.data)
        this.modal.close()
      },
      error (error) {
        this.isLoading = false
        console.log(error)
      },
      submit () {
        this.isLoading = true
        this.update({id: this.tag.id}).then(this.success.bind(this)).catch(this.error.bind(this))
      }
    },
    mounted () {
      this.modal = this.$children[0]
      this.form = this.modal.$children[this.modal.$children.length - 1]
    }
  }
</script>