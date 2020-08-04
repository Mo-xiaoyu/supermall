<template>
	<div id="home">
    <nav-bar class="home-nav"> <div slot="center">购物街</div> </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends" />
	</div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import { getHomeMultidata } from 'network/home.js'

	export default {
		name: 'Home',
		components: {
			NavBar,
      HomeSwiper,
      RecommendView
		},
		data() {
			return{
        banners: [],
        recommends: [],
			}
		},
		watch: {

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
		},
		mounted() {

		},
		methods: {

		},
	}
</script>

<style scoped>
  #home {

  }

  .home-nav {
    background-color: var(--color-tint);
    color: #FFFFFF;
  }
</style>

