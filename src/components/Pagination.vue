<template>
    <nav aria-label="Page navigation">
        <ul class="pagination justify-content-end">
            <li class="page-item"><a class="page-link" :disabled="!hasPrev" @click="backward">Previous</a></li>
            <li class="page-item" v-for="item in pageItems" :class="{active: item === currentPage}" @click="currentPage = item"><a class="page-link">{{item}}</a></li>
            <li class="page-item">
                <a v-if="!hasNext && hasMore" class="page-link" @click="forward">Load More</a>
                <a v-if="hasNext || !hasMore" class="page-link" :disabled="!hasNext" @click="forward">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
      name: 'pagination',
      props: {
        list: { 'default': [] },
        itemsPerPage: { 'default': 15 },
        hasMore: { 'default': false }
      },
      data () {
        return {
          currentPage: 1
        }
      },
      computed: {
        pages () {
          return Math.ceil(this.list.length / this.itemsPerPage)
        },
        pageItems () {
          let array = [...(new Array(this.pages + 1)).keys()]
          if (array.length < 1) {
            return [0]
          }
          return array.slice(1)
        },
        startIndex () {
          return (this.currentPage - 1) * this.itemsPerPage
        },
        pageData () {
          return this.list.slice(this.startIndex, this.startIndex + this.itemsPerPage)
        },
        hasNext () {
          return this.currentPage < this.pages
        },
        hasPrev () {
          return this.currentPage > 1
        }
      },
      methods: {
        forward () {
          if (!this.hasNext) {
            this.$emit('noNext')
            return
          }
          this.currentPage++
        },
        backward () {
          if (!this.hasPrev) {
            return
          }
          this.currentPage--
        }
      }
    }
</script>