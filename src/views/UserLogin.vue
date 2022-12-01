<template>
    <div id="home">
        <div id="img"><img src="../assets/at-sign-aroba-email-e-mail-47390.webp" alt="arroba symbol"></div>
        <h4 id="brand-login">Super OrgContacts</h4>
        <p id="words-login">All your contacts by domain</p>  
        <p>Please, come and share your contacts!</p>
        <button 
        class="btn btn-outline-primary"
        type="button"
        @click="enterWithGoogle">Login with Google</button>
        <p id="footer">&copy; 2022 Super OrgContacs. All rights reserved.</p>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
// import { useCookies } from 'vue3-cookies';

// const cookies = useCookies().cookies

export default {
    data() {
        return {
            user: {}
        }
    },
    methods: {
        ...mapActions(["auth/getUrlAuth", "auth/validateToken"]),
        enterWithGoogle() {
            this["auth/getUrlAuth"]().then(() => {
                location.href = this.url_auth
                // this.$router.push('people/contacts')
            })
        }
    },
    computed: {
        ...mapState({
            url_auth: (state) => state.auth.url_auth
        }) 
    },
    async mounted() {
        // let token = cookies.get('token')
        // if (token !== null) {
        //     if (token.status) {
        //         await this["auth/validateToken"](token.token).then(() => {
        //             let currentToken = cookies.get('token')
        //             if (currentToken.status) {
        //                 this.$router.push('/people/contacts')
        //             } 
        //         })
        //     }
        // }
    }
}
</script>
<style scoped>

img  {
    width:60px;
    height: 60px;
    margin-bottom: 20px;

}
#home {
    padding: 200px 30px;
}

#brand-login {
    color: rgb(39, 39, 39);
}

#words-login {
    color: rgb(29, 90, 244);
}
#footer {
    font-size: x-small;
    color: rgb(87, 84, 84);
    text-align: center;
    justify-content: center;
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin-bottom: 0px;

}
</style>