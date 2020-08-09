<template>
  <div class="detail-swiper">
    <Swiper class="swiper-item">
      <SwiperItem v-for="(item, index) in topImages"
                  
                  :key="index">
        <img :src="item">
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperItem} from "components/common/swiper/index.js"
  export default {
    name: "DetailSwiper",
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return{

      }
    },
    methods: {

    },
  }
</script>

<style scoped>
  .swiper-item {
    height: 300px;
    overflow: hidden;
  }
</style>
