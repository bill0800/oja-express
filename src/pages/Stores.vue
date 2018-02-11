<template>
    <div class="container px-lg-5 px-md-3 px-sm-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-university mr-3"></i> Stores</span>
            <div class="d-flex ml-auto justify-content-around">
                <router-link :to="{name: links.create}" class="btn btn-success text-white">
                    <i class="fa fa-plus"></i> Create Store
                </router-link>
            </div>
        </div>
        <div class="row">
            <div class="card w-100">
                <div class="card-header">
                    <form class="">
                        <div class="form-row">
                            <div class="col-md-11 col-sm-9">
                                <input type="text" class="form-control" id="categoryName" aria-describedby="emailHelp"
                                       placeholder="Search" v-model="searchValue">
                            </div>
                            <div class="col-auto">
                                <button type="submit" class="btn bg-orange text-white rounded-circle">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="card-body">
                    <div class="row justify-content-center">
                        <store-widget v-for="store in filtered" class="btn col-lg-2 col-md-3 col-sm-3 col-xs-4 border-1"
                                      :name="store.name" :count="store.count" :key="store.id" :id="store.id"
                                      :src="store | store_avatar" @view="viewStore">
                        </store-widget>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <pagination :list="all" :hasMore="hasMore" @noNext="next"></pagination>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
  import StoreWidget from '../components/StoreWidget.vue'
  import { createNamespacedHelpers } from 'vuex'
  import CrudPageComponent from '../core/crud-page-component'
  import {CREATE_STORE, EDIT_STORE, STORE} from '../router/route-names'

  const { mapGetters, mapActions } = createNamespacedHelpers('stores')
  let crud = new CrudPageComponent(mapGetters, mapActions)

  export default {
    name: 'stores-page',
    components: {
      ...crud.components(),
      StoreWidget
    },
    data () {
      return {
        ...crud.data(),
        searchValue: null,
        links: {
          create: CREATE_STORE,
          edit: EDIT_STORE
        }
      }
    },
    methods: {
      ...crud.methods(),
      viewStore ({id}) {
        this.$router.push({name: STORE, params: {id: id}})
      }
    },
    computed: {
      ...crud.computed(),
      pageData () {
        return (this.pagination) ? this.pagination.pageData : []
      },
      hasMore () {
        return this.paginationData.hasOwnProperty('links') && this.paginationData.links.hasOwnProperty('next')
      },
      filtered () {
        if (!this.searchValue) {
          return this.pageData
        }
        return this.pageData.filter((store) => store.name.indexOf(this.searchValue) !== -1)
      }
    },
    mounted () {
      crud.mounted(this)
    }
  }
</script>

<style>

</style>