<template>
  <div class="project">
    <h1>{{ $t("Title-Project") }}</h1>
    <div class="menu">
      <ButtonFilterMenu @click.native="filterProjects('all')" :text='$t("Menu-All")' />
      <ButtonFilterMenu @click.native="filterProjects('web')" :text='$t("Menu-Web")' />
      <ButtonFilterMenu @click.native="filterProjects('graphisme')" :text='$t("Menu-Design")' />
      <ButtonFilterMenu @click.native="filterProjects('jeux video')" :text='$t("Menu-Games")' />
      <ButtonFilterMenu @click.native="filterProjects('audiovisuel')" :text='$t("Menu-Audiovisual")' />
    </div>
    <div class="items">
      <router-link class="item" v-for="project in projectsList"  :key="project.name"  :to="{ name: 'Project', params: { project: project }, query: { debug: true }}">
          <ThumbProject @click.native="setActiveProject(project.id), transitionPage()" :project="project"></ThumbProject>
      </router-link>
    </div>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>
<script>
// @ is an alias to /src
import ThumbProject from '@/components/ThumbProject.vue'
import ButtonFilterMenu from '@/components/ButtonFilterMenu.vue'
import { db } from '../config/firebase'
import { mapActions, mapGetters } from 'vuex'
import anime from 'animejs/lib/anime.es.js'

export default {
  name: 'Projects',
  components: {
    ThumbProject,
    ButtonFilterMenu
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

@media only screen and (max-width: 500px) {
  .item {
    width: 90% !important;
  }
}

</style>
