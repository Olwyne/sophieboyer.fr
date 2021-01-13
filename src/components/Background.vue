<template>
  <div class="background">
    <canvas id="canvas-bg"></canvas>
  </div>
</template>

<script>
import Webgl from '../assets/index'

export default {
  name: 'Background',
  props: {
    msg: String
  },
  created: function () {
    var webgl = new Webgl()
    webgl.start()
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
