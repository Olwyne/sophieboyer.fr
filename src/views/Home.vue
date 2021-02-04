<template>
  <div class="main-title">
    <h1>Sophie Boyer</h1>
    <h2>{{ $t("Presentation") }}</h2>
  </div>
</template>

<script>
// import anime from 'animejs/lib/anime.es.js'

export default {
  name: 'Home',
  components: {
  }
  // mounted: function () {
  //   anime({
  //     targets: '.home h2',
  //     opacity: ['0%', '100%'],
  //     easing: 'easeInOutQuad',
  //     delay: 1000
  //   })
  //   const title = document.querySelector('.home h1')
  //   title.innerHTML = title.innerText.split('').map(function (char) {
  //     return '<span>' + char + '</span>'
  //   }).join('')
  //   anime.timeline({ loop: false }).add({
  //     delay: 2000
  //   }).add({
  //     targets: '.home h1 span',
  //     opacity: [0, 1],
  //     delay: function (element, i) {
  //       return i * 50
  //     }
  //   })
  // }
}
</script>

<style scoped>
h1{
  letter-spacing: 15px;
  font-weight: 100;
  font-size: 80px;
  color: white;
  text-transform: uppercase;
}

h2{
  font-size: 30px;
  color: white;
  font-weight: 100;
  text-transform: uppercase;
  opacity: 1;
}

.main-title {
  color: #fff;
}
</style>
