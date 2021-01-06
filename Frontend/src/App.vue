<!-- fichier central de l'qpplication Vue.-->

<template>
    <div id="app">
      <Navi></Navi>
      <router-view></router-view>
    </div>
</template>

<script>
import Navi from "./components/Navi";

export default {
    name: "App",
    components: {
      Navi
    }
}
</script>

<style>
  body {
    background: rgb(61,71,190);
    background: linear-gradient(90deg, rgba(61,71,190,1) 0%, rgba(10,81,166,1) 100%);
  }
</style>
