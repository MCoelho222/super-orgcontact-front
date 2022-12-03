<template>
    <!-- NAVBAR -->
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg bg-primary">
            <div class="container-fluid">
                <div class="left-side">
                    <span 
                    id="nav-brand" 
                    class="navbar-brand mb-0">
                    Super OrgContact</span>
                    <a 
                    id="nav-report" 
                    class="nav-link" 
                    aria-current="page" 
                    href="#/people/report">Report</a>
                    <a 
                    id="nav-contacts" 
                    class="nav-link" 
                    aria-current="page" 
                    href="#/people/contacts">Contacts</a>
                </div>
                <span id="logout-btn" @click="logout">Logout</span>
            </div>
        </nav>
    </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
        }
    },
    methods: {
        ...mapActions(['auth/logout']),
        logout() {
            this['auth/logout']().then(() =>
            this.$router.push('/')
            )
        }
    }
}
</script>
<style scoped>
/* Super OrgContact */
#nav-brand {
    color: white;
    font-weight: bolder;
    font-size:large;
    padding-bottom: 0px;
}
/* Navbar link */
#nav-report {
    color: white;
}
/* Navbar link */
#nav-contacts {
    color: white;
}
/* Navbar logout button */
#logout-btn {
    color: white;
}
#logout-btn:hover {
    font-weight: bolder;
    cursor: pointer;
}
/* Navbar links div */
.left-side {
    display: flex;
}
nav a.nav-link:hover {
    font-weight:bolder; 
}
</style>