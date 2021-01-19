<template>
  <div class="project">
    <h1>{{ $t("Title-Project") }}</h1>
    <div class="menu">
      <button @click="filterProjects('all')" class="btn draw-border">{{ $t("Menu-All") }}</button>
      <button @click="filterProjects('web')" class="btn draw-border">{{ $t("Menu-Web") }}</button>
      <button @click="filterProjects('graphisme')" class="btn draw-border">{{ $t("Menu-Design") }}</button>
      <button @click="filterProjects('jeux video')" class="btn draw-border">{{ $t("Menu-Games") }}</button>
      <button @click="filterProjects('audiovisuel')" class="btn draw-border">{{ $t("Menu-Audiovisual") }}</button>
    </div>
    <div class="items">
      <router-link class="item" v-for="project in projectsList"  :key="project.name"  :to="{ name: 'Project', params: { project: project }, query: { debug: true }}">
          <ThumbProject @click.native="setActiveProject(project.id), transitionPage()" :project="project"></ThumbProject>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ThumbProject from '@/components/ThumbProject.vue'
import { db } from '../config/firebase'
import { mapActions, mapGetters } from 'vuex'
import anime from 'animejs/lib/anime.es.js'

export default {
  name: 'Projects',
  components: {
    ThumbProject
  },
  props: {
    language: null
  },
  data () {
    return {
      projectsList: [],
      backupProject: []
    }
  },
  watch: {
    language: function (newVal, oldVal) { // watch it
      this.projectsList = []
      this.mountedProject()
    }
  },
  mounted: function () {
    this.mountedProject()
  },
  methods: {
    ...mapActions([
      'setActiveProject'
    ]),
    mountedProject () {
      var query = db.ref(this.language + '/projects').orderByChild('date')
      const self = this
      var project
      query.once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          project = childSnapshot.val()
          project.id = childSnapshot.key
          self.backupProject.unshift(project)
        })
      })
      this.filterProjects('all')
      // db.ref('en/projects').update(self.projectsList)
    },
    filterProjects (value) {
      var self = this
      anime({
        targets: '.items .item',
        opacity: [1, 0],
        easing: 'easeInOutQuad',
        duration: 500,
        complete: function (anim) {
          if (value !== 'all') {
            self.projectsList = self.backupProject.filter(item => item.type === value)
          } else {
            self.projectsList = self.backupProject
          }
          anime({
            targets: '.items .item',
            opacity: [0, 1],
            easing: 'easeInOutQuad',
            delay: anime.stagger(50)
          })
        }
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
  }
}
</script>

<style scoped>
h1 {
  letter-spacing: 15px;
  font-weight: 100;
  font-size: 80px;
  color: white;
  text-transform: uppercase;
  margin-top: 100px;
}

h2 {
  font-size: 30px;
  color: white;
  font-weight: 100;
  text-transform: uppercase;
}

.items {
  width: 80%;
  margin: auto;
  display: flex;
  position: relative;
  height: auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.menu {
  margin-bottom : 25px;
}

.item {
  width: 40%;
  margin: 25px;
}

.thumb {
  width: 100%;
}

.thumb-title{
  background-color: rgba(0,0,0,0.5);
  color : white;
  text-decoration: none;
  margin : 0;
  position : absolute;
  bottom : 0;
  z-index : 1;
  width: 100%;
  height: 50px;
  align-items: baseline;
  display : flex;
  align-items: center;
  justify-content: center;
}

.draw-border {
  box-shadow: inset 0 0 0 4px #635A7E;
  color:#635A7E;
  transition: color 0.25s 0.0833333333s;
  position: relative;
}
.draw-border::before, .draw-border::after {
  border: 0 solid transparent;
  box-sizing: border-box;
  content: "";
  pointer-events: none;
  position: absolute;
  width: 0;
  height: 0;
  bottom: 0;
  right: 0;
}
.draw-border::before {
  border-bottom-width: 4px;
  border-left-width: 4px;
}
.draw-border::after {
  border-top-width: 4px;
  border-right-width: 4px;
}
.draw-border:hover {
  color:white;
}
.draw-border:hover::before, .draw-border:hover::after {
  border-color: white;
  transition: border-color 0s, width 0.25s, height 0.25s;
  width: 100%;
  height: 100%;
}
.draw-border:hover::before {
  transition-delay: 0s, 0s, 0.25s;
}
.draw-border:hover::after {
  transition-delay: 0s, 0.25s, 0s;
}

.btn {
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1.5;
  font: 700 1.2rem "Roboto Slab", sans-serif;
  padding: 1em 2em;
  letter-spacing: 0.05rem;
  margin: 10px;
}
.btn:focus {
  color:white;
}

@media only screen and (max-width: 500px) {
  .item {
    width: 90% !important;
  }
}

</style>
