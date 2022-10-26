<template>
  <NavBar />
  <!-- //fullPath表示用完整路径判重,不是用name来判重 -->
  <router-view :key="$route.fullPath"/>         
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import NavBar from './components/NavBar';

export default {
  name: "App",
  components: {
    NavBar,
  }
}

</script>

<style>
#app {
  margin-top: 0;
}
</style>