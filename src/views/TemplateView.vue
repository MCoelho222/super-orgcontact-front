<template>
    <div class="navbar-div">
        <proj-nav></proj-nav>
        <router-view></router-view>
    </div>
</template>
<script>

import NavBar from '../components/NavBar.vue'

export default {
    components: {
        'proj-nav': NavBar
    },
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  
}
</style>