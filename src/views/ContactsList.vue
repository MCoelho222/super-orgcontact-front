<template>
    <div class="container-fluid">
        <div id="top-msg">
            <h5 id="welcome">{{ welcomeMsg }}</h5>
            <p id="words">{{ someOtherWords }}</p>
            <p id="email">{{ emailAddress }}</p>
        </div>

        <p id="sorry-msg" v-if="isEmpty">Sorry, you don't have any contacts to share...</p>
        <p id="todo-msg" v-if="isEmpty">Please, go to your e-mail box and add some e-mails to your contacts.</p>
        <table class="table align-middle" v-else>
            <thead>
                <tr>
                <th scope="col">#</th>
                <th class="text-start lg" scope="col">Domain</th>
                <th class="text-start lg" scope="col">Emails</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(domain, key, index) in peopleObj.contacts" :key="index">
                <th scope="row">{{index + 1}}</th>
                    <td class="text-start">{{ key }}</td>

                    <td class="text-start">
                        <ul>
                            <li v-for="(email,  item) in domain" :key="item">{{email}}</li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { useCookies } from "vue3-cookies";
import { mapActions } from 'vuex';

const cookies = useCookies().cookies;

export default {
    data() {
        return {
            peopleObj: {
                'profile': {},
                'contacts': []
            },
            name: 'User',
            email: 'useremail@email.com' 
        }
    },
    methods: {
        ...mapActions(["contacts/getPersonInfo", "auth/validateToken", "auth/logout"]),
        async populate() {
            let loader = this.$loading.show();
            let token = cookies.get('token')
            if (token !== null) {
                await this["auth/validateToken"](token.token).then(() => {
                    // check valid token
                    let verifiedToken = cookies.get('token')
                    if (verifiedToken.status) {
                        // Populate contacts object
                        let people = localStorage.getItem('people')
                        if (people != null) {
                            let peopleObj = JSON.parse(people)
                            this.peopleObj = peopleObj
                            let parsePeople = JSON.parse(people)
                            this.name = parsePeople['profile']['name']
                            this.email = parsePeople['profile']['email']
                            loader.hide()
                        }
                       
                        
                    } else {
                        this["auth/logout"]().then(() => {
                            loader.hide()
                            this.$router.push("/") 
                        })
                    }
                })
            }
            if (token == null || !token.status) {
                this.$router.push("/") 
            }
        }
    },
    computed: {
        isEmpty() {
            let keys = Object.keys(this.peopleObj.contacts)
            return keys.length == 0
        },
        welcomeMsg() {
            return `Welcome, ${this.name}!`
        },
        someOtherWords() {
            return `These are the email addresses from all your contacts`
        },
        emailAddress() {
            return `${this.email}`
        }
    },
    mounted() {
        return this.populate()
    }
}
</script>
<style scoped>

* {
  margin: 0;
  padding: 0;
}

ul {
    list-style-type: none;
}
table {
    background-color: white;
}

.container-fluid {
    background-color: aliceblue
}

#top-msg {
    color: rgb(34, 33, 33);
}

#sorry-msg {
    padding-top: 0px;
}

#todo-msg {
    padding-top: 10px;
}

#welcome {
    padding: 30px 0px 10px 0px;
}

#words {
    margin: 0px 0px;
}

#email {
    margin: 10px 10px;
    color: rgb(9, 123, 236);
    font-weight: bolder;
}
</style>