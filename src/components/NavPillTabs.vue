<template>
    <div>
        <ul class="nav nav-pills nav-justified justify-content-center mb-3" id="pills-tab" role="tablist">
            <li v-for="tab in tabs" class="nav-item">
                <a class="nav-link" :class="{active: tab.isActive}" :id="tab.label"
                   data-toggle="pill" :href="'#' + tab.id" role="tab"
                   :aria-controls="tab.id" :aria-selected="tab.isActive">
                    {{tab.title}}
                </a>
            </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'nav-pill-tabs',
    data () {
      return {
        tabs: []
      }
    },
    created () {
      this.tabs = this.$children
    }
  }
</script>

<style>
    .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
        background-color: #fb7729;
        font-weight: 500;
        font-size: larger;
    }
</style>