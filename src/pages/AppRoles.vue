<template>
    <div class="px-md-4 px-xs-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-shopping-basket mr-3"></i> App Roles </span>
            <div class="d-flex ml-auto justify-content-around">
                <a href="#" class="btn btn-success text-white" data-toggle="modal" data-target="#createAppRole">
                    <i class="fa fa-plus"></i> Create App Role
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
                                <input type="text" class="form-control" id="appRoleName" aria-describedby="emailHelp"
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
                        <tr v-for="(appRole, index) in pageData">
                            <td scope="row"><input type="checkbox" :value="appRole.id" class="form-group" v-model="selectedItems"> </td>
                            <td scope="row">{{appRole.name}}</td>
                            <td scope="row" class="text-white">
                                <a href="#" class="btn btn-sm bg-orange" data-toggle="modal"
                                   data-target="#viewAppRole" @click="viewAppRole(appRole)">
                                    <i class="fa fa-eye"></i>View
                                </a>
                                <a href="#" class="btn btn-sm btn-primary" @click="editAppRole(appRole)"
                                   data-toggle="modal" data-target="#editAppRole">
                                    <i class="fa fa-edit"></i>Edit
                                </a>
                                <a class="btn btn-sm btn-danger" @click="confirmDelete(appRole)" data-toggle="modal"
                                   data-target="#deleteAppRole">
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
        <modal v-if="appRole" id="deleteAppRole" title="Delete App Role" okBtnClass="btn-danger" okBtnText="Delete AppRole"
               dismissBtnText="Cancel" @ok="deleteAppRole">
            <h3>Are you sure you want to delete this appRole?</h3>
            <h2>{{appRole.name}}</h2>
        </modal>
        <modal v-if="appRole" id="viewAppRole" :title="appRoleViewTitle">
            <h4>Name</h4>
            <p>{{appRole.name}}</p>
            <h4>Display Name</h4>
            <p>{{appRole.display_name}}</p>
        </modal>
        <edit-app-role></edit-app-role>
        <create-app-role></create-app-role>
    </div>
</template>

<script>
  import Modal from '../components/Modal.vue'
  import EditAppRole from './modals/EditAppRole.vue'
  import CreateAppRole from './modals/CreateAppRole.vue'
  import { createNamespacedHelpers } from 'vuex'
  import CrudPageComponent from '../core/crud-page-component'

  const { mapGetters, mapActions } = createNamespacedHelpers('appRoles')
  let crud = new CrudPageComponent(mapGetters, mapActions)

  export default {
    name: 'app-roles-page',
    components: {
      ...crud.components(), Modal, EditAppRole, CreateAppRole
    },
    data () {
      return {
        ...crud.data(),
        appRole: null
      }
    },
    methods: {
      ...crud.methods(),
      viewAppRole (appRole) {
        this.appRole = appRole
      },
      editAppRole (appRole) {
        this.editPage.setAppRole(appRole)
      },
      confirmDelete (appRole) {
        this.appRole = appRole
      },
      deleteAppRole (appRole) {
        this.delete({id: appRole.id})
        this.appRole = null
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
      appRoleViewTitle () {
        if (!this.appRole) {
          return 'App Role'
        }
        return `App Role - ${this.appRole.name}`
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