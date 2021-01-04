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
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

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
    padding-left: 2em;
    font-size: 30px;
    color: white;
    font-weight: 100;
    text-transform: uppercase;
}

.item {
  display: flex;
  max-width: 1000px;
  margin: 0 auto;
}

.image {
    padding: 1em 2em;
}
.image > div {
    position: relative;
    text-align: center;
    font-size: 0.8em;
}
.image > div::after {
    content: '';
    width: 100%;
    height: 0;
    border-bottom: 1px solid #232b50;
    position: absolute;
    top: 2.75em;
    left: 2.5em;
    z-index: -1;
}

img {
    border-radius: 50%;
    height: 5em;
    border: 0.35em solid #232b50;
    background: #232b50;
}
span {
    display: block;
    clear: both;
    padding: 0.25em 0;
    margin: 0.5em 0;
    background: #3b4262;
}

.details {
position: relative;
flex-grow: 1;
}
.details > div {
    border: 1px solid #232b50;
    color :#232b50;
    background: rgba(255,255,255,0.5);
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

.details::before {
    content: '';
    width: 0;
    height: 100%;
    border-left: 1px solid #232b50;
    position: absolute;
    top: 0;
    left: -4.35em;
    z-index: -1;
}

.italic {
   font-style: italic;
   font-size: 14px;
}
</style>
