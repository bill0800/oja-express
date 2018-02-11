<template>
    <div class="w-100">
        <div class="alert alert-danger fade show"
             :class="{gone: errorMsg === null}" role="alert">
            {{errorMsg}}
        </div>
        <form class="col-md-12" @submit.prevent="submit"
              @keydown="clearErrors($event.target.name)">
            <div class="form-group">
                <label for="role_id">Select Role<span class="text-danger">*</span></label>
                <select id="role_id" class="form-control"
                        name="role_id" v-model="roleId" @change="selectRole">
                    <option v-for="role in roles" :value="role.id">{{role.display_name}}</option>
                </select>
                <span class="text-danger" :class="{hidden: !fieldHasError('role_id')}">
                    {{fieldError('role_id')}}
                </span>
            </div>
            <div v-if="roleId !== null" class="form-group">
                <label>Select Permissions that apply to this role</label>
                <div class="row col-md-12 mb-2">
                    <div v-for="permission in permissionsPageData" class="list-group-item card col"
                         @click="togglePermission(permission)" :class="{active: selectedPermissions.hasOwnProperty(permission.id)}">
                        <div class="card-body">
                            <span class="d-inline-block font-weight-bold">{{permission.display_name}}</span>
                            <span class="d-inline-block">{{permission.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <pagination :hasMore="hasMorePermissions" :list="permissions"
                            :itemsPerPage="15" @noNext="nextPermissions">
                </pagination>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-block btn-success" :class="{disabled: anyError}">Save</button>
            </div>
        </form>
    </div>

</template>

<script>
  import Pagination from '../Pagination.vue'
  import { createNamespacedHelpers } from 'vuex'
  import * as getters from '../../store/getter-types'
  import * as mutations from '../../store/mutation-types'
  import * as actions from '../../store/action-types'

  const {mapGetters, mapMutations} = createNamespacedHelpers('appRolePermissions')
  const roleMap = createNamespacedHelpers('appRoles')
  const permissionMap = createNamespacedHelpers('appPermissions')

  export default {
    name: 'app-role-permission-form',
    components: {Pagination},
    data () {
      return {
        role: null,
        selectedPermissions: {},
        permissionsPagination: null
      }
    },
    methods: {
      ...mapMutations({
        setFormField: mutations.SET_FORM_FIELD,
        clearErrors: mutations.CLEAR_ERRORS,
        recordErrors: mutations.RECORD_ERRORS,
        reset: mutations.RESET
      }),
      ...permissionMap.mapActions({
        nextPermissions: actions.FETCH_NEXT
      }),
      ...roleMap.mapActions({
        loadRole: actions.GET
      }),
      selectPermission (permission) {
        let newEntry = {}
        newEntry[permission.id] = permission
        this.selectedPermissions = {...this.selectedPermissions, ...newEntry}
      },
      selectRole () {
        this.loadRole({id: this.roleId}).then((response) => {
          let permissions = response.data.data.permissions.data
          let dict = {}
          permissions.forEach((perm) => {
            dict[perm.id] = perm
          })
          this.selectedPermissions = {...dict}
        }).catch((errors) => {
          console.log(errors)
        })
      },
      deselectPermission (permission) {
        let newSet = this.selectedPermissions
        delete newSet[permission.id]
        this.selectedPermissions = {...newSet}
      },
      isPermissionSelected (permission) {
        return this.selectedPermissions.hasOwnProperty(permission.id)
      },
      togglePermission (permission) {
        if (this.isPermissionSelected(permission)) {
          this.deselectPermission(permission)
        } else {
          this.selectPermission(permission)
        }
      },
      setRolePermission (category) {
        this.name = category.name
        this.parent = category.parent_id
      },
      submit () {
        if (this.anyError) {
          return
        }
        this.$emit('submitRolePermission')
      }
    },
    computed: {
      ...mapGetters({
        getFormField: getters.GET_FORM_FIELD,
        errorMsg: getters.GET_ERROR_MSG,
        fieldHasError: getters.HAS_ERROR_IN_FIELD,
        anyError: getters.ANY_ERRORS,
        fieldError: getters.GET_ERROR_BY_FIELD,
        categories: getters.ALL
      }),
      ...roleMap.mapGetters({
        roles: getters.ALL
      }),
      ...permissionMap.mapGetters({
        permissions: getters.ALL,
        permissionsPaginationData: getters.PAGINATION
      }),
      permissionsPageData () {
        return (this.permissionsPagination) ? this.permissionsPagination.pageData : []
      },
      hasMorePermissions () {
        return this.permissionsPaginationData.hasOwnProperty('links') && this.permissionsPaginationData.links.hasOwnProperty('next')
      },
      roleId: {
        get () {
          return this.getFormField('role_id')
        },
        set (value) {
          this.setFormField({field: 'role_id', value: value})
        }
      },
      permissionIds: {
        get () {
          return this.getFormField('permission_ids')
        },
        set (value) {
          this.setFormField({field: 'permission_ids', value: value})
        }
      }
    },
    mounted () {
    }
  }
</script>

<style scoped>
    label {
        font-weight: bolder;
    }
</style>