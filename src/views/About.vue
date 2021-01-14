<template>
  <div class="about">
    <h1>{{ $t("Title-AboutMe") }}</h1>
    <!-- <p class="text">
      {{ $t("About-text") }}
    </p> -->
    <div class="container">
     <TimeLine :experiencesList="experiencesList" :title="$t('About-experience')" class="column"></TimeLine>
     <TimeLine :experiencesList="educationsList" :title="$t('About-education')" class="column"></TimeLine>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import TimeLine from '@/components/TimeLine.vue'
import { db } from '../config/firebase'

export default {
  name: 'About',
  components: {
    TimeLine
  },
  props: {
    language: null
  },
  data () {
    return {
      experiencesList: [],
      educationsList: [],
      title1: null,
      title2: null
    }
  },
  watch: {
    language: function (newVal, oldVal) { // watch it
      this.experiencesList = []
      this.educationsList = []
      this.mountedExperiences()
      this.mountedEducation()
    }
  },
  created: function () {
    this.mountedExperiences()
    this.mountedEducation()
  },
  methods: {
    mountedExperiences () {
      var query = db.ref(this.language + '/experiences').orderByKey()
      const self = this
      query.once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          self.experiencesList.push(childSnapshot.val())
          // db.ref('en/experiences/' + childSnapshot.key).set({
          //   job: childSnapshot.val().job,
          //   image: childSnapshot.val().image,
          //   company: childSnapshot.val().company,
          //   date: childSnapshot.val().date,
          //   location: childSnapshot.val().location,
          //   description: childSnapshot.val().description
          // })
        })
      })
    },
    mountedEducation () {
      var query = db.ref(this.language + '/educations').orderByKey()
      const self = this
      query.once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          self.educationsList.push(childSnapshot.val())
          // db.ref('en/educations/' + childSnapshot.key).set({
          //   job: childSnapshot.val().job,
          //   image: childSnapshot.val().image,
          //   company: childSnapshot.val().company,
          //   date: childSnapshot.val().date,
          //   location: childSnapshot.val().location,
          //   description: childSnapshot.val().description
          // })
        })
      })
    }
  }
}
</script>

<style scoped>
.text{
  width: 70%;
  margin: auto;
}

h1{
  letter-spacing: 15px;
  font-weight: 100;
  font-size: 80px;
  color: white;
  text-transform: uppercase;
  margin-top: 100px;
}

h2{
  font-size: 30px;
  color: white;
  font-weight: 100;
  text-transform: uppercase;
}

.container{
  display: flex;
  justify-content: center;
}

.column{
  width: 40%;
}

@media only screen and (max-width: 500px) {
  .text{
    width: 90%;
    font-size: 20px;
  }

  .container{
    display: block !important;
  }
  .column{
    width: 100% !important;
  }
}
</style>
