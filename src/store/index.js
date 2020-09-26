import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    itemsData: []
  },
  mutations: {
    itemsDataRecieved (state, data) {
      state.itemsData = data
    },
    moreItemsDataRecieved (state, data) {
      data.forEach(ele => {
        state.itemsData.push(ele)
      })
    }
  },
  actions: {
    getItemsData({commit}, pageno) {
      axios.get(`https://pim.wforwomanonline.com/pim/pimresponse.php/?service=category&store=1&url_key=top-wear&page=${pageno}&count=20`).then(res => {
        commit('itemsDataRecieved', res.data.result.products)
      })
    },
    loadMoreItems({commit}, pageno) {
      axios.get(`https://pim.wforwomanonline.com/pim/pimresponse.php/?service=category&store=1&url_key=top-wear&page=${pageno}&count=20`).then(res => {
        commit('moreItemsDataRecieved', res.data.result.products)
      })
    }
  },
  getters: {
    itemsDataGetter: state => state.itemsData
  }
})
