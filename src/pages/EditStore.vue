<template>
    <div class="container px-lg-5 px-md-3 px-sm-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-university mr-3"></i> Edit Store</span>
            <div class="d-flex ml-auto justify-content-around">
                <router-link :to="{name: links.all}" class="btn btn-success text-white">
                    <i class="fa fa-table"></i> View all
                </router-link>
            </div>

        </div>
        <div class="row">
            <div class="card w-100">
                <div class="card-body">
                    <div class="row justify-content-center">
                        <store-form @submitStore="submit"></store-form>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
  import StoreForm from '../components/forms/StoreForm.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as getters from '../store/getter-types'
  import * as actions from '../store/action-types'
  import { STORES, STORE } from '../router/route-names'

  const {mapGetters, mapActions} = createNamespacedHelpers('stores')

  export default {
    name: 'edit-store-page',
    components: {StoreForm},
    data () {
      return {
        form: null,
        links: {
          all: STORES
        }
      }
    },
    computed: {
      ...mapGetters({
        getEntity: getters.ITEM
      }),
      id () {
        return this.$route.params.id
      },
      store () {
        return this.getEntity(this.id)
      }
    },
    methods: {
      ...mapActions({
        load: actions.GET,
        update: actions.UPDATE
      }),
      onEntityLoaded (response) {
        this.form.setStore(response.data.data)
      },
      onEntityUpdated (response) {
        this.form.reset()
        this.$router.push({name: STORE, params: {id: response.data.data.id}})
      },
      submit () {
        this.update({id: this.id}).then(this.onEntityUpdated.bind(this))
      }
    },
    mounted () {
      this.load({id: this.id}).then(this.onEntityLoaded.bind(this))
      this.form = this.$children[this.$children.length - 1]
    }
  }
</script>

<style>

</style>