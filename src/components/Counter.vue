<template>
    <div class="card">
        <div class="card-body">
            <i class="fa fa-gift fa-5x justify-content-center d-flex"></i>
            <div class="text-center">
                <h2>{{name}}</h2>
                <p>{{count}}</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'counter',
    props: ['name', 'count'],
    data () {
      return {}
    }
  }
</script>

<style>

</style>