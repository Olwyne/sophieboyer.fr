<template>
  <div class="project">
    <div class="main-project">
      <h1>{{ project.name }}</h1>
      <h2>{{ project.date }} - {{ project.type }}</h2>
      <splide :options="options">
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
        <router-link class="item" v-for="item in projectsList" :key="item.name"  @click.native="changeProject(item)" :to="{ name: 'Project', params: { project: item }, query: { debug: true }}">
            <ThumbProject :project="item"></ThumbProject>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ThumbProject from '@/components/ThumbProject.vue'
import { db } from '../config/firebase'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'

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
        gap: '0.2rem'
      },
      project: {
        name: null,
        description: null,
        date: null,
        type: null,
        link: null,
        images: null,
        software: null,
        language: null,
        job: null
      },
      projectsList: []
    }
  },
  created () {
    this.project = this.$route.params.project
    if (this.$route.query.debug) {
      this.debug = this.$route.query.debug
    }
    this.project.images = this.project.images.filter(item => item !== 'empty')
  },
  mounted: function () {
    this.mountedProject()
  },
  methods: {
    mountedProject () {
      var self = this
      var query
      if (this.$i18n.locale === 'en') {
        query = db.ref('en/projects').orderByKey()
      } else {
        query = db.ref('fr/projects').orderByKey()
      }
      query.once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          if ((childSnapshot.val().type === self.project.type) && childSnapshot.val().name !== self.project.name) {
            self.projectsList.push(childSnapshot.val())
          }
        })
      })
    },
    changeProject (item) {
      this.project = item
      window.scrollTo(0, 0)
      this.projectsList.pop()
      this.mountedProject()
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
</style>
