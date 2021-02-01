<template>
  <div class="contact">
    <h1>{{ $t("Title-Contact") }}</h1>
    <p class="text">
      {{ $t("Contact-text") }}
    </p>
    <a href="https://www.linkedin.com/in/sophie-boyer/">
      <img class="img" alt="logo linkedin"  src="@/assets/logo-linkedin.png">
    </a>
    <a href="https://www.youtube.com/channel/UCBgH8kod4JgnyT9prnlTNVQ/">
      <img class="img" alt="logo youtube"  src="@/assets/logo-youtube.png">
    </a>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  components: {
  }
}
</script>

<style scoped>
.text{
  width: 70%;
  margin: auto;
}

.img{
  width: 100px;
  margin: 50px 25px;
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
</style>
