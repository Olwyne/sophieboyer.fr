<template>
  <div class="project">
    <div class="main-project">
      <h1>{{ project.Name }}</h1>
      <h2>{{ project.date }} - {{ project.type }}</h2>

      <img class="thumb" alt="thumb" src="@/assets/thumb.jpg" />
      <p class="description">{{ project.description }}</p>
    </div>
    <div class="other-project" v-if="projectsList.length!==0">
      <h2>{{ $t("Title-OtherProject") }}</h2>
      <div class="items">
        <router-link class="item" v-for="item in projectsList" :key="item.Name"  @click.native="changeProject(item)" :to="{ name: 'Project', params: { project: item }, query: { debug: true }}">
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

export default {
  name: 'Project',
  components: {
    ThumbProject
  },
  data () {
    return {
      debug: false,
      project: {
        name: null,
        description: null,
        date: null
      },
      projectsList: []
    }
  },
  created () {
    this.project = this.$route.params.project
    if (this.$route.query.debug) {
      this.debug = this.$route.query.debug
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
          if ((childSnapshot.val().type === self.project.type) && childSnapshot.val().Name !== self.project.Name) {
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
  width: 90%;
  margin: auto;
  text-align: justify;
}

.thumb {
  width: 70%;
  margin: 20px 0 50px 0;
  border: white solid 1px;
}
</style>
