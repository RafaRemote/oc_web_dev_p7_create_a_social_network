<!-- composant pour le logo Maison, qui renvoie a la page principale ( " Stream " ) -->

<template>
    <header class="container">
        <div class="row justify-content-center">
            <nav class="col-1 m-auto">
               <router-link to="/Stream">  <img src="../assets/home.svg" alt="logo-home" style="width:50px;"/></router-link>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: "Home"
}
</script>