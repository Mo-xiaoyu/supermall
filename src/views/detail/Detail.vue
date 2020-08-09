<template>
  <div id="detail">
    <detail-nav-bar :titles="['商品', '参数', '评价', '推荐']" class="detail-nav"/>
    <Scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
    </Scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll.vue'
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import { getDetail, Goods, Shop, GoodsParam } from 'network/detail.js'

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
    },
    data() {
      return{
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {}
      }
    },
    created() {
      //1.保存传入的 iid
      this.iid = this.$route.params.id;
      //2.根据 iid 请求详情数据
      this.getDetail();
    },
    mounted() {

    },
    methods: {
      getDetail() {
        getDetail(this.iid).then(res => {
          console.log(res);
          //获取结果
          const data = res.result;

          //1.获取顶部轮播图片数据
          this.topImages = res.result.itemInfo.topImages;

          //2.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

          //3.获取店铺信息
          this.shop = new Shop(data.shopInfo)

          //4.获取商品详细信息
          this.detailInfo = data.detailInfo;

          //5.获取参数的信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        }).catch(err => {
          console.log(err);
        })
      },
      imageLoad() {
        this.$refs.scroll.refresh();
      }
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 1;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
