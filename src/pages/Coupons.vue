<template>
    <div class="px-md-4 px-xs-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-shopping-basket mr-3"></i> Coupons</span>
            <div class="d-flex ml-auto justify-content-around">
                <a class="btn btn-success text-white">
                    <i class="fa fa-plus"></i> Create Coupon
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
                    <table class="table">
                        <thead>
                            <tr>
                                <td scope="col">S/N</td>
                                <td scope="col">Name</td>
                                <td scope="col">Code</td>
                                <td scope="col">Actions</td>
                            </tr>
                        </thead>
                        <tbody class="table-striped">
                            <tr v-for="(coupon, index) in pageData">
                                <td scope="row"><input type="checkbox" :value="coupon.id" class="form-group" v-model="selectedItems"> </td>
                                <td scope="row">{{index + 1}}</td>
                                <td scope="row">{{coupon.name}}</td>
                                <td scope="row">{{coupon.code}}</td>
                                <td scope="row" class="text-white">
                                    <a class="btn btn-sm bg-orange"><i class="fa fa-eye"></i>View</a>
                                    <a class="btn btn-sm btn-primary"><i class="fa fa-edit"></i>Edit</a>
                                    <a class="btn btn-sm btn-danger"><i class="fa fa-trash"></i>Delete</a>
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

  const { mapGetters, mapActions } = createNamespacedHelpers('coupons')
  let crud = new CrudPageComponent(mapGetters, mapActions)

  export default {
    name: 'coupons-page',
    components: {
      ...crud.components()
    },
    data () {
      return {
        ...crud.data()
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