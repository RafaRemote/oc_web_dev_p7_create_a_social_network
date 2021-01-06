<!-- Pade d'administration du site -->

<template>
    <div class="container">    
        <main class="col-12">   
             <!-- section incluant le titre --> 
            <section class="col-12">
                <h1 class="my-2 btn btn-block btn-danger font-weight-bold" style="cursor:default">Administration du site</h1>
                 <Home></Home>
            </section>
            <section id="filPrincipal" class="row">
                <div class="col-12 col-md-4">
                     <!-- bloc utilisateur -->
                    <article class="card bg-light my-3 class=center-block" style="float:none;">
                        <div class="card-header">
                            <div class="row justify-content-around">
                                <div class="m-1"> Bonjour {{ nameCurrentUser }} ! </div>
                                <button @click="localClear"> <img src="../assets/signout.svg" alt="sign-out" style="width:35px"/> </button>
                            </div>
                        </div>
                        <div class="card-body text-center">
                            <div class="dropdown text-center">
                                <p>Membre depuis le {{ creation }}</p>
                            </div>
                            <div>
                                <div v-if="isAdmin">
                                    <router-link to='/Admin'><button v-if="isAdmin" type="button"  class=" btn btn-danger mx-auto rounded p-2">VOUS ÊTES L'ADMINISTRATEUR DU SITE</button></router-link> 
                                    <router-link to='/Admin'><button  type="button"   class=" btn btn-danger mx-auto m-3 rounded p-2 buttonsPanel"><button class=" rounded p-1 m-1 "><img src="../assets/trash.svg" alt="trash" style="width:25px"> ACTIVÉE</button></button></router-link> 
                                </div>
                            </div>
                        </div>
                        <div class="card-body mx-auto">
                            <button class="btn rounded text-white font-weight-bold" style="background-color: #dd0000;cursor: default">Vous avez le pouvoir de supprimer les messages des utilisateurs, leurs commentaires, ainsi que les utilisateurs eux-mêmes.</button>
                        </div>
                    </article> 
                </div>   
                 <!-- bloc choix (to comment list ou user list) -->
                <article class="col col-md-8 mt-5">
                    <h2 class="text-white text-center m-5 ">FAITES VOTRE CHOIX</h2>
                    <div class="row justify-content-around">
                        <button @click="toCommentsList()" class="btn btn-warning rounded shadow font-weight-bold p-5 m-2">MESSAGES/COMMENTS</button>
                        <button @click="toUsersList()" class="btn btn-warning rounded shadow font-weight-bold p-5 m-2" >USERS</button>
                    </div>
                </article>
            </section>
        </main>
    </div>
</template>


<script>
import Home from "../components/Home";
import axios from "axios";
import router from "../router";
import "../main.css";

export default {
    name: "Admin",
    components: {
      Home
    },
    data() {
        return {
            isAdmin: false,
            nameCurrentUser: "",
            creation: ""
        }
    },
    created: function() {        
        let id          = localStorage.getItem('userId');
        let self        = this;  
        axios.get("http://localhost:3000/api/users/" + id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            self.creation           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.isAdmin            = res.data.isAdmin;
            self.nameCurrentUser    = res.data.userName.charAt(0).toUpperCase() + res.data.userName.slice(1);       
        })
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
        },
        seeOnePost(m) {
            console.log(m);
            localStorage.setItem('MessageId', m);
            router.replace("http://localhost:8080/api/comment")
        },
        toCommentsList() {
            router.replace("http://localhost:8080/api/CommentsList")
        },
        toUsersList() {
            router.replace("http://localhost:8080/api/UsersList")
        }
    }
}
</script>