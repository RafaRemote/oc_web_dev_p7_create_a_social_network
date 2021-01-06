  <template>
    <main class="container"> 
        <!-- Un seul bloc pour le contenu creation message -->
        <section class="row card bg-light m-5 p-3">
            <form enctype="multipart/form-data">
                <div class="header p-1">
                    <h1  class="btn btn-dark" style="cursor:default">
                        {{ callName() }} vous allez créer une nouvelle publication    <img src="../assets/send.svg" class="m-1" alt="send" style="width:1rem"/>  
                    </h1>
                </div>
                <div class="row">
                    <div class="col-12 justify-content-center form-group">
                        <label for="newMessage">Donnez des détails sur votre publication.</label>
                        <textarea v-on:keydown="isInvalid = false" class="form-control" v-model="newMessage" id="newMessage" name="message" rows="8" placeholder="Saisissez votre message. (1500 caractères max)"></textarea>
                    </div>
                    <div class="col-12 justify-content-center text-center">
                        <img :src="newImage" class="w-50 rounded">
                        <p class="text-center"> un aperçu de votre post apparaîtra ici. Formats acceptés: jpg, jpeg, png et gif.</p>
                    </div>
                    <div class="col-12 justify-content-center">
                        <div class="form-group justify-content-center">
                            <label for="File">Choisir une nouvelle photo</label>
                            <input @change="selectFile()" type="file" ref="file" name="image" class="form-control-file" id="File" accept=".jpg, .jpeg, .gif, .png">
                        </div>
                    </div>
                </div>
                <div class="footer col-10 mx-auto align-content-center">
                    <div><button type="submit" @click.prevent="send()" class="btn btn-dark btn-block m-2 p-2">Valider</button></div>
                    <router-link to="/Stream"> <div> <a class="btn btn-danger btn-block m-2 p-2">Annuler/Retour</a></div></router-link> 
                </div>
                 <div v-show="isInvalid" class="invalidBox m-2" key="invalid">
                    <p>Vous ne pouvez pas envoyer de post sans contenu (vous devez inclure texte et image). Votre message doit faire moins de 1500 caractères.</p>        
                </div>  
            </form>
        </section>
    </main>
</template>

<script>
import axios from "axios"
import router from "../router";
import "../main.css";

export default {
    name: "Create",
     data() {
        return {
            isAdmin: false,
            newImage: "",
            currentUserId: "", 
            newMessage: "",
            file: null,
            messages: [],
            isInvalid: false
        }
    },
    methods: {
        callName() {
            let name = localStorage.getItem('userName');
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
        selectFile() {
            this.file = this.$refs.file.files[0];
            this.newImage = URL.createObjectURL(this.file)
        },
        send() {
            if ( !this.file || !localStorage.getItem('userName') || !this.newMessage || this.newMessage > 1500 ) {
                    this.isInvalid = true;

                    console.log("ligne 69" + this.file)
            } else {
                const formData = new FormData()
                formData.append("image", this.file)
                formData.append("UserId", localStorage.getItem('userId'))
                formData.append("message", this.newMessage.toString())
                axios.post("http://localhost:3000/api/messages/", formData, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
                .then(()=> {
                    this.UserId = ""
                    this.newMessage = ""
                    this.file = null
                    alert('publication réussie!')
                    router.push({path : 'Stream'})
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
        }
    }
}
</script>