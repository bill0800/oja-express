<template>
    <div id="app">

        <top-nav :class="{gone: !isLoggedIn}"></top-nav>
        <div class="wrapper">
            <side-nav :class="{gone: !isLoggedIn}"></side-nav>
            <div class="container-fluid m-0 p-0">
                <div class="content p-2">
                    <main>
                        <breadcrumb :class="{gone: !isLoggedIn}"></breadcrumb>
                        <div class="loader-parent">
                            <loader :class="{gone: !isLoading}"></loader>
                        </div>
                        <router-view></router-view>
                    </main>
                </div>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
  import TopNav from './components/TopNav.vue'
  import SideNav from './components/SideNav.vue'
  import Breadcrumb from './components/Breadcrumb.vue'
  import AppFooter from './components/Footer.vue'
  import Loader from './components/Loader.vue'
  import { createNamespacedHelpers, mapGetters } from 'vuex'
  import {IS_LOGGED_IN, IS_LOADING} from './store/getter-types'
  import {LOGIN} from './router/route-names'
  import Event from './core/Event'

  const authMaps = createNamespacedHelpers('auth')

  export default {
    name: 'app',
    data () {
      return {}
    },
    components: {
      SideNav, TopNav, Breadcrumb, AppFooter, Loader
    },
    computed: {
      ...authMaps.mapGetters({
        isLoggedIn: IS_LOGGED_IN
      }),
      ...mapGetters({
        isLoading: IS_LOADING
      })
    },
    created () {
      Event.$on('sessionDestroyed', () => { this.$router.replace({name: LOGIN}) })
    }
  }
</script>

<style lang="scss">
    @import './assets/css/app.scss';

    body {
        font-family: 'Raleway', sans-serif;
        background: #fafafa;
    }

    p {
        font-family: 'Poppins', sans-serif;
        font-size: 1.1em;
        font-weight: 300;
        line-height: 1.7em;
        color: #999;
    }

    a, a:hover, a:focus {
        color: inherit;
        text-decoration: none;
        transition: all 0.3s;
    }

    .wrapper {
        display: flex;
        align-items: stretch;
    }
    .container-fluid {
        background-color: #ffffff;
    }

    .content-title{
        font-size: x-large;
        font-weight: bold;
    }
    .gone{
        display: none;
    }
    .loader-parent{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
    }
    .product-img{
        max-width: 10rem;
        max-height: 10rem;
    }
    .field{
        color: black;
        font-weight: 300;
        font-size: large;
    }
    .value{
        font-weight: 500;
        font-size: larger;
        color: black;
    }
</style>
