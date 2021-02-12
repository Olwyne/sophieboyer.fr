<template>
    <div class="thumb-project">
      <div class="item" @mouseover="animeEnter(project.id)"  @mouseleave="animeLeave(project.id)">
        <img class="thumb" alt="thumb" v-bind:src="image" v-bind:class="'img'+ project.id" />
        <p v-bind:class="project.id" class="thumb-title">{{project.name}}</p>
      </div>
    </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js'

export default {
  name: 'Projects',
  props: [
    'project',
    'index'
  ],
  components: {},
  data () {
    return {
      image: null
    }
  },
  created () {
    var self = this
    this.project.images.forEach(function (childSnapshot) {
      if (childSnapshot.name === 'banner') {
        self.image = (childSnapshot.url)
      }
    })
  },
  methods: {
    // Animation
    animeEnter (name) {
      var el = document.getElementsByClassName(name)
      anime({
        targets: el,
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 500
      })
      var img = '.img' + name
      anime({
        targets: img,
        scale: [1, 1.3],
        easing: 'easeInOutQuad',
        duration: 500
      })
    },
    // Animation
    animeLeave (name) {
      var el = document.getElementsByClassName(name)
      anime({
        targets: el,
        opacity: [1, 0],
        easing: 'easeInOutQuad',
        duration: 500
      })
      var img = '.img' + name
      anime({
        targets: img,
        scale: [1.3, 1],
        easing: 'easeInOutQuad',
        duration: 500
      })
    }
  }
}
</script>

<style scoped>
.thumb-project {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

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

.item {
  margin: 10px;
  border: white solid 1px;
  display: flex;
  align-items: baseline;
  position: relative;
  height: auto;
  overflow: hidden;
}

.thumb {
  width: 100%;
}

.thumb-title{
  background-color: rgba(0%, 0%, 0%,0.9);
  opacity: 0;
  color : white;
  text-decoration: none;
  margin : 0;
  position : absolute;
  bottom : 0;
  z-index : 1;
  width: 100%;
  height: 100%;
  align-items: baseline;
  display : flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  text-transform: uppercase;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 100;
}
</style>
