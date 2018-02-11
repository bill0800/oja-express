<template>
    <div class="px-md-4 px-xs-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-shopping-basket mr-3"></i> Orders</span>
            <div class="d-flex ml-auto justify-content-around">
                <a class="btn btn-success text-white">
                    <i class="fa fa-plus"></i> Create Order
                </a>

                <a class="btn btn-danger text-white ml-md-2 d-sm-block">
                    <i class="fa fa-trash"></i> Bulk Delete
                </a>
            </div>

        </div>
        <div class="row">
            <div class="card w-100">
                <div class="card-header">
                    <form class="">
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
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <td scope="col">User Email</td>
                                <td scope="col">Phone</td>
                                <td scope="col">Amount</td>
                                <td scope="col">Time</td>
                                <td scope="col">Action</td>
                            </tr>
                        </thead>
                        <tbody class="table-striped">
                            <tr v-for="(order, index) in pageData">
                                <td scope="row">
                                    <router-link :to="{name: links.user, params: {id: order.user_id}}">
                                        {{order.user_email}}
                                    </router-link>
                                </td>
                                <td scope="row">{{order.user_phone_number}}</td>
                                <td scope="row">${{order.grand_net_cost | to2dp}}</td>
                                <td scope="row">{{order.created_at | rel_time}}</td>
                                <td scope="row" class="text-white">
                                    <router-link :to="{name: links.view, params: {id: order.id}}" class="btn btn-sm bg-orange">
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
  import {ORDERS, ORDER, CREATE_ORDER, EDIT_ORDER, USER} from '../router/route-names'

  const { mapGetters, mapActions } = createNamespacedHelpers('orders')
  let crud = new CrudPageComponent(mapGetters, mapActions)

  export default {
    name: 'orders-page',
    components: {
      ...crud.components()
    },
    data () {
      return {
        ...crud.data(),
        links: {
          all: ORDERS,
          view: ORDER,
          edit: EDIT_ORDER,
          create: CREATE_ORDER,
          user: USER
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