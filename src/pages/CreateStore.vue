<template>
    <div class="container px-lg-5 px-md-3 px-sm-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-university mr-3"></i> Create Store</span>
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
  import * as actions from '../store/action-types'
  import {STORE, STORES} from '../router/route-names'

  const {mapActions} = createNamespacedHelpers('stores')

  export default {
    name: 'create-store-page',
    components: {StoreForm},
    data () {
      return {
        links: {
          all: STORES
        }
      }
    },
    methods: {
      ...mapActions({
        create: actions.CREATE
      }),
      redirect (response) {
        this.form.reset()
        this.$router.replace({name: STORE, params: {id: response.data.data.id}})
      },
      submit () {
        this.create().then(this.redirect.bind(this))
      }
    },
    mounted () {
      this.form = this.$children[this.$children.length - 1]
    }
  }
</script>

<style scoped>
</style>