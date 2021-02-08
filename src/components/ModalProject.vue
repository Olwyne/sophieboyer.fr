<template>
    <div class="project">
    <div class="main-project">
      <h1>{{ project.name }}</h1>
      <h2>{{ project.date }} - {{ project.type }}</h2>
      <div class="container-img">
        <!-- <img class="thumb" v-bind:src="project.images[1].url"> -->
        <splide @splide:mounted="updateArrow" :options="options" v-if="project.slide.length >0" ref="primary">
          <splide-slide v-for="(image) in project.slide" :key="image.name" >
            <img class="thumb" v-bind:src="image.url">
          </splide-slide>
        </splide>
      </div>
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
    <!-- <div class="other-project" v-if="projectsList.length!==0">
      <h2>{{ $t("Title-OtherProject") }}</h2>
      <div class="items">
          <splide :options="optionsProjects">
            <splide-slide v-for="item in projectsList" :key="item.id" >
              <router-link class="item" @click.native="changeProject(item)" :to="{ name: 'Project', params: { project: item }, query: { project: item.id }}">
                <ThumbProject :project="item"></ThumbProject>
              </router-link>
            </splide-slide>
          </splide>
      </div>
    </div> -->
  </div>
</template>

<script>

import { db } from '../config/firebase'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'

export default {
  name: 'Projects',
  components: {

  },
  props: {
    project: null
  },
  data () {
    return {
      projectsList: [],
      backupProject: [],
      options: {
        type: 'fade',
        rewind: true,
        width: 800,
        arrows: true,
        pagination: true,
        lazyLoad: 'nearby'
      }
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
    },
    // Update slider
    updateArrow () {
      if (this.project.slide.length <= 1) {
        this.options.arrows = false
        this.options.pagination = false
        document.getElementsByClassName('splide__arrow')[0].style.display = 'none'
        document.getElementsByClassName('splide__arrow')[1].style.display = 'none'
        document.getElementsByClassName('splide__pagination__page')[0].style.display = 'none'
      } else {
        this.options.arrows = true
        this.options.pagination = true
        document.getElementsByClassName('splide__arrow')[0].style.display = 'block'
        document.getElementsByClassName('splide__arrow')[1].style.display = 'block'
        document.getElementsByClassName('splide__pagination__page')[0].style.display = 'block'
      }
    }
  }
}
</script>

<style scoped>

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
  font-size: 50px;
  color: white;
  text-transform: uppercase;
  margin : 0;
  width: 90%;
  margin: auto;
  text-align: center;
}

h2 {
  font-size: 30px;
  color: white;
  font-weight: 100;
  text-transform: uppercase;
  text-align: center;
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
  background-color: #766D98;
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

.container-img{
  width: 100%;
  text-align: center;
}

</style>
