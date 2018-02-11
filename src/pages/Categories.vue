<template>
    <div class="px-md-4 px-xs-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-shopping-basket mr-3"></i> Categories</span>
            <div class="d-flex ml-auto justify-content-around">
                <a href="#" class="btn btn-success text-white" data-toggle="modal" data-target="#createCategory">
                    <i class="fa fa-plus"></i> Create Category
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
                                <td></td>
                                <td scope="col">S/N</td>
                                <td scope="col">Name</td>
                                <td scope="col">Parent Name</td>
                                <td scope="col">Actions</td>
                            </tr>
                        </thead>
                        <tbody class="table-striped">
                            <tr v-for="(category, index) in pageData">
                               <td scope="row"><input type="checkbox" :value="category.id" class="form-group" v-model="selectedItems"> </td>
                               <td scope="row">{{index + 1}}</td>
                                <td scope="row">{{category.name}}</td>
                                <td scope="row">{{category.parent_name | showNone}}</td>
                                <td scope="row" class="text-white">
                                    <a href="#" class="btn btn-sm bg-orange" data-toggle="modal"
                                       data-target="#viewCategory" @click="viewCategory(category)">
                                        <i class="fa fa-eye"></i>View
                                    </a>
                                    <a href="#" class="btn btn-sm btn-primary" @click="editCategory(category)"
                                       data-toggle="modal" data-target="#editCategory">
                                        <i class="fa fa-edit"></i>Edit
                                    </a>
                                    <a class="btn btn-sm btn-danger" @click="confirmDelete(category)" data-toggle="modal"
                                       data-target="#deleteCategory">
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
        <modal v-if="category" id="deleteCategory" title="Delete Category" okBtnClass="btn-danger" okBtnText="Delete Category"
               dismissBtnText="Cancel" @ok="deleteCategory">
            <h3>Are you sure you want to delete this category?</h3>
            <h2>{{category.name}}</h2>
        </modal>
        <modal v-if="category" id="viewCategory" :title="categoryViewTitle">
            <h4>Name</h4>
            <p>{{category.name}}</p>
            <h4>Parent</h4>
            <p>{{category | parent}}</p>
        </modal>
        <edit-category></edit-category>
        <create-category></create-category>
    </div>
</template>

<script>
  import Modal from '../components/Modal.vue'
  import EditCategory from './modals/EditCategory.vue'
  import CreateCategory from './modals/CreateCategory.vue'
  import { createNamespacedHelpers } from 'vuex'
  import CrudPageComponent from '../core/crud-page-component'

  const { mapGetters, mapActions } = createNamespacedHelpers('categories')
  let crud = new CrudPageComponent(mapGetters, mapActions)

  export default {
    name: 'categories-page',
    components: {
      ...crud.components(), Modal, EditCategory, CreateCategory
    },
    data () {
      return {
        ...crud.data(),
        category: null
      }
    },
    methods: {
      ...crud.methods(),
      viewCategory (category) {
        this.category = category
      },
      editCategory (category) {
        this.editPage.setCategory(category)
      },
      confirmDelete (category) {
        this.category = category
      },
      deleteCategory (category) {
        this.delete({id: category.id})
        this.category = null
      }
    },
    filters: {
      showNone (name) {
        return (name !== null) ? name : 'No parent'
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
      categoryViewTitle () {
        if (!this.category) {
          return 'Category'
        }
        return `Category - ${this.category.name}`
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