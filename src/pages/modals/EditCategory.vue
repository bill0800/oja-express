<template>
    <div>
        <modal title="Edit Category" id="editCategory">
            <div class="loader-parent">
                <loader :class="{gone: !isLoading}"></loader>
            </div>
            <category-form @submitCategory="submit"></category-form>
        </modal>
        <template slot="footer">
            <span class="text-sm text-center">OjaExpress 2018</span>
        </template>
    </div>
</template>

<script>
  import Modal from '../../components/Modal.vue'
  import Loader from '../../components/Loader.vue'
  import CategoryForm from '../../components/forms/CategoryForm.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as actions from '../../store/action-types'

  const {mapActions} = createNamespacedHelpers('categories')

  export default {
    name: 'edit-category-modal',
    components: {Modal, CategoryForm, Loader},
    data () {
      return {
        category: null,
        isLoading: false
      }
    },
    methods: {
      ...mapActions({
        update: actions.UPDATE
      }),
      setCategory (category) {
        this.form.setCategory(category)
        this.category = category
      },
      success (response) {
        this.isLoading = false
        this.$emit('categoryUpdated', response.data.data)
        this.modal.close()
      },
      error (error) {
        this.isLoading = false
        console.log(error)
      },
      submit () {
        this.isLoading = true
        this.update({id: this.category.id}).then(this.success.bind(this)).catch(this.error.bind(this))
      }
    },
    mounted () {
      this.modal = this.$children[0]
      this.form = this.modal.$children[this.modal.$children.length - 1]
    }
  }
</script>