<template>
    <div class="container px-lg-5 px-md-3 px-sm-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-list mr-3"></i> User </span>
            <div class="d-flex ml-auto justify-content-around">
                <router-link :to="{name: links.edit}" class="btn btn-success text-white">
                    <i class="fa fa-edit"></i> Edit
                </router-link>
            </div>
        </div>
        <div class="row w-100">
            <div v-if="!user" class="m-auto">
                <h3> User with id: {{id}} not found</h3>
            </div>
            <div v-if="user" class="w-100">
                <div class="card">
                    <div class="card-body">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import * as getters from '../store/getter-types'
  import * as actions from '../store/action-types'
  import { EDIT_USER } from '../router/route-names'

  const {mapGetters, mapActions} = createNamespacedHelpers('users')

  export default {
    name: 'user-page',
    data () {
      return {
        links: {
          edit: EDIT_USER
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
      user () {
        return this.getEntity(this.id)
      }
    },
    methods: {
      ...mapActions({
        load: actions.GET
      })
    },
    mounted () {
      this.load({id: this.id}).then(
        (response) => {}
      )
    }
  }
</script>