<template>
  <div id="detail">
    <detail-nav-bar :titles="['商品', '参数', '评价', '推荐']"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'

  export default {
    name: "Detail",
    props: {

    },
    components: {
      DetailNavBar
    },
    data() {
      return{
        iid: null,
      }
    },
    watch: {

    },
    created() {
      this.iid = this.$route.params.id
      console.log(this.iid);
      console.log(this.$route);
    },
    mounted() {

    },
    methods: {

    },
  }
</script>

<style scoped>

</style>
