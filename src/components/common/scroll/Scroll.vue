<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default : 0
      },
      pullUpload: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return{
        scroll: null
      }
    },
    mounted() {
      this.$nextTick(() => {
        //1. 创建 better-scroll
        this.scroll = new BScroll(this.$refs.wrapper, {
          //默认情况下BScroll是不可以实时的监听滚动位置
          //0,1都是不侦测
          //2在手指滚动过程中侦测，手指离开后的惯性滚动过程中不侦测
          //3只要是滚动，都侦测
          probeType: this.probeType,
          click: true,
          pullUpload: this.pullUpload
        })
        //2.监听滚动位置
        if (this.probeType === 2 || this.probeType === 3) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }
        //3.监听 Scroll滚动到底部
        if (this.pullUpload) {
          this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
          })
        }
      })
    },
    methods: {
      backToTop(x, y, time=500) {//(x, y, time)
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp();
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      }
    },
  }
</script>

<style scoped>

</style>
