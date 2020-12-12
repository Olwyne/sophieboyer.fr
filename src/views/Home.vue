<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="@/assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>Sophie Boyer</h1>
    <h2>{{ $t("Presentation") }}</h2>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style scoped>

h1{
  letter-spacing: 15px;
  font-weight: 100;
  font-size: 80px;
  color: white;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  text-transform: uppercase;
}

h2{
  font-size: 30px;
  color: white;
  font-weight: 100;
  text-transform: uppercase;
}
</style>
