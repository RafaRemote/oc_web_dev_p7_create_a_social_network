<!--  Page qui represente la vue sur une image en particulier, avec ses commentaires si il y a -->

<template>
    <main class="container">  
         <!-- titre -->
        <div class="row mb-4 rounded">
            <p class="col-12 my-2 btn  btn-block btn-info badgeTopColor font-weight-bold" style="background-color: #138400" >Vous consultez les commentaires</p>  
            <Home></Home>
        </div>
        <div class="row">
            <!-- bloc utilisateur -->
            <article id="panelComment" class="col-12 col-md-4" > 
                <div class="card mb-3">
                    <div class="card-header">
                        <div class="row justify-content-around">
                            <p class="text-center p-2"> Bonjour  {{ nameCurrentUser }} ! </p>
                            <button @click="localClear"> <img src="../assets/signout.svg" alt="sign-out" style="width:35px"/> </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="dropdown text-center">
                            <p>Membre depuis le {{ creationUser }} </p>
                        </div>
                        <div id="compteButton" class="text-center">
                            <router-link v-if="isAdmin" to='/Admin'><button type="button" class=" btn btn-danger mx-auto rounded p-2 buttonsPanel">ADMIN. <button class=" rounded p-1 m-1 "><img src="../assets/trash.svg" alt="trash" style="width:25px"> ACTIVÉE</button></button></router-link> 
                            <router-link v-else to='/Compte'><button type="button" class=" btn btn-secondary mx-auto rounded p-2 buttonsPanel">COMPTE</button></router-link> 
                        </div>
                    </div>
                    <div class="justify-content-center align-self-center">
                        <router-link to='/Create' ><button type="button" class="btn btn-dark  rounded m-2 p-2 font-weight-bold ">CREER UNE PUBLICATION<img src="../assets/send.svg" alt="logo-envoyer"  style="width: 25px" class="m-3" />  </button></router-link>
                    </div>
                    <div class="justify-content-center align-self-center">
                        <router-link to='/CreateComment'><button type="button" class="btn btn-dark  m-2 p-2 rounded font-weight-bold" >COMMENTER<img src="../assets/write.svg" alt="write-logo"  style="width: 25px" class="m-3" ></button></router-link>
                    </div>
                </div>
            </article>
            <!--Section message -->
            <section class="card col-12 col-md-8 bg-light mb-3">
                <div class="card-header bg-light d-flex align-items-center justify-content-between m-0 p-1">
                    <span class=" text-dark text-bold  p-1" > 
                        Posté par {{ messageUserName }}
                        le {{ creation }}
                    </span>
                    <div class="badge bg-dark text-wrap text-white p-2" style="width: 6rem;">
                        ref # {{ messageId}}
                    </div>                                                                                       
                </div>
                <div>
                    <p class="text-center"> 
                        <router-link to='/Comment'><img :src="messageUrl" v-if="messageUrl !== '' " class="border messImage" alt="image postee par utilisateur"></router-link>
                    </p>                          
                </div> 
                <div class="row justify-content-between p-3">
                    <div> 
                        <div>   {{ message }} </div> 
                    </div> 
                    <div v-if="isAdmin || messageUserId == currentUserId">
                        <button @click="deleteMessage(messageId, messageUserId, currentUserId)" class="border-0"> <img  src="../assets/trash.svg" alt="trash" style="width:25px"> </button>
                    </div>
                </div>
            </section> 
        </div>
         <!-- section commentaire(s) -->
        <section class="row">
            <router-link to='/CreateComment'><p  v-if="comments.length == 0" class='mt-3 btn btn-sm btn-block btn-danger font-weight-bold'> Aucun commentaire pour l'instant, soyez le premier à en créer un !</p></router-link>
            <div v-for="comment in comments" :key="comment" class="card col-12 mt-3">
                <div class="card-header ">
                    <p class="btn btn-dark w-100" style="cursor:default">Commentaire rédigé le {{ comment.createdAt.slice(0,10).split('-').reverse().join('/') }}  par {{ comment.User.userName.charAt(0).toUpperCase() + comment.User.userName.slice(1) }}</p>
                </div>
                <div class="card-body border bg-dark text-white text-right rounded mx-2">
                    <p>  {{ comment.comment }} </p>
                </div>
                <div class="card-footer row justify-content-between">
                    <p class="btn btn-dark w-10 text-right mx-2 " style="cursor:default">ref# <span class="badge badge-light"> {{ comment.id }}</span></p>
                    <div v-if="isAdmin || comment.UserId == currentUserId">
                        <button @click="deleteComment(comment.id, comment.UserId, currentUserId)" class="border-0"> <img  src="../assets/trash.svg" alt="trash" style="width:25px"> </button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import Home from "../components/Home";
import axios from "axios";
import router from "../router";
import "../main.css";

export default {
    name: "Comment",
    components: {
      Home
    },
    data() {
        return {
            isAdmin: false,
            comments: [],
            creation: "",
            messageUserName: "",
            messageUserId: "",
            message: "",
            messageId: "",
            messageUrl: "",
            nameCurrentUser: "",
            currentUserId: "",
            creationUser: ""
        }
    },
    created: function() {        
        let MessageId   = localStorage.getItem('MessageId')
        let self        = this;
        axios.get("http://localhost:3000/api/messages/" + MessageId,  { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then((res) => {
            console.log(res)
            self.creation           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.messageUserName    = res.data.userName;
            self.messageUserId      = res.data.userId;
            self.message            = res.data.message;
            self.messageId          = res.data.id; 
            self.messageUrl         = res.data.messageUrl;
        })
        .catch((error)=>{
            alert(error)
        })
        let id = localStorage.getItem('userId');
        axios.get("http://localhost:3000/api/users/" + id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            self.isAdmin                = res.data.isAdmin;
            self.nameCurrentUser        = res.data.userName.charAt(0).toUpperCase() + res.data.userName.slice(1);
            self.creationUser           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.currentUserId          = res.data.id
        })
        .catch((error)=> { console.log(error) 
        })  
        axios.get("http://localhost:3000/api/comments/" + MessageId,  { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then( function (res) {
            self.comments = res.data;  
            console.log(self.comments)
        })
        .catch((error) => {console.log(error)
        });
    },
    methods: {

        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
        },
        deleteMessage(messageId, messageUserId, currentUserId) {
            let confirmMessageDeletion = confirm("voulez-vous vraiment supprimer cette image ?, tous les commentaires associés seront également supprimés.");
            if (confirmMessageDeletion == true) {
                axios.delete("http://localhost:3000/api/messages/", {
                    headers: { 
                        "Authorization": "Bearer " + localStorage.getItem("token") 
                    },
                    params: {
                        messageId:  messageId,
                        messageUid: messageUserId,
                        uid:        currentUserId
                    }
                    })
                .then((res)=> console.log(res))
                .catch((error) => { 
                    console.log("ligne 133 " + error)})
                    alert("Au click sur ok, le message (et ses commentaires) supprimé, retour à l'accueil.")
                    router.push({ path : "/Stream" });
            } else {
                return
            }

        },
        deleteComment(commId, commUid, currentUid) {

            let confirmCommentDeletion = confirm("voulez-vous vraiment suppimer votre commentaire ?");
            if (confirmCommentDeletion == true) {
                axios.delete("http://localhost:3000/api/comments/", {
                headers: { 
                        "Authorization": "Bearer " + localStorage.getItem("token") 
                    },
                    params: {
                        commentId:     commId,
                        commentUid:    commUid,
                        currentUid:    currentUid
                    }
                })
                .then((res)=> {
                    console.log(res);
                    alert('Cliquez sur ok et le commentaire sera supprimé');
                    location.reload();
                })
                .catch((error) => { 
                    console.log(error)
                })
            } else {
                return 
            }
        }
    }
}
</script>