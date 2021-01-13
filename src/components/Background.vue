<template>
  <div class="background">
  </div>
</template>

<script>
import init from '../assets/index'

export default {
  name: 'Background',
  props: {
    msg: String
  },
  created: function () {
    init()
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  position: absolute;
  top:0;
  left:0;
  z-index: -1;
}
</style>
