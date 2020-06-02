<template>
  <div id="app">
    <Navbar home="home" login="login"/>
    <MainContent/>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <HelloWorld msg="Din mammaaaaaaa"/> -->
  </div>
</template>

<script>
import Navbar from './components/NavBar.vue'
import MainContent from './components/MainContent.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    MainContent
  }
}

</script>

<style>
body {
  margin: 0;
  padding: 0;
  width: 100%; 
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  width: 100%;
  height:100%;
}
</style>
