<template>
  <div class="cart-list">
    <Scroll ref="scroll" class="content" :probeType="3" @scroll="contentScroll">
      <cart-list-item v-for="(item, index) in cartList" :product="item" :key="index" />
    </Scroll>
    <back-top @click.native="backClick" v-show="isShow" style="bottom: 115px;"/>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll.vue'
  import CartListItem from './CartListItem.vue'
  import { backTopMixin } from 'common/mixin.js'
  import { BACKTOP_DISTANCE } from 'common/const.js'
  import { mapGetters } from 'vuex'

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    mixins: [backTopMixin],
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh();
    },
    methods: {
      contentScroll(pos) {
        this.isShow = (-pos.y) > BACKTOP_DISTANCE;
      }
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 131px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
