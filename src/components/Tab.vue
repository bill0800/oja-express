<template>
    <div class="tab-pane fade" :class="{'show active': isActive}"
         :id="id" role="tabpanel" :aria-labelledby="label">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'tab',
    props: {
      title: {type: String, required: true},
      id: {type: String, required: true},
      active: {type: Boolean, 'default': false}
    },
    data () {
      return {}
    },
    computed: {
      isActive () {
        return this.activeStatus
      },
      label () {
        return `${this.id}-tab`
      }
    },
    methods: {},
    created () {
      this.activeStatus = this.active
    }
  }
</script>