<template>
    <div class="container px-lg-5 px-md-3 px-sm-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-shopping-basket mr-3"></i> Create User</span>
            <div class="d-flex ml-auto justify-content-around">
                <router-link :to="{name: links.all}" class="btn btn-success text-white">
                    <i class="fa fa-table"></i> View all
                </router-link>
            </div>

        </div>
        <div class="row col-md-12">
            <div class="card w-100">
                <div class="card-body">
                    <div class="row justify-content-center">
                        <user-form @submitUser="submit"></user-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import UserForm from '../components/forms/UserForm.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as actions from '../store/action-types'
  import {USER, USERS} from '../router/route-names'

  const {mapActions} = createNamespacedHelpers('users')

  export default {
    name: 'create-user-page',
    components: {UserForm},
    data () {
      return {
        links: {
          all: USERS
        }
      }
    },
    methods: {
      ...mapActions({
        create: actions.CREATE
      }),
      redirect (response) {
        this.form.reset()
        this.$router.replace({name: USER, params: {id: response.data.data.id}})
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