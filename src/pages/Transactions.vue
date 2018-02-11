<template>
    <div class="container px-md-4 px-xs-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-shopping-basket mr-3"></i> Transactions</span>
            <div class="d-flex ml-auto justify-content-around">

                <a class="btn btn-danger text-white ml-md-2 d-sm-block">
                    <i class="fa fa-trash"></i> Bulk Delete
                </a>
            </div>

        </div>
        <div class="container row">
            <div class="card col-md-12">
                <div class="card-header">
                    <form>
                        <div class="form-row">
                            <div class="col-2">
                                <select class="form-control" id="exampleFormControlSelect">
                                    <option>id</option>
                                    <option>name</option>
                                    <option>display name</option>
                                </select>
                            </div>
                            <div class="col-2">
                                <select class="form-control" id="exampleFormControlSelect1">
                                    <option>=</option>
                                    <option>like</option>
                                    <option><></option>
                                </select>
                            </div>
                            <div class="col-7">
                                <input type="text" class="form-control" id="categoryName" aria-describedby="emailHelp"
                                       placeholder="Search">
                            </div>
                            <div class="col-auto">
                                <button type="submit" class="btn bg-orange text-white rounded-circle"><i
                                        class="fa fa-search"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="card-body">
                    <table class="table table-striped table-responsive">
                        <thead class="font-weight-bold">
                            <tr>
                                <td scope="col"></td>
                                <td scope="col">S/N</td>
                                <td scope="col">User</td>
                                <td scope="col">Email</td>
                                <td scope="col">Grand Net cost</td>
                                <td scope="col">Amount</td>
                                <td scope="col">State</td>
                                <td scope="col">Datetime</td>
                                <td scope="col">Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(transaction, index) in pageData">
                                <td scope="row"><input type="checkbox" :value="transaction.id" class="form-group" v-model="selectedItems"></td>
                                <td scope="row">{{index + 1}}</td>
                                <td scope="row"><img class="img-thumbnail" width="64" :src="{avatar: transaction.user_avatar, first_name: transaction.user_first_name, last_name: transaction.user_last_name} | user_avatar"></td>
                                <td scope="row">{{transaction.user_email}}</td>
                                <td scope="row">{{transaction.order_grand_net_cost | to2dp}}</td>
                                <td scope="row">{{transaction.total_amount | to2dp}}</td>
                                <td scope="row">{{transaction.state}}</td>
                                <td scope="row">{{transaction.created_at | rel_time}}</td>
                                <td scope="row" class="text-white">
                                    <router-link :to="{name: links.view, params: {id: transaction.id}}" class="btn btn-sm bg-orange">
                                        <i class="fa fa-eye"></i>View
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="card-footer text-center">
                    <pagination :list="all" :hasMore="hasMore" @noNext="next"></pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import CrudPageComponent from '../core/crud-page-component'
  import {ORDER, TRANSACTION} from '../router/route-names'

  const { mapGetters, mapActions } = createNamespacedHelpers('transactions')
  let crud = new CrudPageComponent(mapGetters, mapActions)

  export default {
    name: 'transactions-page',
    components: {
      ...crud.components()
    },
    data () {
      return {
        ...crud.data(),
        links: {
          viewOrder: ORDER,
          view: TRANSACTION
        }
      }
    },
    methods: {
      ...crud.methods()
    },
    computed: {
      ...crud.computed(this),
      pageData () {
        return (this.pagination) ? this.pagination.pageData : []
      },
      hasMore () {
        return this.paginationData.hasOwnProperty('links') && this.paginationData.links.hasOwnProperty('next')
      }
    },
    mounted () {
      crud.mounted(this)
    }
  }
</script>