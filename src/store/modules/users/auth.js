import axios from "axios"
import { useCookies } from "vue3-cookies";

const cookies = useCookies().cookies;

export default {
  namespaced: true,
  state () {
    return {
      url_auth: null,
      backendUrl: 'http://localhost:5000',
    }
  },
  getters: {
    
  },
  mutations: {

  },
  actions: {
    async validateToken(context, token) {
      await axios.get(`${context.state.backendUrl}/users/verify/?token=${token}`).then((response) => {
        let tokenObj = cookies.get('token')
        
        if (response.data.status == 'false') {
          tokenObj.status = false
        } 
        if (response.data.status == 'true') {
          tokenObj.status = true
        } 
        cookies.set('token', JSON.stringify(tokenObj))
      })
    },
    async logout (context) {
      await axios.get(`${context.state.backendUrl}/users/logout`).then(() => {
        context.state.status = false
        let token = cookies.get('token')
        if (token !== null) {
            cookies.remove('token')
            localStorage.removeItem('people')
        }
      })
    }
  }
}

