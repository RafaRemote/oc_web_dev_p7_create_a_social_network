<template>
    <main class="container">    
        <div class="col-12">
             <!-- div incluant le titre -->
            <div class="col-12">
                <router-link v-if="isAdmin" to='/Admin'><h1 class="my-2 btn btn-block btn-danger font-weight-bold">Administration du site</h1></router-link>
                <Home></Home>
            </div>
            <section id="filPrincipal" class="row">
                <sub class="col-12 col-md-4">
                     <!-- bloc utilisateur -->
                    <article class="card bg-light my-3 class=center-block" style="float:none;">
                        <div class="card-header">
                            <div class="row justify-content-around">
                                <p class="m-1"> Bonjour {{ nameCurrentUser }} ! </p>
                                <button @click="localClear"> <img src="../assets/signout.svg" alt="sign-out" style="width:35px"/> </button>
                            </div>
                        </div>
                        <div class="card-body text-center">
                            <div class="dropdown text-center">
                                <p>Membre depuis le {{ creation }}</p>
                            </div>
                            <div>
                                <router-link v-if="isAdmin" to='/Admin'><button  type="button" class=" btn btn-danger mx-auto rounded p-2 buttonsPanel">ADMIN. <button class=" rounded p-1 m-1 "><img src="../assets/trash.svg" alt="trash" style="width:25px"> ACTIVÉE</button></button></router-link> 
                            </div>
                        </div>
                        <div class="card-body mx-auto">
                            <button class="btn btn-dark rounded" style="cursor:default">Pour modérer les commentaires, veuillez vous rendre sur la page des commentaires en cliquant sur le logo "oeil".</button>
                        </div>
                    </article> 
                </sub>   
                 <!-- bloc listes messages  -->
                <sub class="col col-md-8">
                    <h2 class="text-white text-center m-5 ">
                        Liens vers tous les messages et leurs commentaires.
                    </h2>
                    <div class="badge btn-primary p-3 badgeList">
                            <span class="spanBadge">DATE</span>  
                            <span class="spanBadge">AUTEUR</span>
                            <span class="spanBadge">MESSAGE</span> 
                            <span class="spanBadge">REF</span> 
                            <span class="spanBadge">VOIR</span> 
                    </div>
                    <div v-for="i in messages" :key="i">   
                        <div class="badge btn-primary p-3 badgeList">
                            <span class="spanBadge"> Le {{ i.createdAt.slice(0,10).split("-").reverse().join(".")}} </span>  
                            <span class="spanBadge"> {{ i.userName.charAt(0).toUpperCase() + i.userName.slice(1) }} </span> 
                            <span class="spanBadge"> {{ i.message.slice(0,10) }}...</span> 
                            <span class="spanBadge"> ref #{{ i.id }}</span> 
                            <span class="spanBadge"> <button class="rounded" @click="seeOnePost( i.id )"> <img src="../assets/eye.svg" alt="logo eye" style="width:25px"> </button> </span> 
                        </div>
                    </div>
                </sub>
            </section>
        </div>
    </main>
</template>

<script>
import Home from "../components/Home";
import axios from "axios";
import router from "../router";
import "../main.css";

export default {
    name: "CommentsList",
    components: {
      Home
    },
    data() {
        return {
            isAdmin: false,
            messages: [],
            nameCurrentUser: "",
            creation: ""
        }
    },
    created: function() {        
        let id          = localStorage.getItem('userId');
        let self        = this;  
        axios.get("http://localhost:3000/api/messages",  { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then((res) => {
            console.log(res)
            if (res) {
                self.messages = res.data.list;
                console.log(res.data.list)
            } else {
                console.log("aucun message")
            }
        })
        .catch((error)=>{
            console.log(error)
        })      
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
        }
    }
}
</script>