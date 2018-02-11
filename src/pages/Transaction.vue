<template>
    <div class="container px-lg-5 px-md-3 px-sm-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-list mr-3"></i> Transaction </span>
            <div class="d-flex ml-auto justify-content-around">
                <router-link :to="{name: links.all}" class="btn btn-success text-white">
                    <i class="fa fa-table"></i> View All
                </router-link>
            </div>
        </div>
        <div class="row w-100">
            <div v-if="!transaction && !isLoading" class="m-auto">
                <h3> Transaction with id: {{id}} not found</h3>
            </div>
            <div v-if="transaction" class="w-100">
                <div class="card">
                    <div class="card-body">
                        <h4>Total</h4>
                        <p>{{transaction.total_amount}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapGetters, createNamespacedHelpers } from 'vuex'
  import * as getters from '../store/getter-types'
  import * as actions from '../store/action-types'
  import { TRANSACTIONS } from '../router/route-names'

  const transactionMap = createNamespacedHelpers('transactions')

  export default {
    name: 'transaction-page',
    data () {
      return {
        links: {
          all: TRANSACTIONS
        }
      }
    },
    computed: {
      ...transactionMap.mapGetters({
        getEntity: getters.ITEM
      }),
      ...mapGetters({
        isLoading: getters.IS_LOADING
      }),
      id () {
        return this.$route.params.id
      },
      transaction () {
        return this.getEntity(this.id)
      }
    },
    methods: {
      ...transactionMap.mapActions({
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