<template>
  <div id="app" v-bind:class="[$route.name!=='Home' ? activeClass : 'reverse', '']">
    <header class="header" v-bind:class="[$route.name==='Home' ? activeClass : 'nav-second', $route.name!=='Home' ? activeClass : 'nav-main', 'nav']">
      <input class="menu-btn" type="checkbox" id="menu-btn" />
      <label class="menu-icon" v-bind:class="[$route.name!=='Home' ? activeClass : 'icon-none','']" for="menu-btn"><span class="navicon"></span></label>
      <ul class="menu">
        <li v-on:click="transitionPage"><router-link v-if="$route.name!=='Home'" to="/">{{ $t("Nav-Home") }}</router-link></li>
        <li v-on:click="transitionPage"> <router-link  to="/projects">{{ $t("Nav-Project") }}</router-link></li>
        <li v-on:click="transitionPage"><router-link  to="/about">{{ $t("Nav-AboutMe") }}</router-link></li>
        <!-- <li><router-link to="/contact">{{ $t("Nav-Contact") }}</router-link></li> -->
        <li><img class="flag"  v-if="$i18n.locale=='fr'" v-on:click="$i18n.locale='en'" alt="fr"  src="@/assets/icons8-etats-unis-96.png"></li>
        <li> <img class="flag"  v-if="$i18n.locale=='en'" v-on:click="$i18n.locale='fr'" alt="en"  src="@/assets/icons8-france-96.png"></li>
      </ul>
    </header>
    <div id="content" v-bind:class="[$route.name!=='Home' ? activeClass : 'center-content','']">
      <router-view :language="$i18n.locale" :idProject="id"></router-view>
    </div>
    <div class="btn-bg bg-1" v-if="$route.name!=='Home' && isUserScrolling"  v-on:click="goTop()">
      <div class="btn btn-1">
        <span>↑</span>
      </div>
    </div>
    <footer v-if="$route.name!=='Home'" v-bind:class="[$route.name!=='Home' ? activeClass : 'footer-fixed']">
        <ul>
          <li><a href="https://www.linkedin.com/in/sophie-boyer/">LinkedIn</a></li>
          <li><a href="https://www.youtube.com/channel/UCBgH8kod4JgnyT9prnlTNVQ/">Youtube</a></li>
          <li><a href="https://github.com/olwyne">Github</a></li>
          <li>
            <p>👋</p>
          </li>
        </ul>
    </footer>
    <div id="cache-haut"></div>
    <div id="cache-bas"></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions, mapGetters } from 'vuex'
import init from './assets/index'
import anime from 'animejs/lib/anime.es.js'

export default {
  name: '',
  components: {
  },
  props: {
    activeClass: String
  },
  data () {
    return {
      id: null,
      isUserScrolling: false
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
    init()
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions([
      'setActiveProject'
    ]),
    goTop () {
      window.scrollTo(0, 0)
    },
    handleScroll (event) {
      if (window.scrollY > 0) {
        this.isUserScrolling = true
      } else {
        this.isUserScrolling = false
      }
    },
    enterElement (el, done) {
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
      // anime.timeline({ loop: false }).add({
      //   targets: '#content',
      //   opacity: [1, 0],
      //   easing: 'easeInOutQuad',
      //   duration: 1000
      // }).add({
      //   targets: '#content',
      //   opacity: [0, 1],
      //   easing: 'easeInOutQuad',
      //   duration: 500,
      //   delay: 1000
      // })
      // anime.timeline({ loop: false }).add({
      //   targets: 'footer',
      //   opacity: [1, 0],
      //   easing: 'easeInOutQuad',
      //   duration: 1000
      // }).add({
      //   targets: 'footer',
      //   opacity: [0, 1],
      //   easing: 'easeInOutQuad',
      //   duration: 500,
      //   delay: 1000
      // })
      // anime.timeline({ loop: false }).add({
      //   targets: 'header',
      //   opacity: [1, 0],
      //   easing: 'easeInOutQuad',
      //   duration: 1000
      // }).add({
      //   targets: 'header',
      //   opacity: [0, 1],
      //   easing: 'easeInOutQuad',
      //   duration: 500,
      //   delay: 1000
      // })
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
    this.enterElement()
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

.nav {
  width:100%;
}

.nav a{
  width:100%;
  font-weight: 100;
  text-transform: uppercase;
  text-decoration : none;
  color: white;
}

.nav-main {
  font-size: 25px;
  transform: translateY(-300%);
}

.nav a.router-link-exact-active {
  color: rgb(99, 90, 126);
  font-weight: 300;
  border-bottom: 2px solid rgb(99, 90, 126);
}

.nav-main a:hover {
  color: rgb(99, 90, 126);
  font-weight: 300;
  border-bottom: 2px solid rgb(99, 90, 126);
}

.nav-second {
  position: fixed;
  text-align: right;
  right: 0;
  font-size: 16px;
  background-color: rgba(0, 0, 0,0.9);
}

.flag{
  width: 25px;
  vertical-align: middle;
}

footer {
  margin-top : 10px;
  color: white;
  background-color: rgba(0, 0, 0,0.9);
  padding: 18px;
  display: flex;
  width: 100%;
  line-height: 1.3;
}

.footer-fixed {
  position : fixed;
  bottom: 0;
}

footer ul {
  display: inline-grid;
  grid-auto-flow: row;
  grid-gap: 24px;
  justify-items: center;
  margin: auto;
  list-style-type: none;
}

@media only screen and (min-width: 501px) {
 /* Appareils avec une résolution au-dessus de 500px */
  footer ul {
    grid-auto-flow: column;
  }
}
@media only screen and (max-width: 500px) {
 /* Appareils avec une résolution de 500 pixels ou moins */
 footer ul {
    grid-auto-flow: column;
    margin: 0;
  }
  .nav-main{
    position: relative;
  }
  .nav-main a {
    margin: 20px;
  }

  .nav-main .menu-icon {
    display : none;
  }

  .nav-main .menu {
    max-height: 100% !important;
  }
  .header {
    width: 100% !important;
    text-align: center;
  }
  #app {
    position: relative;
    display: inline-flex;
  }
  .reverse{
    margin-top: 50%;
  }
  .icon-none {
    display : none !important;
  }
}

footer {
  margin-top : 50px;
}

footer a {
  color: white;
  text-decoration: none;
}

footer p {
  margin : 0;
}

footer a:hover {
  border-bottom: 1px solid rgb(99, 90, 126);
}

footer li:last-child {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

footer li:hover ~ li p {
  animation: wave-animation 0.3s infinite;
}

@keyframes wave-animation {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(-15deg);
  }
}

.header {
  width: 100%;
  z-index: 3;
}

.header ul {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
}

.header li {
  display: block;
  margin: 20px 20px;
  text-decoration: none;
}

.header .menu-btn:hover {
  background-color: black;
}

/* menu */

.header .menu {
  clear: both;
  max-height: 0;
  transition: max-height .2s ease-out;
}

/* menu icon */

.header .menu-icon {
  cursor: pointer;
  display: inline-block;
  padding: 28px 20px;
  position: relative;
  user-select: none;
}

.header .menu-icon .navicon {
  background: white;
  display: block;
  height: 5px;
  position: relative;
  transition: background .2s ease-out;
  width: 30px;
}

.header .menu-icon .navicon:before,
.header .menu-icon .navicon:after {
  background: white;
  content: '';
  display: block;
  height: 100%;
  position: absolute;
  transition: all .2s ease-out;
  width: 100%;
}

.header .menu-icon .navicon:before {
  top: 10px;
}

.header .menu-icon .navicon:after {
  top: -10px;
}

/* menu btn */

.header .menu-btn {
  display: none;
}

.header .menu-btn:checked ~ .menu {
  max-height: 100%;
}

.header .menu-btn:checked ~ .menu-icon .navicon {
  background: transparent;
}

.header .menu-btn:checked ~ .menu-icon .navicon:before {
  transform: rotate(-45deg);
}

.header .menu-btn:checked ~ .menu-icon .navicon:after {
  transform: rotate(45deg);
}

.header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:before,
.header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:after {
  top: 0;
}

/* 48em = 768px */

@media (min-width: 48em) {
  .header li {
    float: left;
  }
  .header li a {
    padding: 20px 30px;
  }
  .header .menu {
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: none;
  }
  .header .menu-icon {
    display: none;
  }

}

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
