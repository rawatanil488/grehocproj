<template>
  <div>
    <div class="row mt-3">
      <div class="col-md-3 mb-3" v-for="(product, i) in itemsData" :key="i">
        <!-- <b-card> -->
          <div class="row">
            <div class="col-md-12">
              <img :src="product.image" :alt="product.name" height="100%" width="100%">
            </div>
          </div>
          <div class="row">
            <div class="col-md-8 m-2">
              {{product.name}}
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 m-2">
              Rs. {{product.price}}
            </div>
          </div>
        <!-- </b-card> -->
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'Home',
  data () {
    return {
      pageno: 1,
      bottom: false
    }
  },
  created () {
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
    this.$store.dispatch('getItemsData', this.pageno)
  },
  methods: {
    getMoreItems () {
      this.pageno++
      this.$store.dispatch('loadMoreItems', this.pageno)
    },
    bottomVisible() {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.getMoreItems()
      }
    }
  },
  computed: {
    ...mapGetters({
      itemsData: 'itemsDataGetter'
    })
  }
}
</script>
