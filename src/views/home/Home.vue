<template>
	<div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <TabControl ref="tabControl1"
                class="fixed"
                :titles="['流行', '新款', '精选']"
                @tabClick="tabClick" v-show="isTabFixed"/>
    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-upload="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <TabControl ref="tabControl2"
                  :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </Scroll>
    <back-top @click.native="backClick" v-show="isShow"/>
	</div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import { getHomeMultidata, getHomeGoods } from 'network/home.js'
  import { itemListenerMixin, backTopMixin } from 'common/mixin.js'
  import { BACKTOP_DISTANCE } from 'common/const.js'

	export default {
		name: 'Home',
		components: {
			NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
		},
		data() {
			return{
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: "pop",
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
			}
		},
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
		created() {
      //1.请求多个数据
      this.getHomeMultidata();
      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
		},
    mounted() {

    },
    mixins: [itemListenerMixin, backTopMixin],
    activated() {
      this.$refs.scroll.backToTop(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //1.保存 Y 值
      this.saveY = this.$refs.scroll.getScrollY()
      //2.取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListenr)
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        switch (index){
          case 0:
            this.currentType = "pop"
            break;
          case 1:
            this.currentType = "new"
            break;
          case 2:
            this.currentType = "sell"
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      contentScroll(pos) {
        //1.判断 BackTop 是否显示
        this.isShow = (-pos.y) > BACKTOP_DISTANCE;
        //2.决定tabControl 是否吸顶(position: fixed)
        this.isTabFixed = (-pos.y) > this.tabOffsetTop;
      },
      loadMore() {
        this.getHomeGoods(this.currentType);
        this.$refs.scroll.refresh();
      },
      swiperImageLoad() {
        //获取 tabCotrol 的offsetTop
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          if (res.returnCode == "SUCCESS") {
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          }
        }).catch(err => {
          console.log(err);
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          //完成上拉加载更多
          this.$refs.scroll.finishPullUp();
        }).catch(err => {
          console.log(err);
        })
      },
    }
	}
</script>

<style scoped>
  #home {
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #FFFFFF;
    font-weight: 700;
  }

  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }

  .content {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
    overflow: hidden;
  }
  /* .content {
    height: calc(100% - 93px);
    margin-top: 44px;
    overflow: hidden;
  } */
</style>
