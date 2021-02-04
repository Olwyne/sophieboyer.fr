<template>
  <div class="project main-title">
    <h1>{{ $t("Title-Project") }}</h1>
    <div class="menu">
      <ButtonFilterMenu @click.native="filterProjects('all')" :text='$t("Menu-All")' />
      <ButtonFilterMenu @click.native="filterProjects('web')" :text='$t("Menu-Web")' />
      <ButtonFilterMenu @click.native="filterProjects('graphisme')" :text='$t("Menu-Design")' />
      <ButtonFilterMenu @click.native="filterProjects('jeux video')" :text='$t("Menu-Games")' />
      <ButtonFilterMenu @click.native="filterProjects('audiovisuel')" :text='$t("Menu-Audiovisual")' />
    </div>
    <transition-group appear name="slide-in" class="items" tag="div" >
      <!-- <router-link class="item" v-for="(project, index) in projectsList" :key="project.name"  :to="{ name: 'Project', params: { project: project }, query: { project: project.id }}">
          <ThumbProject :project="project" :index="index"></ThumbProject>
      </router-link> -->
      <div class="item" v-for="(project, index) in projectsList" :key="project.name">
        <b-button v-bind:id="index" @click="$bvModal.show(getTarget(index))"><ThumbProject :project="project" :index="index"></ThumbProject></b-button>
         <b-modal v-bind:id="getTarget(index)" hide-footer  size="xl" header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="dark"
      body-text-variant="light"
     >
            <ModalProject :project="project" :index="index" />
        </b-modal>
      </div>
    </transition-group>
  </div>
</template>

<script>
import ModalProject from '@/components/ModalProject.vue'
import ThumbProject from '@/components/ThumbProject.vue'
import ButtonFilterMenu from '@/components/ButtonFilterMenu.vue'
import { db } from '../config/firebase'
// import anime from 'animejs/lib/anime.es.js'

export default {
  name: 'Projects',
  components: {
    ThumbProject,
    ButtonFilterMenu,
    ModalProject
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
    // Change language reset text
    language: function () {
      this.projectsList = []
      this.backupProject = []
      this.mountedProject()
    }
  },
  mounted: function () {
    this.projectsList = []
    this.backupProject = []
    this.mountedProject()
  },
  methods: {
    getTarget (id) {
      return `'modal-${id}'`
    },
    // Load project from firebase
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
    },
    // Filter projects
    filterProjects (value) {
      if (value !== 'all') {
        this.projectsList = this.backupProject.filter(item => item.type === value)
      } else {
        this.projectsList = this.backupProject
      }
      // var self = this
      // anime({
      //   targets: '.items .item',
      //   opacity: [1, 0],
      //   easing: 'easeInOutQuad',
      //   duration: 500,
      //   complete: function () {
      //   }
      // })
    }
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
.btn-secondary{
  background-color: transparent !important;
  border-color: transparent !important;
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

  h1 {
    font-size: 40px !important;
  }
}

.slide-in-enter{
  opacity: 0;
  transform: scale(0.5);
}

.slide-in-enter-active {
    transition: all .6s ease;
    transition-delay: calc( .1s * var(--i) );
}
</style>
