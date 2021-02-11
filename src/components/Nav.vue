<template>
 <b-navbar toggleable="lg" type="dark" variant="info" v-bind:class="[$route.name!=='Home' ? activeClass : 'nav-main', 'nav-second']">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="$route.name!=='Home'"><router-link  to="/">{{ $t("Nav-Home") }}</router-link></b-nav-item>
        <b-nav-item ><router-link  to="/projects">{{ $t("Nav-Project") }}</router-link></b-nav-item>
        <b-nav-item ><router-link  to="/about">{{ $t("Nav-AboutMe") }}</router-link></b-nav-item>
        <b-nav-item  v-if="$i18n.locale=='fr'"><img class="flag"  v-on:click="$i18n.locale='en', setLanguage('en')" alt="fr"  src="@/assets/icons8-etats-unis-96.png"></b-nav-item>
        <b-nav-item  v-if="$i18n.locale=='en'" class="padding-top"><img class="flag"  v-on:click="$i18n.locale='fr', setLanguage('fr')" alt="en"  src="@/assets/icons8-france-96.png"></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Nav',
  components: {},
  data () {
    return {
      activeClass: String
    }
  },
  methods: {
    // get last language
    setLanguage () {
      const parsed = JSON.stringify(this.$i18n.locale)
      localStorage.setItem('language', parsed)
    }
  }
}
</script>

<style scoped>
.bg-info {
    background-color: rgba(0, 0, 0,0.5) !important;
    position: fixed;
    width: 100%;
    color: white;
    font-weight: 100;
    text-transform: uppercase;
    text-decoration : none;
    z-index: 999;
}

a {
    color : white  !important;
}

a:hover {
    color : rgb(184, 174, 214);
}

.flag{
  width: 25px;
  vertical-align: middle;
}

.dropdown-menu {
    background-color: transparent !important;
}
.nav-main {
  top: 60%;
}
.nav-main .navbar-nav{
  margin: auto !important;
  font-size: 25px  !important;
}
.nav-second .navbar-nav{
    font-size: 18px;
}

.nav-second .navbar-nav .nav-link{
    padding-right: 1rem !important;
    padding-left: 1rem !important;
}

@media only screen and (max-width: 992px) {
    .nav-main {
        top: 0;
    }
}

.padding-top a{
    padding-top: 0.3rem;
}
</style>
