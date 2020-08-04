<template>
	<div id="home">
    <nav-bar class="home-nav"> <div slot="center">购物街</div> </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends" />
    <feature-view />
	</div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'
  import { getHomeMultidata } from 'network/home.js'
	export default {
		name: 'Home',
		components: {
			NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView
		},
		data() {
			return{
        banners: [],
        recommends: [],
			}
		},
		created() {
      //1.请求多个数据
      getHomeMultidata().then(res => {
        if (res.returnCode == "SUCCESS") {
          console.log(res.data);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        }
      }).catch(err => {
        console.log(err);
      })
		}
	}
</script>

<style scoped>
  #home {
    padding-top: 44px;
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
</style>

