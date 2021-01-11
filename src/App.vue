<template>
  <div id="app">
    <div id="content" v-bind:class="[$route.name!=='Home' ? activeClass : 'center-content','']">
      <router-view :language="$i18n.locale" :idProject="id"></router-view>
    </div>
    <div id="nav" v-bind:class="[$route.name==='Home' ? activeClass : 'nav-second', $route.name!=='Home' ? activeClass : 'nav-main', 'nav']" >
      <router-link v-if="$route.name!=='Home'" to="/">{{ $t("Nav-Home") }}</router-link>
      <router-link to="/projects">{{ $t("Nav-Project") }}</router-link>
      <router-link to="/about">{{ $t("Nav-AboutMe") }}</router-link>
      <!-- <router-link to="/contact">{{ $t("Nav-Contact") }}</router-link> -->
      <img class="flag" v-if="$i18n.locale=='fr'" v-on:click="$i18n.locale='en'" alt="fr"  src="@/assets/icons8-etats-unis-96.png">
      <img class="flag" v-if="$i18n.locale=='en'" v-on:click="$i18n.locale='fr'" alt="en"  src="@/assets/icons8-france-96.png">
    </div>
      <footer v-bind:class="[$route.name!=='Home' ? activeClass : 'footer-fixed']">
          <ul>
            <li><a href="https://www.linkedin.com/in/sophie-boyer/">LinkedIn</a></li>
            <li><a href="https://www.youtube.com/channel/UCBgH8kod4JgnyT9prnlTNVQ/">Youtube</a></li>
            <li><a href="https://github.com/olwyne">Github</a></li>
            <li>
              <p>👋</p>
            </li>
          </ul>
      </footer>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: '',
  components: {
  },
  props: {
    activeClass: String
  },
  data () {
    return {
      id: null
    }
  },
  methods: {
    ...mapActions([
      'setActiveProject'
    ])
  },
  computed: {
    ...mapGetters([
      'getActiveProject'
    ])
  },
  mounted: function () {
    this.id = this.getActiveProject
    console.log(this.id)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

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
  background-image: url("./assets/bg.png") ;
  background-size: 100% 100%;
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

.center-content {
  width:100%;
  margin-top: 50vh; /* poussé de la moitié de hauteur de viewport */
  transform: translateY(-70%); /* tiré de la moitié de sa propre hauteur */
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
  margin : 30px;
}

.nav-main {
  font-size: 25px;
}

.nav a.router-link-exact-active {
  color: rgb(147, 89, 180);
}

.nav-second {
  position: fixed;
  text-align: right;
  right: 0;
  padding: 40px !important;
  font-size: 16px;
  background-color: rgba(0, 25, 44,0.9);
}

.flag{
  width: 25px;
  vertical-align: middle;
}

footer {
  margin-top : 10px;
  color: white;
  background-color: rgba(0, 25, 44,0.5);
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

@media (min-width: 500px) {
  footer ul {
    grid-auto-flow: column;
  }
}

footer a {
  color: white;
  text-decoration: none;
  box-shadow: inset 0 -1px 0 hsla(0, 0%, 100%, 0.4);
}

footer p {
  margin : 0;
}

footer a:hover {
  box-shadow: inset 0 -1.2em 0 hsla(0, 0%, 100%, 0.4);
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

</style>
