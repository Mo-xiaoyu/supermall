<template>
	<div>
		<tab-bar>
			<tab-bar-item path="/home">
				<img slot="item-icon" src="~assets/img/tab-bar/home.svg">
				<img slot="item-icon-active" src="~assets/img/tab-bar/home-active.svg">
				<div slot="item-text">首页</div>
			</tab-bar-item>
			<tab-bar-item path="/category">
				<img slot="item-icon" src="~assets/img/tab-bar/category.svg">
				<img slot="item-icon-active" src="~assets/img/tab-bar/category-active.svg">
				<div slot="item-text">分类</div>
			</tab-bar-item>
			<tab-bar-item path="/cart">
				<img slot="item-icon" src="~assets/img/tab-bar/shopcart.svg">
				<img slot="item-icon-active" src="~assets/img/tab-bar/shopcart-active.svg">
				<div slot="item-text">购物车</div>
			</tab-bar-item>
			<tab-bar-item path="/profile">
				<img slot="item-icon" src="~assets/img/tab-bar/profile.svg">
				<img slot="item-icon-active" src="~assets/img/tab-bar/profile-active.svg">
				<div slot="item-text">我的</div>
			</tab-bar-item>
		</tab-bar>
	</div>
</template>

<script>
	import TabBar from 'components/common/tabbar/TabBar.vue'
	import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
	export default {
		name: 'MainTabBar',
		components: {
			TabBar,
			TabBarItem
		}
	}
</script>

<style scoped>

</style>