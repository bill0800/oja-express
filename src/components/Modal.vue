<template>
    <div class="modal fade" :id="id" tabindex="-1" role="dialog" :aria-labelledby="label" aria-hidden="true">
        <div class="modal-dialog" :class="{'modal-dialog-centered': centered, 'modal-lg': large, 'modal-sm': small}" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <slot name="header">
                        <h5 class="modal-title">{{title}}</h5>
                    </slot>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <button type="button" class="btn" :class="okBtnClass" @click="save">{{okBtnText}}</button>
                        <button type="button" class="dismiss-modal btn" data-dismiss="modal" :class="dismissBtnClass" @click="cancel">{{dismissBtnText}}</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'modal',
    props: {
      id: {type: String, required: true},
      title: {type: String},
      large: {type: Boolean, 'default': true},
      small: {type: Boolean, 'default': false},
      centered: {type: Boolean, 'default': true},
      okBtnText: {type: String, 'default': 'Save changes'},
      okBtnClass: {type: String, 'default': 'btn-primary'},
      dismissBtnText: {type: String, 'default': 'Close'},
      dismissBtnClass: {type: String, 'default': 'btn-secondary'}
    },
    data () {
      return {
        open: false
      }
    },
    computed: {
      label () {
        return `${this.id}Modal`
      }
    },
    methods: {
      save () {
        this.$emit('ok')
      },
      cancel () {
        this.$emit('cancel')
      },
      close () {
        $('.dismiss-modal').click()
      }
    }
  }
</script>