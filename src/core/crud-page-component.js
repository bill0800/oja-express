import Pagination from '../components/Pagination.vue'
import { DELETE, FETCH_NEXT } from '../store/action-types'
import {ALL, PAGINATION} from '../store/getter-types'

class CrudPageComponent {
  constructor (mapGetters, mapActions) {
    this.mapGetters = mapGetters
    this.mapActions = mapActions
  }

  components () {
    return {Pagination}
  }

  data () {
    return {
      pagination: null,
      selectedItems: []
    }
  }

  methods () {
    return this.mapActions({
      next: FETCH_NEXT,
      delete: DELETE
    })
  }

  computed () {
    return {
      ...this.mapGetters({
        all: ALL,
        paginationData: PAGINATION
      })
    }
  }

  mounted (self) {
    self.pagination = self.$children[self.$children.length - 1]
  }

  getComponent (self) {
    return {
      components: {
        ...this.components()
      },
      data () {
        return {
          ...this.data()
        }
      },
      methods: {
        ...this.methods()
      },
      computed: {
        ...this.computed(self)
      }
    }
  }
}

export default CrudPageComponent
