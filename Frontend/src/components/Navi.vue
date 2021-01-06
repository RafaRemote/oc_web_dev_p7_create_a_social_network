<!-- Composant represantant la " banner du haut de page avec le logo de l'entreprise et l'accès au mail " -->

<template>
    <div class="container">
        <div class="row">
            <div class="col navbar">
                   <img src="../assets/logo.png" alt="logo-boite" style="width:250px"/>
               <a class="mailto" href="mailto:contact@test.com"> <img src="../assets/mail.svg" alt="bouton_aide"></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Navi"
}
</script>