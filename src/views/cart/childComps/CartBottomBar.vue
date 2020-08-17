<template>
  <div class="bottom-bar">
    <div class="select-all">
      <div class="left">
        <check-button class="check-button" :isChecked="isSelectAll" v-model="isSelectAll" @click.native="checkBtnClick"/>
        <span>全选</span>
      </div>
      <div class="center">
        <span class="price">合计:{{ totalPrice }}</span>
      </div>
      <div class="right">
        <span class="calculate">去计算({{ checkLength }})</span>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton.vue"
  import { mapGetters } from "vuex"
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice(){
        return "￥" + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.cartList.length === 0) return false
        return this.cartList.every(item => item.checked)
        // return !this.cartList.find(item => !item.checked)
      }
    },
    methods: {
      checkBtnClick() {
        if (this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)
        }
      }
    },
  }
</script>

<style scoped>
  .bottom-bar {
    position: fixed;
    width: 100%;
    height: 38px;
    background-color: #eee;
    display: flex;
    bottom: 49px;
    font-size: 14px;
    z-index: 1;
  }

  .select-all {
    display: flex;
    width: 100%;
    height: 38px;
    line-height: 38px;
  }

  .left {
    width: 80px;
    text-align: center;
  }

  .check-button {
    display: inline;
    width: 20px;
    height: 20px;
    line-height: 22px;
    margin-right: 5px;
  }

  .center {
    flex: 1;
    text-align: center;
  }

  .right {
    width: 90px;
    text-align: center;
    background-color: #FF4500;
    color: #fff;
  }
</style>
