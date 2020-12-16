<template>
  <div class="project">
    <h1>{{ $t("Title-Project") }}</h1>
    <div class="items">
      <router-link class="item" v-for="project in projectsList" :key="project.Name" :to="{ name: 'Project', params: { project: project }, query: { debug: true }}">
          <ThumbProject :project="project"></ThumbProject>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ThumbProject from '@/components/ThumbProject.vue'
import { db } from '../config/firebase'

export default {
  name: 'Projects',
  components: {
    ThumbProject
  },
  data () {
    return {
      projectsList: []
    }
  },
  mounted: function () {
    this.mountedProject()
  },
  methods: {
    mountedProject () {
      const self = this
      var query = db.ref('Projects').orderByKey()
      query.once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          self.projectsList.push(childSnapshot.val())
        })
      })
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

.items {
  width: 100%;
  display: flex;
  position: relative;
  height: auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.item {
  width: 40%;
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
</style>
