<template>
    <div id="template">
        <div class="side-bar p2" :style="sidebar">
            <!-- SIDEBAR TEXT -->
            <div id="side-bar-text">
                <p v-if="toggleSideBar">
                Welcome, <br> <br>
                In this application you will be able to analyze your e-mail contacts in an organized way. When you login to the app, the e-mails associated to your contacts will be recorded in a database and displayed in a table. The contacts will be separated by domain, in a clearer way, so that you can make better strategies about communication with your clients. Also, you will have access to a piechart which shows you the distribution by domain. <br> We hope you enjoy it, and invite your friends to join us! In the next versions, we plan to let you download the table in an excel file, make more specific searches in the database, and much more. <br> So... Enjoy it! <br><br> Sincerely, <br> Super OrgContact
                </p>
            </div>
            <!-- SWITCH DIV-->
            <div id="switchDiv">
                <!-- SWITCH BODY  -->
                <div id="switchBody" @click="toggleSwitch">
                    <!-- SWITCH CIRCLE -->
                    <div id="switchCircle"></div>
                </div>
            </div>
        </div>
        <!-- LOGIN -->
        <div id="login-div" :style="main">
            <!-- IMAGE -->
            <div id="people-img-div">
                <img id="people-img" src="../assets/people4.jpeg" alt="people image">
            </div>
            <!-- ENTER WITH GOOGLE -->
            <div id="login-main-div">
                <img id="brand-img" 
                src="../assets/at-sign-aroba-email-e-mail-47390.webp" 
                alt="arroba symbol">
                <h4 id="brand-login">Super OrgContacts</h4>
                <p id="words-login">All your contacts by domain</p>  
                <p>Please, let us help you manage your contacts!</p>
                <button
                id="login-btn-google" 
                class="btn btn-outline-primary"
                type="button"
                @click="enterWithGoogle">Login with Google</button>
            </div>
            <!-- FOOTER -->
            <p id="footer">
            &copy; 2022 Super OrgContacs. All rights reserved.</p>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { useCookies } from 'vue3-cookies';

const cookies = useCookies().cookies

export default {
    data() {
        return {
            user: {}
        }
    },
    methods: {
        ...mapActions(["contacts/getPersonInfo"]),
        enterWithGoogle() {
            this["contacts/getPersonInfo"]().then(() => {
                
                this.$router.push('people/contacts')
            })
        },
        // Hide/show sidebar
        toggleSwitch() {

            // Switch circle
            let switchCircle = document.getElementById("switchCircle")
            let switchDiv = document.getElementById("switchDiv")

            // Add switchCircle class, if not present
            if (switchCircle.className != "switchCircle") {
            switchCircle.className = "switchCircle"
            switchDiv.style.justifyContent = "center"

            } else {
            // If present, delete
            switchCircle.className = ""
            switchDiv.style.justifyContent = "right"
            }
            this.$store.commit("template/controlSideBar")
            },
    },
    computed: {
        ...mapState({
            url_auth: (state) => state.auth.url_auth
        }),
        sidebar() {
            return this.$store.getters['template/sidebar']
        },
        main() {
            return this.$store.getters['template/main']
        },
        // Controls the sidebar
        toggleSideBar() {
        return this.$store.state.template.toggleSideBar
        }
    },
    mounted() {
        let token = cookies.get('token')
        if (token !== null) {
            if (token.status) {
                this.$router.push('/people/contacts')
            }
        }
    }
}
</script>
<style scoped>

#brand-img  {
    width:60px;
    height: 60px;
    margin-bottom: 20px;
}
/* Enter with Google */
#login-btn-google {
    font-size: large;
    margin-bottom: 200px;
    margin-top: 20px;
}
/* Main div */
#template { 
    display: flex;
}
/* People image div */
#people-img-div {
    padding-top: 100px;  
}
#people-img {
    width: 300px;
    height: 200px;
}
/* General login div. Includes people image brand img enter with google */
#login-div {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
/* @ */
#brand-login {
    color: rgb(39, 39, 39);
}
/* Phrases above login button */
#words-login {
    color: rgb(29, 90, 244);
}
#footer {
    font-size: x-small;
    color: rgb(87, 84, 84);
    margin-bottom: 5px;

}
/* Switch general div */
#switchDiv {
  display: flex;
  justify-content: flex-end;
}
/* Switch body, align left */
#switchBody {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 50px;
  height: 28px;
  border: 1px solid rgb(247, 248, 251);
  border-radius: 34px;
}
/* Switch circle */
#switchCircle {
  width: 21px;
  height: 21px;
  margin-left: 3px;
  background-color: rgb(249, 250, 252);
  border-radius: 50%;
  transition: all 0.4s;
}
/* On click add this class, which moves to the right */
.switchCircle {
  margin-left: 24px !important;
}
/*Sidebar general div*/
.side-bar {
  position: sticky;
  top: 0;
  background-color: rgb(50, 110, 239);
  padding-right: 10px;
  padding-bottom: 20px;
}
#side-bar-text {
    padding: 30px 10px 20px 20px;
    text-align: justify;
    color: whitesmoke;
}
</style>