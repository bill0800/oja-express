<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand text-orange" href="#">
            OjaExpress <!-- <i class="fa" :class="{'fa-arrow-circle-left': sidebar.open, 'fa-arrow-circle-right': !sidebar.open}" @click="toggle"></i> -->
        </a>
        <span class="fols">Fola's GROCERY store</span>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle p-2" href="#" id="account" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-user"></i> Account
                    </a>
                    <div class="dropdown-menu" aria-labelledby="account">
                        <a class="dropdown-item" href="#">Profile</a>
                        <a class="dropdown-item" href="#" @click="logout">Logout</a>
                    </div>
                </li>

                <li class="nav-item">
                    <a class="nav-link p-2" href="#" aria-label="Settings">
                        <i class="fa fa-gear"></i> Settings
                    </a>
                </li>
                <li class="nav-item">
                    <div class="sidebar-header">
                        <div class="row p-2 m-0 bg-gray">
                            <div class="col-4">
                                <img src="../assets/logo_icon.png" class="img-circle w-100">
                            </div>
                            <div class="col-8 pl-0">
                                <span class="mb-0">{{ userFullName }} </span><br>
                                <span class="text-sm-center">Admin</span>
                            </div>
                        </div>
                        <hr class="my-0">
                    </div>
                </li>
                
            </ul>
        </div>
    </nav>
</template>

<script>
    import { mapState, mapMutations, createNamespacedHelpers } from 'vuex'
    import { AUTH_USER } from '../store/getter-types'
    import { TOGGLE_SIDEBAR } from '../store/mutation-types'
    import { LOGOUT } from '../store/action-types'

    const authMaps = createNamespacedHelpers('auth')

    export default {
      name: 'top-nav',
      data () {
        return {}
      },
      methods: {
        ...mapMutations({
          toggle: TOGGLE_SIDEBAR
        }),
        ...authMaps.mapActions({
          clearUserData: LOGOUT
        }),
        logout () {
          this.clearUserData()
          this.$router.push({name: 'login'})
        }
      },
      computed: {
        ...mapState(['sidebar']),
        ...authMaps.mapGetters({
          user: AUTH_USER
        }),
        userFullName () {
          if (!this.user) {
            return
          }
          return [this.user.last_name, this.user.first_name].join(' ')
        }
      }
    }
</script>

<style lang="scss" scoped>
    nav{
        border-bottom:2px solid #f3e9e9;
    }
    .bg-light {
        background-color: #ffffff!important;
    }
    .bg-light {
        .fols {
            font-size: 14px;
            color: gray;
            margin-top: 62px;
            margin-left: -166px;
        }
    }
    .bg-orange{
        background-color: #fb7729;
    }
    .navbar-brand{
        font-size: 2.6em;
    }
    .text-orange{
        color: #fb7729 !important;
    }
</style>