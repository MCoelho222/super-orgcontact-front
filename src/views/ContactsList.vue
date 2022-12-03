<template>
    <div class="container-fluid">
        <!-- HEADER -->
        <div id="header" class="container-fluid">
            <h4 id="name">{{ name }}</h4>
            <p id="email">{{ emailAddress }}</p>
            <p v-if="!isEmpty" id="after-name">{{ someOtherWords }}</p>
        </div>
        <!-- SELECT BAR -->
        <div id="select-div" class="container-fluid">
            <div id="in-select-div"  class="row mb-3">
                <div class="col-12">
                    <label>
                    <h6 id="select-bar-title" 
                    class="form-label">Select a domain:</h6>
                    </label>
                    <select 
                    id="select-bar"
                    class="form-select shadow"
                    @input="selectDomain"
                    ><option disabled selected>
                    {{ selected }}
                    </option>
                    <option>all domains</option>
                    <option 
                    v-for="(domain, key, index) in contacts"
                    :value="key"
                    :key="index">
                    {{ key }}
                    </option>
                    </select>
                </div>
            
            </div>
        </div>
        <!-- MESSAGES FOR EMPTY CONTACTS -->
        <p id="whoops-msg" v-if="isEmpty">
        Whoops! It seems you don't have many e-mail contacts in your account...</p>
        <p id="todo-msg" v-if="isEmpty">
        No problem! Please, go to your e-mail account and add some e-mails to your contacts.</p>
        <p id="alternative-msg" v-if="isEmpty">
        Alternatively, try to login with another account.</p>
        <img 
        id="lucky-cat" 
        src="../assets/Lucky-Beckoning-Cat.png" 
        alt="Lucky cat" v-if="isEmpty" @click="logout">
        <!-- TABLE CONTACTS BY DOMAIN -->
        <div class="container-fluid p-4" v-else>
            <table class="table align-middle">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th class="text-start lg" scope="col">Domain</th>
                    <th class="text-start lg" scope="col">Emails</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(domain, key, index) in peopleObj.contacts" :key="index">
                    <th scope="row" class="table-primary">{{index + 1}}</th>
                        <td class="table-primary text-start">{{ key }}</td>
                        <td class="table-info text-start">
                            <ul>
                                <li v-for="(email,  item) in domain" :key="item">{{email}}</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { isArray } from "@vue/shared";
import { useCookies } from "vue3-cookies";
import { mapActions } from 'vuex';

const cookies = useCookies().cookies;

export default {
    data() {
        return {
            peopleObj: {
                'profile': {},
                'contacts': {
                    'email.com': ['user@email.com']
                }
            },
            name: 'User',
            email: 'user@email.com' ,
            selected:'all domains',
            contacts: {},
            domains: []
        }
    },
    methods: {
        ...mapActions(["auth/validateToken", "auth/logout"]),
        async populate() {
            let token = cookies.get('token')
            if (token !== null) {
                let loader = this.$loading.show();
                await this["auth/validateToken"](token.token).then(() => {
                    loader.hide()
                    // check valid token
                    let verifiedToken = cookies.get('token')
                    if (verifiedToken.status) {
                        // Populate contacts object
                        let people = localStorage.getItem('people')
                        if (people != null) {
                            let peopleObj = JSON.parse(people)
                            this.peopleObj = peopleObj
                            this.contacts = peopleObj.contacts
                            let parsePeople = JSON.parse(people)
                            this.name = parsePeople['profile']['name']
                            this.email = parsePeople['profile']['email']
                        }
                    } else {
                        this["auth/logout"]().then(() => {
                            this.$router.push("/") 
                        })
                    }
                })
            }
            if (token == null || !token.status) {
                this.$router.push("/") 
            }
        },
        selectDomain() {
            let people = localStorage.getItem('people')
            if (people != null) {
                let peopleObj = JSON.parse(people)
                this.peopleObj.contacts = peopleObj.contacts
            }
            let selectBar = document.getElementById('select-bar')
            let selectVal = selectBar.value
            this.selected = selectVal
            let entries = Object.entries(this.peopleObj.contacts)
            let filtered = entries.filter(([key, value]) =>
                key == this.selected && isArray(value)
            )
            let filteredObj = Object.fromEntries(filtered)
            this.peopleObj.contacts = filteredObj
            if (this.selected == 'all domains') {
                this.peopleObj.contacts = this.contacts
            }
        },
        logout() {
            this["auth/logout"]().then(() => {
                this.$router.push("/") 
            })
        }
    },
    computed: {
        isEmpty() {
            let keys = Object.keys(this.peopleObj.contacts)
            return keys.length == 0
        },
        someOtherWords() {
            return `These are your contacts by domain`
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
/* List of emails inside the tables cells */
ul {
    list-style-type: none;
}
/* Appears in the header */
#name {
    padding: 30px 0px 30px 0px;
}
/* Appears in the header */
#email {
    margin: 10px 10px;
    color: rgb(9, 123, 236);
    font-weight: bolder;
}
/* Select bar div */
#select-div {
    text-align: left;
    padding-left: 80px;
    padding-right: 80px;
    padding-top: 30px;
}
#select-bar {
    margin: 5px 0px 30px 0px;
    padding: 5px 0px 5px 10px;
}
#select-bar-title {
    font-weight: bold;
}
select:hover {
    border-color: dodgerblue;
    cursor: pointer;
}
/* Appears when no contacts */
#whoops-msg {
    padding-top: 0px;
}
/* Appears when no contacts */
#todo-msg {
    padding-top: 10px;
}
/* Appears when no contacts */
#alternative-msg {
    padding-top: 10px;
}
/* Appears when no contacts */
#lucky-cat {
    margin-top: 50px;
    height: 150px;
    width: 150px;
}
#lucky-cat:hover {
    cursor: pointer;
    /* Start the shake animation and make the animation last for 0.5 seconds */
    animation: shake 0.5s;
    
    /* When the animation is finished, start again */
    animation-iteration-count: infinite;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>