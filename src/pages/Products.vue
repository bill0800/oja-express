<template>
    <div class="px-md-4 px-xs-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-shopping-basket mr-3"></i> Products</span>
            <div class="d-flex ml-auto justify-content-around">
                <router-link :to="{name: links.create}" class="btn btn-success text-white">
                    <i class="fa fa-plus"></i> Create Product
                </router-link>
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
                    <table class="table table-md-responsive table-striped">
                        <thead>
                            <tr>
                                <td scope="col">S/N</td>
                                <td scope="col">Avatar</td>
                                <td scope="col">Name</td>
                                <td scope="col">Price</td>
                                <td scope="col">Traction</td>
                                <td scope="col">Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in pageData">
                               <td>{{index + 1}}</td>
                               <td><img :src="product.images.data[0].image_url" width="64"/> </td>
                                <td>{{product.name}}</td>
                                <td>${{product.price | to2dp}} per {{product.unit_of_measure}}</td>
                                <td>{{product.number_sold}} / {{product.number_in_stock + product.number_sold}} sold</td>
                                <td class="text-white">
                                    <router-link :to="{name: links.view, params: {id: product.id}}" class="btn btn-sm bg-orange">
                                        <i class="fa fa-eye"></i>View
                                    </router-link>
                                    <router-link :to="{name: links.edit, params: {id: product.id}}" class="btn btn-sm btn-primary">
                                        <i class="fa fa-edit"></i>Edit
                                    </router-link>
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
  import {PRODUCT, CREATE_PRODUCT, EDIT_PRODUCT} from '../router/route-names'

  const { mapGetters, mapActions } = createNamespacedHelpers('products')
  let crud = new CrudPageComponent(mapGetters, mapActions)

  export default {
    name: 'products-page',
    components: {
      ...crud.components()
    },
    data () {
      return {
        ...crud.data(),
        links: {
          create: CREATE_PRODUCT,
          view: PRODUCT,
          edit: EDIT_PRODUCT
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