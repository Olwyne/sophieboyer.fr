<template>
  <div id="app">
    <div id="content" v-bind:class="[$route.name!=='Home' ? activeClass : 'center-content','']">
      <router-view/>
    </div>
    <div id="nav" v-bind:class="[$route.name==='Home' ? activeClass : 'nav-second', $route.name!=='Home' ? activeClass : 'nav-main', 'nav']" >
      <router-link v-if="$route.name!=='Home'" to="/">{{ $t("Nav-Home") }}</router-link>
      <router-link to="/projects">{{ $t("Nav-Project") }}</router-link>
      <router-link to="/aboutme">{{ $t("Nav-AboutMe") }}</router-link>
      <router-link to="/contact">{{ $t("Nav-Contact") }}</router-link>
      <img class="flag" v-if="$i18n.locale=='fr'" v-on:click="$i18n.locale='en'" alt="fr"  src="@/assets/icons8-etats-unis-96.png">
      <img class="flag" v-if="$i18n.locale=='en'" v-on:click="$i18n.locale='fr'" alt="en"  src="@/assets/icons8-france-96.png">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: '',
  components: {
  },
  props: {
    activeClass: String
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
  display: grid;
  padding-bottom: 100px;
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
}

.flag{
  width: 25px;
  vertical-align: middle;
}
</style>
