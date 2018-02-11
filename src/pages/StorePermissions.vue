<template>
    <div class="px-md-4 px-xs-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-shopping-basket mr-3"></i> Store Permissions</span>
            <div class="d-flex ml-auto justify-content-around">
                <a href="#" class="btn btn-success text-white" data-toggle="modal" data-target="#createStorePermission">
                    <i class="fa fa-plus"></i> Create Store Permission
                </a>

                <a class="btn btn-danger text-white ml-md-2 d-sm-block disabled">
                    <i class="fa fa-trash"></i> Bulk Delete
                </a>
            </div>

        </div>
        <div class="row">
            <div class="card w-100">
                <div class="card-header">
                    <form class="">
                        <div class="form-row">
                            <div class="col-11">
                                <input type="text" class="form-control" id="storePermissionName" aria-describedby="emailHelp"
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
                            <td></td>
                            <td scope="col">Name</td>
                            <td scope="col">Actions</td>
                        </tr>
                        </thead>
                        <tbody class="table-striped">
                        <tr v-for="(storePermission, index) in pageData">
                            <td scope="row"><input type="checkbox" :value="storePermission.id" class="form-group" v-model="selectedItems"> </td>
                            <td scope="row">{{storePermission.name}}</td>
                            <td scope="row" class="text-white">
                                <a href="#" class="btn btn-sm bg-orange" data-toggle="modal"
                                   data-target="#viewStorePermission" @click="viewStorePermission(storePermission)">
                                    <i class="fa fa-eye"></i>View
                                </a>
                                <a href="#" class="btn btn-sm btn-primary" @click="editStorePermission(storePermission)"
                                   data-toggle="modal" data-target="#editStorePermission">
                                    <i class="fa fa-edit"></i>Edit
                                </a>
                                <a class="btn btn-sm btn-danger" @click="confirmDelete(storePermission)" data-toggle="modal"
                                   data-target="#deleteStorePermission">
                                    <i class="fa fa-trash"></i>Delete
                                </a>
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
        <modal v-if="storePermission" id="deleteStorePermission" title="Delete StorePermission" okBtnClass="btn-danger" okBtnText="Delete StorePermission"
               dismissBtnText="Cancel" @ok="deleteStorePermission">
            <h3>Are you sure you want to delete this storePermission?</h3>
            <h2>{{storePermission.name}}</h2>
        </modal>
        <modal v-if="storePermission" id="viewStorePermission" :title="storePermissionViewTitle">
            <h4>Name</h4>
            <p>{{storePermission.name}}</p>
            <h4>Parent</h4>
            <p>{{storePermission | parent}}</p>
        </modal>
        <edit-store-permission></edit-store-permission>
        <create-store-permission></create-store-permission>
    </div>
</template>

<script>
  import Modal from '../components/Modal.vue'
  import EditStorePermission from './modals/EditStorePermission.vue'
  import CreateStorePermission from './modals/CreateStorePermission.vue'
  import { createNamespacedHelpers } from 'vuex'
  import CrudPageComponent from '../core/crud-page-component'

  const { mapGetters, mapActions } = createNamespacedHelpers('storePermissions')
  let crud = new CrudPageComponent(mapGetters, mapActions)

  export default {
    name: 'storePermissions-page',
    components: {
      ...crud.components(), Modal, EditStorePermission, CreateStorePermission
    },
    data () {
      return {
        ...crud.data(),
        storePermission: null
      }
    },
    methods: {
      ...crud.methods(),
      viewStorePermission (storePermission) {
        this.storePermission = storePermission
      },
      editStorePermission (storePermission) {
        this.editPage.setStorePermission(storePermission)
      },
      confirmDelete (storePermission) {
        this.storePermission = storePermission
      },
      deleteStorePermission (storePermission) {
        this.delete({id: storePermission.id})
        this.storePermission = null
      }
    },
    computed: {
      ...crud.computed(this),
      pageData () {
        return (this.pagination) ? this.pagination.pageData : []
      },
      hasMore () {
        return this.paginationData.hasOwnProperty('links') && this.paginationData.links.hasOwnProperty('next')
      },
      storePermissionViewTitle () {
        if (!this.storePermission) {
          return 'Store Permission'
        }
        return `Store Permission - ${this.storePermission.name}`
      }
    },
    mounted () {
      let n = this.$children.length
      this.pagination = this.$children[0]
      this.viewModal = this.$children[n - 3]
      this.editPage = this.$children[n - 2]
      this.createPage = this.$children[n - 1]
    }
  }
</script>