<template>
  <button class="btn draw-border">{{ text }}</button>
</template>

<script>
export default {
  name: 'ButtonFilterMenu',
  props: {
    text: String
  }
}
</script>

<style scoped>
.draw-border {
  box-shadow: inset 0 0 0 4px black;
  color:white;
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
  border-bottom-width: 2px;
  border-left-width: 2px;
}
.draw-border::after {
  border-top-width: 2px;
  border-right-width: 2px;
}
.draw-border:hover {
  color:white;
  text-shadow: 1px 0 10px black;
}
.draw-border:hover::before, .draw-border:hover::after {
  border-color: white;
  text-shadow: 1px 0 10px black;
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
  padding: 1em 2em;
  letter-spacing: 0.05rem;
  margin: 10px;
}
.btn:focus {
  color:white;
  border-color: white;
  text-shadow: 1px 0 10px black;
  box-shadow: inset 0 0 0 4px white;
}
</style>
