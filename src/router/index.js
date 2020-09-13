import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
  	path: '/',
  	redirect: '/home'
  },
  {
  	path: '/home',
  	name: 'Home',
  	component: () => import('views/home/Home.vue')
  },
  {
  	path: '/category',
  	name: 'Category',
  	component: () => import('views/category/Category.vue')
  },
  {
  	path: '/cart',
  	name: 'Cart',
  	component: () => import('views/cart/Cart.vue')
  },
  {
  	path: '/profile',
  	name: 'Profile',
  	component: () => import('views/profile/Profile.vue')
  },
  {
  	path: '/detail/:id',
  	name: 'Detail',
  	component: () => import('views/detail/Detail.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router