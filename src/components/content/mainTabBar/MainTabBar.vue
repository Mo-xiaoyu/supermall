<template>
	<div>
		<tab-bar>
			<tab-bar-item path="/home">
				<img slot="item-icon" src="~assets/img/tab-bar/home/home.svg">
				<img slot="item-icon-active" src="~assets/img/tab-bar/home/home-active.svg">
				<div slot="item-text">首页</div>
			</tab-bar-item>
			<tab-bar-item path="/category">
				<img slot="item-icon" src="~assets/img/tab-bar/category/category.svg">
				<img slot="item-icon-active" src="~assets/img/tab-bar/category/category-active.svg">
				<div slot="item-text">分类</div>
			</tab-bar-item>
			<tab-bar-item path="/cart">
				<img slot="item-icon" src="~assets/img/tab-bar/shopcart/shopcart.svg">
				<img slot="item-icon-active" src="~assets/img/tab-bar/shopcart/shopcart-active.svg">
				<div slot="item-text">购物车</div>
			</tab-bar-item>
			<tab-bar-item path="/profile">
				<img slot="item-icon" src="~assets/img/tab-bar/profile/profile.svg">
				<img slot="item-icon-active" src="~assets/img/tab-bar/profile/profile-active.svg">
				<div slot="item-text">我的</div>
			</tab-bar-item>
		</tab-bar>
	</div>
</template>

<script>
	import TabBar from 'components/common/tabbar/TarBar.vue'
	import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
	export default {
		name: '',
		props: {

		},
		components: {
			TabBar,
			TabBarItem
		},
		data() {
			return{

			}
		},
		watch: {

		},
		created() {

		},
		mounted() {

		},
		methods: {

		},
	}
</script>

<style scoped>

</style>