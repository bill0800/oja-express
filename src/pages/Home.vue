<template>
    <div class="container">
        <div class="row justify-content-around">
            <counter class="col-lg-3 col-md-6 col-sm-12" name="Products" :count="productsCount"></counter>
            <counter class="col-lg-3 col-md-6 col-sm-12" name="Stores" :count="storesCount"></counter>
            <counter class="col-lg-3 col-md-6 col-sm-12" name="Orders" :count="ordersCount"></counter>
        </div>
    </div>
</template>

<script>
    import Counter from '../components/Counter.vue'
    import * as getterTypes from '../store/getter-types'
    import { createNamespacedHelpers } from 'vuex'

    const productMaps = createNamespacedHelpers('products')
    const storeMaps = createNamespacedHelpers('stores')
    const orderMaps = createNamespacedHelpers('orders')

    export default {
      name: 'home',
      components: {Counter},
      data () {
        return {}
      },
      computed: {
        ...productMaps.mapGetters({
          productsCount: getterTypes.COUNT
        }),
        ...storeMaps.mapGetters({
          storesCount: getterTypes.COUNT
        }),
        ...orderMaps.mapGetters({
          ordersCount: getterTypes.COUNT
        })
      },
      created () {
      }
    }
</script>