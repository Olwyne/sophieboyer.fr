<template>
  <transition appear v-on:appear="firstEnter">
    <div id="app">
        <Nav />
        <div  v-bind:class="[$route.name!=='Home' ? activeClass : 'wrap-banner-center', 'wrap-banner']">
          <transition name="component-fade" mode="out-in">
              <router-view :language="$i18n.locale" :idProject="id"></router-view>
          </transition>
        </div>
        <ButtonTop />
        <Footer v-if="$route.name!=='Home'"/>
      </div>
  </transition>
</template>

<script>
import Nav from '@/components/Nav.vue'
import ButtonTop from '@/components/ButtonTop.vue'
import Footer from '@/components/Footer.vue'
import init from './assets/index'
import anime from 'animejs/lib/anime.es.js'

export default {
  name: '',
  components: {
    Nav,
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
    // initialisation firebase
    init()
    // get last language
    if (localStorage.getItem('language')) {
      try {
        this.$i18n.locale = JSON.parse(localStorage.getItem('language'))
      } catch (e) {
        localStorage.removeItem('language')
      }
    } else {
      const parsed = JSON.stringify(this.$i18n.locale)
      localStorage.setItem('language', parsed)
    }
  },
  methods: {
    // Animation page transition
    leave: function (el, done) {
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
        targets: '#app',
        easing: 'easeInOutSine',
        opacity: ['0%', '100%'],
        duration: 2000
      })
      // anime({
      //   targets: '.menu',
      //   opacity: ['0%', '100%'],
      //   easing: 'easeInOutQuad',
      //   delay: 1000,
      //   duration: 2000
      // })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
*, :after, :before {
  box-sizing: border-box;
}
html, body {
  height: 100%;
}
body {
  margin: 0;

}
#app {
  height: 100%;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

.wrap-banner-center {
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-flex;
  display: flex;
  height: 100% !important;
  justify-content: center;
}

.wrap-banner {
  display: -webkit-flex;
  display: flex;
  height: auto;
  justify-content: center;
}

canvas {
  position: fixed;
  top:0;
  left:0;
  z-index: -10;
  width: 100%;
  height: 100%;
}

/* .reverse{
  flex-direction: column-reverse !important;
} */

/* .center-content {
  width:100%;
  margin-top: 50vh;
  transform: translateY(-120%);
} */

.component-fade-enter-active, .component-fade-leave-active {
  transition: all 0.8s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
  transform: translateX(2em);
}
</style>
