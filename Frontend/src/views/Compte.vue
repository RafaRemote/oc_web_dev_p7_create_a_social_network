<template>
    <main class="container">    
        <div class="row justify-content-center">
            <div class="col-10">
                 <!-- div contenant le titre -->
                <div class="col-12">
                    <h1 class="my-2 btn btn-block btn-info font-weight-bold" style="cursor:default">Vous consultez vote compte</h1>
                    <Home></Home>
                </div>
                <section id="filPrincipal" class="row">
                    <div class="col-12">
                         <!-- bloc utilisateur -->
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
                            </div>
                            <div class="card-body mx-auto">
                                <div class="btn-info rounded p-3" style="cursor:default"><button class="rounded p-2" style="cursor:default"><span class="m-3 font-weight-bold">Depuis cette page vous pouvez supprimer votre compte. La suppression de votre compte entrainera également la suppression de tous les commentaires et les images que vous avez posté.</span></button></div>
                            </div>
                            <div class="card-body mx-auto">
                                <div class="btn-danger rounded p-3" style="cursor:default"><button @click="deleteMyAccount(id)" class="rounded p-2"><span class="m-3 font-weight-bold">SUPPRIMER VOTRE COMPTE</span><img src="../assets/trash.svg" alt="trash" style="width:25px"></button></div>
                            </div>
                        </div> 
                    </div>  
                </section>
            </div>
        </div>
    </main>
</template>


<script>
import Home from "../components/Home";
import axios from "axios";
import router from "../router";
import "../main.css";

export default {
    name: "Compte",
    components: {
      Home
    },
    data() {
        return {
            isAdmin: false,
            nameCurrentUser: "",
            creation: "",
            id: ""
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
            self.id                 = res.data.id     
        })
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
        },
        deleteMyAccount(n) {
            let id = n;
            let confirmUserDeletion = confirm("voulez-vous vraiment supprimer votre compte ?");
            if (confirmUserDeletion == true) {
                axios.delete("http://localhost:3000/api/users/" + id, {headers: { "Authorization": "Bearer " + localStorage.getItem("token") },})
                .then((res)=> {
                    console.log(res);
                    alert('Cliquez sur ok et l\'utilisateur sera supprimé');
                    router.replace("http://localhost:8080/api/")
                })
                .catch((error) => { 
                    console.log(error)
                })
            } else {
                return 
            }
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