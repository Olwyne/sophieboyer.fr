<template>
  <div class="project">
    <div class="main-project">
      <h1>{{ project.name }}</h1>
      <h2>{{ project.date }} - {{ project.type }}</h2>
      <splide :options="options" v-if="project.images != null">
        <splide-slide v-for="image in project.images" :key="image.name" >
          <img class="thumb" v-bind:src="image.url">
        </splide-slide>
      </splide>
      <div class="container-about">
        <p class="description">{{ project.description }}</p>
        <p class="about">
          {{ $t("Project-software") }} : {{ project.software }}
          <br>
          {{ $t("Project-language") }} : {{ project.language }}
          <br>
          {{ $t("Project-job") }} : {{ project.job }}
          <br>
          <button class="btn draw-border" v-if="project.link"><a v-bind:href="project.link">{{ $t("Project-link") }}</a></button>
        </p>
      </div>
    </div>
    <div class="other-project" v-if="projectsList.length!==0">
      <h2>{{ $t("Title-OtherProject") }}</h2>
      <div class="items">
          <splide :options="optionsProjects">
            <splide-slide v-for="item in projectsList" :key="item.id" >
              <router-link class="item"   @click.native="changeProject(item)" :to="{ name: 'Project', params: { project: item }, query: { project: item.id }}">
                <ThumbProject :project="item"></ThumbProject>
              </router-link>
            </splide-slide>
          </splide>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ThumbProject from '@/components/ThumbProject.vue'
import { db } from '../config/firebase'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import { mapActions, mapGetters } from 'vuex'
import anime from 'animejs/lib/anime.es.js'

export default {
  name: 'Project',
  components: {
    ThumbProject
  },
  data () {
    return {
      debug: false,
      options: {
        type: 'fade',
        rewind: true,
        width: 800,
        arrows: true,
        pagination: true,
        lazyLoad: 'nearby'
      },
      optionsProjects: {
        type: 'loop',
        rewind: true,
        width: 800,
        height: 225,
        lazyLoad: 'nearby',
        arrows: true,
        pagination: true,
        perPage: 3,
        perMove: 1,
        focus: 'center'
      },
      item: null,
      project: {
        date: null,
        description: null,
        images: [
          {
            url: null,
            name: null
          }
        ],
        job: null,
        language: null,
        link: null,
        name: null,
        software: null,
        type: null
      },
      projectsList: []
    }
  },
  props: {
    language: null
  },
  watch: {
    language: function (newVal, oldVal) { // watch it
      this.loadProject()
    }
  },
  created () {
    window.scrollTo(0, 0)
    this.project = this.$route.params.project
    this.project.id = this.$route.query.project
    this.loadProject()
  },
  computed: {
    ...mapGetters([
      'getActiveProject'
    ])
  },
  methods: {
    ...mapActions([
      'setActiveProject'
    ]),
    loadProject () {
      var self = this
      var tmp
      var query = db.ref(self.language + '/projects').orderByKey()
      query.once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.key === self.$route.query.project) {
            tmp = childSnapshot.val()
            tmp.images = tmp.images.filter(item => item !== 'empty' && item.name !== 'banner')
            tmp.id = childSnapshot.key
            self.project = tmp
          }
        })
      })
      this.mountedProjects()
      this.project.images = this.project.images.filter(item => item !== 'empty' && item.name !== 'banner')
      if (this.project.images.length <= 1) {
        this.options.arrows = false
        this.options.pagination = false
      }
    },
    mountedProjects () {
      this.projectsList = []
      var self = this
      var tmp
      var query = db.ref(this.language + '/projects').orderByKey()
      query.once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          if ((childSnapshot.val().type === self.project.type) && (childSnapshot.key !== self.$route.query.project)) {
            tmp = childSnapshot.val()
            tmp.images = tmp.images.filter(item => item !== 'empty')
            tmp.id = childSnapshot.key
            self.projectsList.push(tmp)
          }
        })
      })
    },
    changeProject (item) {
      this.setActiveProject(item.id)
      this.project.id = item.id
      // this.project.images = []
      this.loadProject()
      const scrollElement = window.document.scrollingElement || window.document.body || window.document.documentElement
      anime.timeline({ loop: false }).add({
        targets: '.project',
        opacity: [1, 0],
        easing: 'easeInOutQuad',
        duration: 500
      }).add({
        targets: scrollElement,
        scrollTop: 0,
        duration: 500,
        easing: 'easeInOutQuad',
        delay: 500
      }).add({
        targets: '.project',
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 500,
        delay: 500
      })
    }
  }
}
</script>

<style scoped>
.main-project{
  margin-top: 120px;
}

.other-project{
  margin-top : 50px;
  width: 100%;
}

.items{
  width: 100%;
  display: flex;
  position: relative;
  height: auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.item {
  width: 20%;
}

h1 {
  letter-spacing: 15px;
  font-weight: 100;
  font-size: 80px;
  color: white;
  text-transform: uppercase;
  margin : 0;
  width: 90%;
  margin: auto;
}

h2 {
  font-size: 30px;
  color: white;
  font-weight: 100;
  text-transform: uppercase;
}

.description {
  text-align: justify;
  flex: 1 1 auto;
  margin-right: 30px;
}

.about {
  flex: 0 0 200px;
  text-align: left;
}

.thumb {
  width: 95%;
  max-width: 800px;
  margin: 20px 0 50px 0;
  border: white solid 1px;
}

.container-about{
  max-width: 800px;
  width: 800px;
  margin: auto;
  display: flex;
  line-height: 2;
}

.button {
  background-color: #766D98; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 8px;
  margin-top: 20px;
}

.splide {
  margin: auto;
}

@media only screen and (max-width: 500px) {
  .container-about {
    display: block;
    font-size: 20px;
  }
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

.draw-border:hover a{
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
  padding: 1em 1em;
  letter-spacing: 0.05rem;
  margin: 10px;
}
.btn:focus {
  outline: 2px dotted #635A7E;
}

.btn a {
  color: #635A7E;
  text-decoration: none;
  font-size: 14px;
}
</style>
