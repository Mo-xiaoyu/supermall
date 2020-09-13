import { debounce } from './utils.js'
import BackTop from 'components/content/backTop/BackTop.vue'

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

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.backToTop(0, 0);
      // this.$refs.scroll.scroll.scrollTo(0, 0, 1000);
    }
  }
}