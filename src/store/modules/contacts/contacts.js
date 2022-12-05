import axios from "axios";
import { useCookies } from "vue3-cookies";

const cookies = useCookies().cookies;

export default {
  namespaced: true,
  state () {
    return {
      personInfo: {},
      backendUrl: 'https://superorgcontact-3fufpf5spq-rj.a.run.app',
      // backendUrl: 'http://localhost:5000'
    }
  },
  getters: {
  },
  mutations: {
    
  },
  actions: {
    async getPersonInfo(context, token) {
      await axios.get(`${context.state.backendUrl}/people/?token=${token}`).then((response) => {
        if (response.status == 200) {
          let payload = {
            'token': response.data.profile.token,
            'status': true
          }
          cookies.set('token', payload)
          localStorage.setItem('people', JSON.stringify(response.data))
        } else {
          let payload = {
            'token': null,
            'status': false
          }
          cookies.set('token', payload)
        }
        // let check = cookies.get('token')
        // if (response.error) {
        //   check.status = false
        //   let newToken = JSON.stringify(check)
        //   cookies.set('token', newToken)
        // }
        // else {
        //   if (check !== null && check.status) {
        //     localStorage.setItem('people', JSON.stringify(response.data))
        //   }
        // }
        
      })
    },

  }
}

