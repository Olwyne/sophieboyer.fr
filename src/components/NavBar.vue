<template>
    <header class="header" v-bind:class="[$route.name==='Home' ? activeClass : 'nav-second', $route.name!=='Home' ? activeClass : 'nav-main', 'nav']">
      <input class="menu-btn" type="checkbox" id="menu-btn" />
      <label class="menu-icon" v-bind:class="[$route.name!=='Home' ? activeClass : 'icon-none','']" for="menu-btn"><span class="navicon"></span></label>
      <ul class="menu">
        <li><router-link v-if="$route.name!=='Home'" to="/">{{ $t("Nav-Home") }}</router-link></li>
        <li> <router-link  to="/projects">{{ $t("Nav-Project") }}</router-link></li>
        <li ><router-link  to="/about">{{ $t("Nav-AboutMe") }}</router-link></li>
        <li><img class="flag"  v-if="$i18n.locale=='fr'" v-on:click="$i18n.locale='en', setLanguage('en')" alt="fr"  src="@/assets/icons8-etats-unis-96.png"></li>
        <li> <img class="flag"  v-if="$i18n.locale=='en'" v-on:click="$i18n.locale='fr', setLanguage('fr')" alt="en"  src="@/assets/icons8-france-96.png"></li>
      </ul>
    </header>
</template>

<script>
export default {
  name: 'NavBar',
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

@media only screen and (max-width: 500px) {
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

.header .menu {
  clear: both;
  max-height: 0;
  transition: max-height .2s ease-out;
}

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
</style>
