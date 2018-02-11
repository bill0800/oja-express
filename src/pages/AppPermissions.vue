<template>
    <div class="px-md-4 px-xs-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-shopping-basket mr-3"></i> App Permissions</span>
            <div class="d-flex ml-auto justify-content-around">
                <a href="#" class="btn btn-success text-white" data-toggle="modal" data-target="#createAppPermission">
                    <i class="fa fa-plus"></i> Create App Permission
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
                                <input type="text" class="form-control" id="appPermissionName" aria-describedby="emailHelp" placeholder="Search">
                            </div>
                            <div class="col-auto">
                                <button type="submit" class="btn bg-orange text-white rounded-circle"><i class="fa fa-search"></i></button>
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
                        <tr v-for="(appPermission, index) in pageData">
                            <td scope="row"><input type="checkbox" :value="appPermission.id" class="form-group" v-model="selectedItems"></td>
                            <td scope="row">{{appPermission.name}}</td>
                            <td scope="row" class="text-white">
                                <a href="#" class="btn btn-sm bg-orange" data-toggle="modal" data-target="#viewAppPermission" @click="viewAppPermission(appPermission)">
                                    <i class="fa fa-eye"></i>View
                                </a>
                                <a href="#" class="btn btn-sm btn-primary" @click="editAppPermission(appPermission)" data-toggle="modal" data-target="#editAppPermission">
                                    <i class="fa fa-edit"></i>Edit
                                </a>
                                <a class="btn btn-sm btn-danger" @click="confirmDelete(appPermission)" data-toggle="modal" data-target="#deleteAppPermission">
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
        <modal v-if="appPermission" id="deleteAppPermission" title="Delete AppPermission" okBtnClass="btn-danger" okBtnText="Delete AppPermission" dismissBtnText="Cancel" @ok="deleteAppPermission">
            <h3>Are you sure you want to delete this appPermission?</h3>
            <h2>{{appPermission.name}}</h2>
        </modal>
        <modal v-if="appPermission" id="viewAppPermission" :title="appPermissionViewTitle">
            <h4>Name</h4>
            <p>{{appPermission.name}}</p>
            <h4>Parent</h4>
            <p>{{appPermission | parent}}</p>
        </modal>
        <edit-app-permission></edit-app-permission>
        <create-app-permission></create-app-permission>
    </div>
</template>

<script>
  import Modal from '../components/Modal.vue'
  import EditAppPermission from './modals/EditAppPermission.vue'
  import CreateAppPermission from './modals/CreateAppPermission.vue'
  import { createNamespacedHelpers } from 'vuex'
  import CrudPageComponent from '../core/crud-page-component'

  const { mapGetters, mapActions } = createNamespacedHelpers('appPermissions')
  let crud = new CrudPageComponent(mapGetters, mapActions)

  export default {
    name: 'appPermissions-page',
    components: {
      ...crud.components(), Modal, EditAppPermission, CreateAppPermission
    },
    data () {
      return {
        ...crud.data(),
        appPermission: null
      }
    },
    methods: {
      ...crud.methods(),
      viewAppPermission (appPermission) {
        this.appPermission = appPermission
      },
      editAppPermission (appPermission) {
        this.editPage.setAppPermission(appPermission)
      },
      confirmDelete (appPermission) {
        this.appPermission = appPermission
      },
      deleteAppPermission (appPermission) {
        this.delete({id: appPermission.id})
        this.appPermission = null
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
      appPermissionViewTitle () {
        if (!this.appPermission) {
          return 'App Permission'
        }
        return `App Permission - ${this.appPermission.name}`
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