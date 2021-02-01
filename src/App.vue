<template>
  <transition appear v-on:appear="firstEnter">
  <div id="app" v-bind:class="[$route.name!=='Home' ? activeClass : 'reverse', '']">
    <NavBar />
    <div id="content" v-bind:class="[$route.name!=='Home' ? activeClass : 'center-content','']">
        <transition name="component-fade" mode="out-in">
          <router-view :language="$i18n.locale" :idProject="id"></router-view>
        </transition>
    </div>
    <ButtonTop />
    <Footer />
  </div>
  </transition>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ButtonTop from '@/components/ButtonTop.vue'
import Footer from '@/components/Footer.vue'
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
    // Animation page transition
    leave: function (el, done) {
      console.log('he')
      anime.timeline().add({
        targets: '#content',
        easing: 'easeInOutSine',
        opacity: ['100%', '0%'],
        duration: 1000,
        complete: function () {
          return done
        }
      })
    },
    // Animation page transition
    enter: function (el, done) {
      console.log('ge')
      anime.timeline({ loop: false }).add({
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
    // Animation appear website
    firstEnter (el, done) {
      anime({
        targets: '#content',
        easing: 'easeInOutSine',
        opacity: ['0%', '100%'],
        duration: 2000
      })
      anime({
        targets: '.menu',
        opacity: ['0%', '100%'],
        easing: 'easeInOutQuad',
        delay: 1000,
        duration: 2000
      })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

html {
  height: 100%;
  width: 100%;
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
  margin-top: 50vh;
  transform: translateY(-120%);
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity 0.8s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
</style>
