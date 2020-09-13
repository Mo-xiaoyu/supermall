<template>
  <div>
    <nav-bar>
      <div slot="left" class="left" @click="backToHome">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="center">
        <div v-for="(item, index) in titles"
            :key="index"
            :class="{active: index === currentIndex}"
            @click="titleClick(index)"
            class="title">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'

  export default {
    name: "DetailNavBar",
    props: {
      titles: Array
    },
    components: {
      NavBar
    },
    data() {
      return{
        currentIndex: 0
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      titleClick(index) {
        this.currentIndex = index;
        this.$emit("titleClick", index);
      },
      backToHome() {
        this.$router.back()
      }
    },
  }
</script>

<style scoped>
  .left img {
    vertical-align: middle;
  }

  .center {
    display: flex;
    font-size: 14px;
    color: var(--color-text);
  }

  .title {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }
</style>
