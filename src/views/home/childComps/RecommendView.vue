<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
  //import  from ''
  export default {
    name: '',
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {

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
  .recommend {
    display: flex;
    width: 100%;
    font-size: 12px;
    text-align: center;
    padding: 10px 0 20px 0;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>