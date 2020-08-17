<template>
  <div id="detail">
    <detail-nav-bar ref="nav" :titles="['商品', '参数', '评价', '推荐']" class="detail-nav" @titleClick="titleClick"/>
    <Scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends" />
    </Scroll>
    <back-top @click.native="backClick" v-show="isShow" style="bottom: 60px;"/>
    <detail-bottom-bar @addCart="addToCart"/>
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
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'
  import { getDetail, getRecommend, Goods, Shop, GoodsParam } from 'network/detail.js'
  import { itemListenerMixin, backTopMixin } from 'common/mixin.js'
  import { BACKTOP_DISTANCE } from 'common/const.js'
  import { debounce } from 'common/utils.js'

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
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar
    },
    data() {
      return{
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        curentIndex: 0
      }
    },
    created() {
      //1.保存传入的 iid
      this.iid = this.$route.params.id;
      //2.根据 iid 请求详情数据
      this.getDetail();
      //3.请求推荐数据
      this.getRecommend();
      //4.给getThemeTopY赋值(对给 this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
      }, 100);
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListenr)
    },
    mixins: [itemListenerMixin, backTopMixin],
    methods: {
      getDetail() {
        getDetail(this.iid).then(res => {
          //获取结果
          const data = res.result;

          //1.获取顶部轮播图片数据
          this.topImages = res.result.itemInfo.topImages;

          //2.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

          //3.获取店铺信息
          this.shop = new Shop(data.shopInfo);

          //4.获取商品详细信息
          this.detailInfo = data.detailInfo;

          //5.获取参数的信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

          //6.获取评论的信息
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0];
          }
          /* this.$nextTick(() => {
            //根据最新的数据，对应的DOM是已经被渲染出来
            //单数图片依然是没有加载完(目前获取到offsettop不包含其中的图片)
            //offsettop值不对的时候，都是因为图片的问题
          }) */
        }).catch(err => {
          console.log(err);
        })
      },
      getRecommend() {
        getRecommend().then(res => {
          this.recommends = res.data.list;
        }).catch(err => {
          console.log(err);
        })
      },
      imageLoad() {
        this.$refs.scroll.refresh();
        this.getThemeTopY();
      },
      titleClick(index) {
        this.$refs.scroll.backToTop(0, -this.themeTopYs[index], 200)
      },
      contentScroll(pos) {
        //1.获取 y 值
        const posY = -pos.y;
        //2.posY和主题中的值进行对比
        let length = this.themeTopYs.length;
        for (let i = 0; i < length; i++) {
          if (this.curentIndex !== i && ((posY >= this.themeTopYs[i] && posY < this.themeTopYs[i+1]))) {
            this.curentIndex = i;
            this.$refs.nav.currentIndex = this.curentIndex;
          }
        }
        this.isShow = (-pos.y) > BACKTOP_DISTANCE;
      },
      addToCart() {
        //1.获取商品信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // this.$store.commit("addCart", product)
        this.$store.dispatch("addCart", product)
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
    /* height: calc(100% - 93px); */
    position: absolute;
    top: 44px;
    bottom: 60px;
  }
</style>
