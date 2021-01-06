<template>
    <main class="container">
         <!-- un seul bloc contenant le module d'inscription -->
        <section class="col-12 col-md-8 mt-5 mx-auto p-3 bg-light rounded">
            <form @submit.prevent="sendForm(event)">
                <p class="text-center m-2"> <img src="../assets/signup.svg" alt="signup svg" style="width:10rem"> </p>
                <h1 class="text-center font-weight-bold" style="font-size:4vw;" >INSCRIPTION</h1>
                <div class="form-group">
                    <label for="inputUserName">Nom d'utilisateur:</label>
                    <input v-on:keydown="invalid = false" v-model="inputUserName" type="text" class="form-control" id="inputUserName" aria-describedby="userNameHelp" placeholder="Entrez votre nom">
                    <small id="userNameHelp" class="form-text text-muted">De 3 à 30 caractères</small>
                </div>      
                <div class="form-group">
                    <label for="inputEmail">Email:</label>
                    <input v-on:keydown="invalid = false" v-model="inputEmail" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="votre email">
                    <small id="emailHelp" class="form-text text-muted">Entrez une adresse mail valide</small>
                </div>
                <div class="form-group">
                    <label for="inputPassword">Choisissez un Mot de passe:</label>
                    <input v-on:keydown="invalid = false" v-model="inputPassword" type="password" class="form-control" id="inputPassword" aria-describedby="passwordHelp" placeholder="mot de passe">
                    <small id="passwordHelp" class="form-text text-muted">de 8 a 15 caracteres dont au moins 1 lettre et 1 chiffre</small>
                </div>
                <button type="submit" class="contrastBoutonVert text-white p-2 w-100 border-0 rounded shadow font-weight-bold">S'INSCRIRE</button>                          
            </form>
        </section>  
        <div v-show="invalid" class="invalidBox m-2" key="invalid">
                Veuillez remplir tous les champs du formulaire en suivant les instructions.
                </div>  
         <div class=' col-7 mx-auto mt-4'>
            <router-link to="/#"><button class='contrastBoutonNoir text-white p-2 w-100 border-0 rounded shadow font-weight-bold'>RETOUR A L'ECRAN DE CONNEXION</button></router-link>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import router from "../router";
import "../main.css"

export default {
    name: "Inscription",
    data() {
        return {
            inputUserName: "",
            inputEmail: "",
            inputPassword: "",
            invalid: false
        }
    },
    methods: {
        sendForm() {
            if ( !this.inputUserName || !this.inputEmail || !this.inputPassword ) {
                return this.invalid = true;
            }
            const nameRegex = /(.*[a-z]){3,30}/;
            const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            const pwdRegex  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/  

            if ( nameRegex.test(this.inputUserName) && mailRegex.test(this.inputEmail) && pwdRegex.test(this.inputPassword)) {

                axios.post("http://localhost:3000/api/auth/signup", { 
                    userName    : this.inputUserName, 
                    email       : this.inputEmail,
                    password    : this.inputPassword
                })
                .then(() => {
                    alert('inscription réussie, redirection vers le module de connexion');
                    router.push({ path : '/'});
                })
                .catch((error)=>{
                    alert(error.status)
                    console.log(error)});
            } else {
                console.log('validation form, method sendForm, renvoie une erreur')
                this.invalid = true;
            }
        }
    }
}    
</script>