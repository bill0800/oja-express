<template>
    <div class="px-md-4 px-xs-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-shopping-basket mr-3"></i> Store Roles </span>
            <div class="d-flex ml-auto justify-content-around">
                <a href="#" class="btn btn-success text-white" data-toggle="modal" data-target="#createStoreRole">
                    <i class="fa fa-plus"></i> Create Store Role
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
                                <input type="text" class="form-control" id="storeRoleName" aria-describedby="emailHelp"
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
                        <tr v-for="(storeRole, index) in pageData">
                            <td scope="row"><input type="checkbox" :value="storeRole.id" class="form-group" v-model="selectedItems"> </td>
                            <td scope="row">{{storeRole.name}}</td>
                            <td scope="row" class="text-white">
                                <a href="#" class="btn btn-sm bg-orange" data-toggle="modal"
                                   data-target="#viewStoreRole" @click="viewStoreRole(storeRole)">
                                    <i class="fa fa-eye"></i>View
                                </a>
                                <a href="#" class="btn btn-sm btn-primary" @click="editStoreRole(storeRole)"
                                   data-toggle="modal" data-target="#editStoreRole">
                                    <i class="fa fa-edit"></i>Edit
                                </a>
                                <a class="btn btn-sm btn-danger" @click="confirmDelete(storeRole)" data-toggle="modal"
                                   data-target="#deleteStoreRole">
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
        <modal v-if="storeRole" id="deleteStoreRole" title="Delete Store Role" okBtnClass="btn-danger" okBtnText="Delete StoreRole"
               dismissBtnText="Cancel" @ok="deleteStoreRole">
            <h3>Are you sure you want to delete this storeRole?</h3>
            <h2>{{storeRole.name}}</h2>
        </modal>
        <modal v-if="storeRole" id="viewStoreRole" :title="storeRoleViewTitle">
            <h4>Name</h4>
            <p>{{storeRole.name}}</p>
            <h4>Display Name</h4>
            <p>{{storeRole.display_name}}</p>
        </modal>
        <edit-store-role></edit-store-role>
        <create-store-role></create-store-role>
    </div>
</template>

<script>
  import Modal from '../components/Modal.vue'
  import EditStoreRole from './modals/EditStoreRole.vue'
  import CreateStoreRole from './modals/CreateStoreRole.vue'
  import { createNamespacedHelpers } from 'vuex'
  import CrudPageComponent from '../core/crud-page-component'

  const { mapGetters, mapActions } = createNamespacedHelpers('storeRoles')
  let crud = new CrudPageComponent(mapGetters, mapActions)

  export default {
    name: 'store-roles-page',
    components: {
      ...crud.components(), Modal, EditStoreRole, CreateStoreRole
    },
    data () {
      return {
        ...crud.data(),
        storeRole: null
      }
    },
    methods: {
      ...crud.methods(),
      viewStoreRole (storeRole) {
        this.storeRole = storeRole
      },
      editStoreRole (storeRole) {
        this.editPage.setStoreRole(storeRole)
      },
      confirmDelete (storeRole) {
        this.storeRole = storeRole
      },
      deleteStoreRole (storeRole) {
        this.delete({id: storeRole.id})
        this.storeRole = null
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
      storeRoleViewTitle () {
        if (!this.storeRole) {
          return 'Store Role'
        }
        return `Store Role - ${this.storeRole.name}`
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