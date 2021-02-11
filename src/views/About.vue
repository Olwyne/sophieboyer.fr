<template>
  <div class="about">
    <h1>{{ $t("Title-AboutMe") }}</h1>
    <div class="container">
      <div class="row">
        <TimeLine :experiencesList="experiencesList" :title="$t('About-experience')" class="col col-md-6"></TimeLine>
        <TimeLine :experiencesList="educationsList" :title="$t('About-education')" class="col col-md-6"></TimeLine>
     </div>
    </div>
  </div>
</template>

<script>
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
    // Change data when language change
    language: function () {
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
    // Load experiences from firebase
    mountedExperiences () {
      var query = db.ref(this.language + '/experiences').orderByKey()
      const self = this
      query.once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          self.experiencesList.push(childSnapshot.val())
        })
      })
    },
    // Load education from firebase
    mountedEducation () {
      var query = db.ref(this.language + '/educations').orderByKey()
      const self = this
      query.once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          self.educationsList.push(childSnapshot.val())
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
  width: 50%;
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
  h1 {
    font-size: 40px !important;
  }
}
</style>
