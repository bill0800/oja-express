<template>
    <div class="px-md-4 px-xs-1">
        <div class="row pb-1">
            <span class="content-title"><i class="fa fa-shopping-basket mr-3"></i> Tags</span>
            <div class="d-flex ml-auto justify-content-around">
                <a href="#" class="btn btn-success text-white" data-toggle="modal" data-target="#createTag">
                    <i class="fa fa-plus"></i> Create Tag
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
                                <input type="text" class="form-control" id="tagName" aria-describedby="emailHelp"
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
                            <tr v-for="(tag, index) in pageData">
                               <td scope="row"><input type="checkbox" :value="tag.id" class="form-group" v-model="selectedItems"> </td>
                                <td scope="row">{{tag.name}}</td>
                                <td scope="row" class="text-white">
                                    <a href="#" class="btn btn-sm bg-orange" data-toggle="modal"
                                       data-target="#viewTag" @click="viewTag(tag)">
                                        <i class="fa fa-eye"></i>View
                                    </a>
                                    <a href="#" class="btn btn-sm btn-primary" @click="editTag(tag)"
                                       data-toggle="modal" data-target="#editTag">
                                        <i class="fa fa-edit"></i>Edit
                                    </a>
                                    <a class="btn btn-sm btn-danger" @click="confirmDelete(tag)" data-toggle="modal"
                                       data-target="#deleteTag">
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
        <modal v-if="tag" id="deleteTag" title="Delete Tag" okBtnClass="btn-danger" okBtnText="Delete Tag"
               dismissBtnText="Cancel" @ok="deleteTag">
            <h3>Are you sure you want to delete this tag?</h3>
            <h2>{{tag.name}}</h2>
        </modal>
        <modal v-if="tag" id="viewTag" :title="tagViewTitle">
            <h4>Name</h4>
            <p>{{tag.name}}</p>
            <h4>Parent</h4>
            <p>{{tag | parent}}</p>
        </modal>
        <edit-tag></edit-tag>
        <create-tag></create-tag>
    </div>
</template>

<script>
  import Modal from '../components/Modal.vue'
  import EditTag from './modals/EditTag.vue'
  import CreateTag from './modals/CreateTag.vue'
  import { createNamespacedHelpers } from 'vuex'
  import CrudPageComponent from '../core/crud-page-component'

  const { mapGetters, mapActions } = createNamespacedHelpers('tags')
  let crud = new CrudPageComponent(mapGetters, mapActions)

  export default {
    name: 'tags-page',
    components: {
      ...crud.components(), Modal, EditTag, CreateTag
    },
    data () {
      return {
        ...crud.data(),
        tag: null
      }
    },
    methods: {
      ...crud.methods(),
      viewTag (tag) {
        this.tag = tag
      },
      editTag (tag) {
        this.editPage.setTag(tag)
      },
      confirmDelete (tag) {
        this.tag = tag
      },
      deleteTag (tag) {
        this.delete({id: tag.id})
        this.tag = null
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
      tagViewTitle () {
        if (!this.tag) {
          return 'Tag'
        }
        return `Tag - ${this.tag.name}`
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