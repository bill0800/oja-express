<template>
    <div class="card m-2">
        <div class="card-body px-0 pb-1" @click="view">
            <img :src="src" class="img-thumbnail d-flex m-auto" width="64"/>
            <div class="text-center">
                <span class="d-inline-block font-weight-bold">{{name}}</span>
                <p>{{count}}</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'store-widget',
    props: ['id', 'name', 'count', 'src'],
    data () {
      return {}
    },
    methods: {
      view () {
        this.$emit('view', {id: this.id})
      }
    }
  }
</script>

<style>

</style>