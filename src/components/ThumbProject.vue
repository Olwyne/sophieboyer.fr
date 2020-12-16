<template>
    <div class="thumb-project">
      <div class="item">
        <img class="thumb" alt="thumb" src="@/assets/thumb.jpg" />
        <p class="thumb-title">{{project.Name}}</p>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Projects',
  props: {
    project: {
      name: null,
      description: null,
      date: null
    }
  },
  components: {},
  data () {
    return {
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
