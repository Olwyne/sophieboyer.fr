<template>
  <div class="about">
    <h1>{{ $t("Title-AboutMe") }}</h1>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'About',
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
  text-transform: uppercase;
  margin-top: 100px;
}

h2{
  font-size: 30px;
  color: white;
  font-weight: 100;
  text-transform: uppercase;
}
</style>
