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
          <a class="button" v-bind:href="project.link">{{ $t("Project-link") }}</a>
        </p>
      </div>
    </div>
    <div class="other-project" v-if="projectsList.length!==0">
      <h2>{{ $t("Title-OtherProject") }}</h2>
      <div class="items">
          <splide :options="optionsProjects">
            <splide-slide v-for="item in projectsList" :key="item.id" >
              <router-link class="item"   @click.native="changeProject(item)" :to="{ name: 'Project', params: { project: item }, query: { debug: true }}">
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
    this.project = this.$route.params.project
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
          if (childSnapshot.key === self.getActiveProject) {
            tmp = childSnapshot.val()
            tmp.images = tmp.images.filter(item => item !== 'empty')
            tmp.id = childSnapshot.key
            self.project = tmp
          }
        })
      })
      this.mountedProjects()
      this.project.images = this.project.images.filter(item => item !== 'empty')
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
          if ((childSnapshot.val().type === self.project.type) && (childSnapshot.key !== self.project.id)) {
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
  width: 70%;
  margin: 20px 0 50px 0;
  border: white solid 1px;
}

.container-about{
  width: 70%;
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

</style>
