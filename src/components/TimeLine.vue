<template>
    <div id="timeline-content">
        <h2 class="title">{{title}}</h2>
        <div class="item" v-for="experience in experiencesList"  :key="experience.company">
            <div class="image">
                <div>
                <img v-bind:src="experience.image" />
                <span>
                    {{ experience.date }}
                </span>
                </div>
            </div>
            <div class="details">
                <div>
                    <h1>{{ experience.job }}</h1>
                    <p>{{ experience.description }}</p>
                    <p class="italic">{{ experience.location }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Projects',
  components: {},
  data () {
    return {
      test: null
    }
  },
  props: {
    experiencesList: null,
    title: null
  },
  created () {
  }
}
</script>

<style scoped>
.title{
    margin: auto;
    font-size: 30px;
    color: white;
    font-weight: 100;
    text-transform: uppercase;
}

.item {
  display: flex;
  max-width: 1000px;
  margin: auto;
}

.image {
    padding: 1em 1em 1em 0em;
}
.image > div {
    position: relative;
    text-align: center;
    font-size: 0.8em;
}

img {
    border-radius: 50%;
    height: 5em;
    border: 0.35em solid rgb(99, 90, 126);
    background: rgb(99, 90, 126);
}
span {
    display: block;
    clear: both;
    padding: 0.25em 0;
    margin: 0.5em 0;
    background: rgb(99, 90, 126);
}

.details {
position: relative;
flex-grow: 1;
}
.details > div {
    border: 1px solid rgb(99, 90, 126);
    color :rgb(99, 90, 126);
    background: rgba(0,0,0,0.8);
    border-radius: 0.5em;
    padding: 1.5em;
    margin: 1em 0;
}

.details > div > h1 {
    font-size: 16px;
    margin: 0;
    padding: 0 0 0.5em 0;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

.details >  p {
    margin: 0;
    padding: 0;
    line-height: 150%;
}

.italic {
   font-style: italic;
   font-size: 14px;
}
</style>
