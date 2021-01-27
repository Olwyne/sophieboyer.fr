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
import anime from 'animejs/lib/anime.es.js'

export default {
  name: 'Home',
  components: {
  },
  mounted: function () {
    anime({
      targets: '.home h2',
      opacity: ['0%', '100%'],
      easing: 'easeInOutQuad',
      delay: 1000
    })
    const title = document.querySelector('.home h1')
    title.innerHTML = title.innerText.split('').map(function (char) {
      return '<span>' + char + '</span>'
    }).join('')
    anime.timeline({ loop: false }).add({
      delay: 500
    }).add({
      targets: '.home h1 span',
      opacity: [0, 1],
      delay: function (element, i) {
        return i * 50
      }
    })
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
  opacity: 0;
}

</style>
