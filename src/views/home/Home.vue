<template>
	<div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <TabControl class="tab-control" :titles="['流行', '新款', '精选']"  @tabClick="tabClick"/>
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
  import BackTop from 'components/content/backTop/BackTop.vue'
  import { getHomeMultidata, getHomeGoods } from 'network/home.js'

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
      BackTop
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
        isShow: false
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
      },
      backClick() {
        this.$refs.scroll.backToTop(0, 0);
        // this.$refs.scroll.scroll.scrollTo(0, 0, 1000);
      },
      contentScroll(pos) {
        this.isShow = (-pos.y) > 1000
      },
      loadMore() {
        this.getHomeGoods(this.currentType);

        this.$refs.scroll.refresh();
        console.log('上拉加载更多');
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
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

