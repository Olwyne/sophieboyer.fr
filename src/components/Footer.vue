<template>
    <footer v-if="$route.name!=='Home'" v-bind:class="[$route.name!=='Home' ? activeClass : 'footer-fixed']">
        <ul>
          <li><a href="https://www.linkedin.com/in/sophie-boyer/">LinkedIn</a></li>
          <li>
            <p>👋</p>
          </li>
        </ul>
    </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      activeClass: String
    }
  }
}
</script>

<style scoped>
footer {
  margin-top : 10px;
  color: white;
  background-color: rgba(0, 0, 0,0.9);
  padding: 18px;
  display: flex;
  width: 100%;
  line-height: 1.3;
}

.footer-fixed {
  position : fixed;
  bottom: 0;
}

footer ul {
  display: inline-grid;
  grid-auto-flow: row;
  grid-gap: 24px;
  justify-items: center;
  margin: auto;
  list-style-type: none;
}

@media only screen and (min-width: 501px) {
  footer ul {
    grid-auto-flow: column;
  }
}
@media only screen and (max-width: 500px) {
 footer ul {
    grid-auto-flow: column;
    margin: 0;
  }
}

footer {
  margin-top : 50px;
}

footer a {
  color: white;
  text-decoration: none;
}

footer p {
  margin : 0;
}

footer a:hover {
  border-bottom: 1px solid rgb(99, 90, 126);
}

footer li:last-child {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

footer li:hover ~ li p {
  animation: wave-animation 0.3s infinite;
}

@keyframes wave-animation {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(-15deg);
  }
}
</style>
