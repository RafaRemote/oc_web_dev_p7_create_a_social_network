<template>
    <main class="container">    
        <div class="col-12">
            <div class="col-12 ">
                <h1 v-if= 'this.messages.length !== 0' class="col-12 my-2 btn  btn-block btn-info font-weight-bold" style="background-color: #138400; cursor:default">Dernières Publications</h1>   
                <h1  v-else class='col-12 my-2 btn  btn-block btn-danger font-weight-bold' style="cursor:default"> Aucune publication pour l'instant, soyez le premier à en créer une ! </h1>
            </div>
            <section id="filPrincipal" class="row">
                 <!-- bloc utilisateur -->
                <article class="col-12 col-md-4">
                    <div class="card bg-light my-3 class=center-block" style="float:none;">
                        <div class="card-header">
                            <div class="row justify-content-around">
                                <p class="m-1"> Bonjour {{ name }} ! </p>
                                <button @click="localClear"> <img src="../assets/signout.svg" alt="sign-out" style="width:35px"/> </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="text-center">
                                <p id="membre">Membre depuis le {{ creation }}</p>
                            </div>
                            <div id="compteButton" class="text-center">
                                <router-link v-if="isAdmin" to='/Admin'><button type="button" class=" btn btn-danger mx-auto rounded p-2 buttonsPanel">ADMIN. <button class=" rounded p-1 m-1 "><img src="../assets/trash.svg" alt="trash" style="width:25px"> ACTIVÉE</button></button></router-link> 
                                <router-link v-else to='/Compte'><button type="button" class=" btn btn-secondary mx-auto rounded p-2 buttonsPanel">COMPTE</button></router-link> 
                            </div>
                        </div>
                        <div id="publicationButton" class=" card-body text-center">
                            <router-link to='/Create' ><button type="button" class="btn btn-dark mx-auto p-2 rounded buttonsPanel">PUBLIER</button></router-link>
                        </div>
                    </div>                  
                </article>
                 <!-- bloc avec tous le(s) message(s) -->
                <sub class="col-12 col-md-8">
                    <div v-for="message in messages" :key="message.id" class="card bg-light my-3">
                        <div class="card-header bg-light d-flex align-items-center justify-content-between m-0 p-1">
                            <span class=" text-dark text-bold  p-1" >
                                Posté par {{ message.userName.charAt(0).toUpperCase() + message.userName.slice(1) }}
                                le {{ message.createdAt.slice(0,10).split('-').reverse().join('.') + ' à ' + message.createdAt.slice(11,16) }}
                            </span>
                            <div class="badge bg-dark text-wrap text-white p-2" style="width: 6rem;">
                                ref # {{ message.id }}                    
                            </div>                                                                                       
                        </div>
                        <div class="btn" @click="commentPage(message.id)">
                            <img :src="message.messageUrl" v-if="message.messageUrl !== '' " class="border messImage" alt="image postée par un utilisateur" />
                        </div>
                        <div class="p-2"> 
                            <p v-if="isAdmin || message.UserId == id" class="ml-2">   {{ message.message }} </p> 
                        </div>
                        <div class="row card-footer justify-content-around">
                            <button @click="commentPage(message.id)" class="border-0"> <img src="../assets/comment_black.svg" alt="comment_black" style="width:25px"> </button>
                            <div v-if="isAdmin || message.UserId == id">
                                <button @click="deleteMessage(message.id, message.UserId, id)" class="border-0"> <img  src="../assets/trash.svg" alt="trash" style="width:25px"> </button>
                            </div>
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

export default {
    name: "Stream",
    data() {
        return {
            isAdmin: false,
            messages: [],
            id: "",                 
            name: "",               
            creation: ""           
        }
    },
    created: function() {        
        let id = localStorage.getItem('userId')
        axios.get("http://localhost:3000/api/messages",  { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then((res) => {
            if (res) {
                const rep = res.data.list;
                this.messages = rep; 
                rep.splice(10,);
                localStorage.setItem("MessageId", rep[0].id);
                console.log(this.messages)
            } else {
                console.log("aucun message")
            }
        })
        .catch((error)=>{
            console.log(error)
        })   
        let self = this;
        axios.get("http://localhost:3000/api/users/" + id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            console.log(res)
            self.id                 = res.data.id;
            self.name               = res.data.userName.charAt(0).toUpperCase() + res.data.userName.slice(1);
            self.creation           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.isAdmin            = res.data.isAdmin;
        })
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        commentPage(m) {
            console.log(m);
            localStorage.setItem('MessageId', m);
            router.push({ path : "/Comment" });
        },
        deleteMessage(a, b, c) {
            console.log(
                typeof a,
                typeof b,
                typeof c
            )
            let confirmMessageDeletion = confirm("voulez-vous vraiment supprimer cette image ?, tous les commentaires associés seront également supprimés.");
            if (confirmMessageDeletion == true) {
                axios.delete("http://localhost:3000/api/messages/", {
                    headers: { 
                        "Authorization": "Bearer " + localStorage.getItem("token") 
                    },
                    params: {
                        messageId:  a,
                        messageUid: b,
                        uid:        c
                    }
                    })
                .then((res)=> console.log(res))
                .catch((error) => { 
                    location.reload();
                    console.log("ligne 133 " + error)})
            } else {
                return
            }
        },
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
        }
    }
}
</script>