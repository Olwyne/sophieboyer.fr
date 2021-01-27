<template>
  <transition appear v-on:appear="firstEnter">
  <div id="app" v-bind:class="[$route.name!=='Home' ? activeClass : 'reverse', '']">
    <NavBar />
    <div id="content" v-bind:class="[$route.name!=='Home' ? activeClass : 'center-content','']">
        <transition>
          <router-view :language="$i18n.locale" :idProject="id"></router-view>
        </transition>
    </div>
    <ButtonTop />
    <Footer />
    <div id="cache-haut"></div>
    <div id="cache-bas"></div>
  </div>
  </transition>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import ButtonTop from '@/components/ButtonTop.vue'
import Footer from '@/components/Footer.vue'
import { mapActions, mapGetters } from 'vuex'
import init from './assets/index'
import anime from 'animejs/lib/anime.es.js'

export default {
  name: '',
  components: {
    NavBar,
    Footer,
    ButtonTop
  },
  props: {
    activeClass: String
  },
  data () {
    return {
      id: null
    }
  },
  created () {
    init()
  },
  methods: {
    ...mapActions([
      'setActiveProject'
    ]),
    leave: function (el, done) {
      anime.timeline().add({
        targets: '#content',
        easing: 'easeInOutSine',
        opacity: ['100%', '0%'],
        duration: 1000
      }).add({
        targets: '#cache-bas',
        easing: 'easeInOutSine',
        translateY: ['50vh', 0],
        duration: 500,
        delay: 500
      }).add({
        targets: '#cache-haut',
        easing: 'easeInOutSine',
        translateY: ['-50vh', 0],
        duration: 500,
        delay: 500,
        complete: function () {
          return done
        }
      })
    },
    enter: function (el, done) {
      anime.timeline({ loop: false }).add({
        targets: '#cache-bas',
        easing: 'easeInOutSine',
        translateY: [0, '50vh'],
        duration: 500
      }).add({
        targets: '#cache-haut',
        easing: 'easeInOutSine',
        translateY: [0, '-50vh'],
        duration: 500
      }).add({
        targets: '#content',
        easing: 'easeInOutSine',
        opacity: ['0%', '100%'],
        duration: 500,
        delay: 500,
        complete: function () {
          return done
        }
      })
    },
    firstEnter (el, done) {
      anime({
        targets: '.menu',
        opacity: ['0%', '100%'],
        easing: 'easeInOutQuad',
        delay: 1500
      })
      anime({
        targets: '#cache-bas',
        easing: 'easeInOutSine',
        translateY: [0, '50vh'],
        duration: 1000,
        delay: 500
      })
      anime({
        targets: '#cache-haut',
        easing: 'easeInOutSine',
        translateY: [0, '-50vh'],
        duration: 1000,
        delay: 500
      })
    },
    transitionPage (el, done) {
      anime.timeline({ loop: false }).add({
        targets: '#cache-bas',
        easing: 'easeInOutSine',
        translateY: ['50vh', 0],
        duration: 500,
        delay: 100
      }).add({
        targets: '#cache-bas',
        easing: 'easeInOutSine',
        translateY: [0, '50vh'],
        duration: 1000,
        delay: 600
      })
      anime.timeline({ loop: false }).add({
        targets: '#cache-haut',
        easing: 'easeInOutSine',
        translateY: ['-50vh', 0],
        duration: 500,
        delay: 100
      }).add({
        targets: '#cache-haut',
        easing: 'easeInOutSine',
        translateY: [0, '-50vh'],
        duration: 500,
        delay: 600
      })
    }
  },
  computed: {
    ...mapGetters([
      'getActiveProject'
    ])
  },
  mounted: function () {
    this.id = this.getActiveProject
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

#cache-haut{
  width: 100%;
  height: 50vh;
  background: black;
  position: fixed;
  top: 0vh;
  z-index: 15;
}

#cache-bas{
  width: 100%;
  height: 50vh;
  background: black;
  position: fixed;
  top: 50vh;
  z-index: 15;
}

html {
  height: 100%;
}
body{
  margin: 0;
  padding: 0;
  min-height: 100%;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: middle;
  width: 100%;
}

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

canvas {
  position: fixed;
  top:0;
  left:0;
  z-index: -10;
  width: 100%;
  height: 100%;
}

.reverse{
  flex-direction: column-reverse !important;
}

.center-content {
  width:100%;
  margin-top: 50vh; /* poussé de la moitié de hauteur de viewport */
  transform: translateY(-120%); /* tiré de la moitié de sa propre hauteur */
}
</style>
