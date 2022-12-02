<template>
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg bg-primary">
            <div class="container-fluid">
                <div class="left-side">
                    <span id="brand" class="navbar-brand mb-0 h1">Super OrgContact</span>
                    <a id="report" class="nav-link" aria-current="page" href="#/people/report">Report</a>
                    <a id="home" class="nav-link" aria-current="page" href="#/people/contacts">Home</a>
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
    },
    computed: {
    }
}
</script>
<style scoped>
#brand {
    color: white;
    font-weight: bolder;
    font-size:large;
}
#report {
    color: white;
}
#home {
    color: white;
}
#logout-btn {
    color: white;
}
#logout-btn:hover {
    font-weight: bolder;
    color:darkgrey;
    cursor: pointer;
}
.left-side {
    display: flex;
}
nav a.nav-link:hover {
    font-size:xx-small;
    
}
</style>