<template>
    <div class="btn-bg bg-1" v-if="$route.name!=='Home' && isUserScrolling"  v-on:click="goTop()">
      <div class="btn btn-1">
        <span>↑</span>
      </div>
    </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js'

export default {
  name: 'ButtonTop',
  data () {
    return {
      isUserScrolling: false
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    goTop () {
      anime({
        targets: window.document.scrollingElement,
        scrollTop: 0,
        duration: 500,
        easing: 'easeInOutQuad'
      })
    },
    // Show button when user scrolls
    handleScroll () {
      if (window.scrollY > 0) {
        this.isUserScrolling = true
      } else {
        this.isUserScrolling = false
      }
    }
  }
}
</script>

<style scoped>
.btn-bg.bg-1 .btn-1 span {
  color: black;
  background: rgb(99, 90, 126);
  border: 3px solid white;
  border-radius: 50px;
  font-size: 25px;
  padding: 0 10px 5px 10px;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
  -webkit-transform: translate(0, 0);
  transform: translate(0, 0);
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index :10
}
 .btn-bg.bg-1 .btn-1 span a {
  color: black;
}
 .btn-bg.bg-1 .btn-1 span:hover {
  background: white;
  color: black;
  border: 3px solid rgb(99, 90, 126);
  border-radius: 50px;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
}
 .btn-bg.bg-1 .btn-1 span:hover >a {
  color:white;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
}
 .btn-bg.bg-1 .btn-1 span:active {
  -webkit-transform: translate(5px, 5px);
  transform: translate(5px, 5px);
}
</style>
