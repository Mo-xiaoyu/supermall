import { debounce } from './utils.js'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListenr: null
    }
  },
  mounted () {
    //3.监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImgListenr = () => {
      refresh();
    }
    this.$bus.$on('itemImgLoad', this.itemImgListenr)
  }
}