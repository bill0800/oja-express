<template>
    <nav id="sidebar" :class="{inactive: !sidebar.open}">
        <!-- Sidebar Header -->
        <!-- <div class="sidebar-header">
            <div class="row p-2 m-0 bg-gray">
                <div class="col-4">
                    <img src="../assets/logo_icon.png" class="img-circle w-100">
                </div>
                <div class="col-8 pl-0">
                    <span class="mb-0">{{ userFullName }} </span>
                    <span class="text-sm-center">Admin</span>
                </div>
            </div>
            <hr class="my-0">
        </div> -->

        <!-- Sidebar Links -->
        <ul class="list-unstyled components">
            <router-link :to="{name: 'home'}" tag="li" exact>
                <a><i class="fa fa-home mr-2"></i> Dashboard</a>
            </router-link>

            <router-link :to="{name: 'stores'}" tag="li">
                <a><i class="fa fa-university mr-2"></i> Stores</a>
            </router-link>

            <router-link :to="{name: 'categories'}" tag="li">
                <a><i class="fa fa-list mr-2"></i> Categories </a>
            </router-link>

            <router-link :to="{name: 'tags'}" tag="li">
                <a><i class="fa fa-tag mr-2"></i> Tags </a>
            </router-link>

            <router-link :to="{name: 'products'}" tag="li">
                <a><i class="fa fa-shopping-basket mr-2"></i> Products</a>
            </router-link>

            <router-link :to="{name: 'coupons'}" tag="li">
                <a><i class="fa fa-gift mr-2"></i> Coupons</a>
            </router-link>

            <router-link :to="{name: 'orders'}" tag="li">
                <a><i class="fa fa-shopping-cart mr-2"></i> Orders</a>
            </router-link>

            <router-link :to="{name: 'transactions'}" tag="li">
                <a><i class="fa fa-credit-card mr-2"></i> Transactions</a>
            </router-link>

            <router-link :to="{name: 'users'}" tag="li">
                <a><i class="fa fa-users mr-2"></i> Users</a>
            </router-link>

            <li><!-- Link with dropdown items -->
                <a href="#appAuthorization" data-toggle="collapse" aria-expanded="false">
                    <i class="fa fa-lock mr-2"></i> App Authorization
                </a>
                <ul class="collapse list-unstyled" id="appAuthorization">
                    <router-link :to="{name: 'app_roles'}" tag="li">
                        <a><i class="fa fa-key mr-2"></i> Roles </a>
                    </router-link>
                    <router-link :to="{name: 'app_permissions'}" tag="li">
                        <a><i class="fa fa-key mr-2"></i> Permissions </a>
                    </router-link>
                </ul>
            </li>

            <li><!-- Link with dropdown items -->
                <a href="#storeAuthorization" data-toggle="collapse" aria-expanded="false">
                    <i class="fa fa-lock mr-2"></i> Store Authorization
                </a>
                <ul class="collapse list-unstyled" id="storeAuthorization">
                    <router-link :to="{name: 'store_roles'}" tag="li">
                        <a><i class="fa fa-key mr-2"></i> Roles </a>
                    </router-link>
                    <router-link :to="{name: 'store_permissions'}" tag="li">
                        <a><i class="fa fa-key mr-2"></i> Permissions </a>
                    </router-link>
                </ul>
            </li>

        </ul>
    </nav>

</template>

<script>
    import { mapState, createNamespacedHelpers } from 'vuex'
    import { AUTH_USER } from '../store/getter-types'

    const authMaps = createNamespacedHelpers('auth')

    export default {
      name: 'side-nav',
      data () {
        return {}
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

<style lang="scss">
    $background: #fff;
    $dark-background: #c3c3c3;
    $text_primary: #000;
    $width: 250px;

    #sidebar{
        min-width: $width;
        max-width: $width;
        min-height: 100vh;
        background: $background;
        color: $text_primary;
        transition: all 0.1s;
        border-right:2px solid #f3e9e9;
    }
    #sidebar.inactive {
        margin-left: -$width;
    }
    @media (max-width: 768px) {
        #sidebar {
            margin-left: -$width;
        }
        #sidebar .inactive {
            margin-left: 0;
        }
    }
    a[data-toggle="collapse"] {
        position: relative;
    }

    a[aria-expanded="false"]::before, a[aria-expanded="true"]::before {
        content: '\e259';
        display: block;
        position: absolute;
        right: 20px;
        font-family: 'Glyphicons Halflings';
        font-size: 0.6em;
    }

    a[aria-expanded="true"]::before {
        content: '\e260';
    }
    #sidebar ul.components {
        padding: 20px 0;
        margin-left: 25%;
        margin-right: 5%;
    }

    #sidebar ul p {
        color: $text_primary;
        padding: 10px;
    }

    #sidebar ul li {
        border-radius: 0.25em;
    }

    #sidebar ul li a {
        padding: 5px;
        margin-top: 10px;
        font-size: 1.1em;
        display: block; 
        border-radius: 0.25em;
    }
    #sidebar ul li a:hover {
        color: $text_primary;
        background: $dark-background;
    }

    #sidebar ul li.active > a, a[aria-expanded="true"] {
        color: $text_primary;
        background: $dark-background;
    }
    ul ul a {
        font-size: 0.9em !important;
        padding-left: 30px !important;
    }
</style>