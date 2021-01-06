<template>
    <main class="container">    
        <div class="col-12">
             <!-- div contenant le titre -->
            <div class="col-12">
               <router-link v-if="isAdmin" to='/Admin'><h1 class="my-2 btn btn-block btn-danger font-weight-bold">Administration du site</h1></router-link>
               <Home></Home>
            </div>
            <section id="filPrincipal" class="row">
                 <!-- bloc utilisateur -->
                <article class="col-12 col-md-4">
                    <div class="card bg-light my-3 class=center-block" style="float:none;">
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
                                <router-link v-if="isAdmin" to='/Admin'><button v-if="isAdmin" type="button"  class=" btn btn-danger mx-auto rounded p-2">VOUS ÊTES L'ADMINISTRATEUR DU SITE</button></router-link> 
                                <router-link v-if="isAdmin" to='/Admin'><button  type="button"   class=" btn btn-danger mx-auto m-3 rounded p-2 buttonsPanel"><button class=" rounded p-1 m-1 "><img src="../assets/trash.svg" alt="trash" style="width:25px"> ACTIVÉE</button></button></router-link> 
                            </div>
                        </div>
                        <div class="card-body mx-auto">
                            <button class="btn btn-dark rounded" style="cursor:default">Vous pouvez supprimer les utilisateurs que vous voulez.</button>
                        </div>
                    </div> 
                </article> 
                 <!-- bloc listes utilisateurs -->  
                <sub class="col col-md-8">
                    <h2 class="text-white text-center m-5 ">
                        LISTE DE TOUS LES UTILISATEURS
                    </h2>
                    <div class="badge btn-primary p-3 badgeList">
                        <span class="spanBadge">NOM</span>  
                        <span class="spanBadge">EMAIL</span>
                        <span class="spanBadge">DEPUIS LE</span> 
                        <span class="spanBadge">SUPPRIMER</span> 
                    </div>
                    <div v-for="i in users" :key="i">   
                        <div class="badge btn-primary p-3 badgeList">
                            <span class="spanBadge"> {{ i.userName.charAt(0).toUpperCase() + i.userName.slice(1) }} </span> 
                            <span class="spanBadge"> {{ i.email }} </span> 
                            <span class="spanBadge"> {{ i.createdAt.slice(0,10).split("-").reverse().join(".")}} </span>  
                            <span class="spanBadge"> <button class="rounded" @click="deleteOneUser( i.id, isAdmin )"> <img src="../assets/trash.svg" alt="logo eye" style="width:25px"> </button> </span> 
                        </div>
                    </div>
                </sub>
            </section>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import router from "../router";
import "../main.css";
import Home from '../components/Home';

export default {
    name: "UsersList",
    components: {
      Home
    },
    data() {
        return {
            isAdmin: false,
            nameCurrentUser: "",
            creation: "",
            users: []
        }
    },
    created: function() {        
        let id          = localStorage.getItem('userId');
        let self        = this;  

        axios.get("http://localhost:3000/api/users/" + id , { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            self.creation           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.isAdmin            = res.data.isAdmin;
            self.nameCurrentUser    = res.data.userName.charAt(0).toUpperCase() + res.data.userName.slice(1);       
        })
        .catch((error)=> { console.log(error) 
        });

        axios.get("http://localhost:3000/api/users/all" , { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then((res) => {  
            this.users = res.data.found;
        })
        .catch((error)=>{
            console.log(error)
        })      
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        deleteOneUser(uid, isAdmin) {
        console.log(uid, isAdmin)
        
        let confirmUserDeletion = confirm("voulez-vous vraiment supprimer cet utilisateur ?");
            if (confirmUserDeletion == true) {
                axios.delete("http://localhost:3000/api/users/", {
                    headers: { 
                        "Authorization": "Bearer " + localStorage.getItem("token") 
                    },
                    params: {
                        uid:          uid,
                        isAdmin:      isAdmin,
                    }
                })
                .then((res)=> {
                    console.log(res)
                    alert('Cliquez sur ok et l\'utilisateur sera supprimé');
                    router.replace("http://localhost:8080/api/UsersList")
                })
                .catch((error) => { 
                    location.reload();
                    console.log(error)
                })
            } else {
                return 
            }
        },
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