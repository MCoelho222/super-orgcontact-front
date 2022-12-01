import axios from "axios";
import { useCookies } from "vue3-cookies";

const cookies = useCookies().cookies;

export default {
  namespaced: true,
  state () {
    return {
      personInfo: {},
      backendUrl: 'https://superorgcontact-3fufpf5spq-rj.a.run.app',
    }
  },
  getters: {
  },
  mutations: {
    
  },
  actions: {
    async getPersonInfo(context) {
      await axios.get(`${context.state.backendUrl}/people`).then((response) => {
        // if (!response.error) {
        //   let payload = {
        //     'token': response.data.profile.token,
        //     'status': true
        //   }
        //   cookies.set('token', payload)
        //   localStorage.setItem('people', JSON.stringify(response.data))
        // } else {
        //   let payload = {
        //     'token': null,
        //     'staus': false
        //   }
        //   cookies.set('token', payload)
        // }
        let check = cookies.get('token')
        if (response.error) {
          check.status = false
          let newToken = JSON.stringify(check)
          cookies.set('token', newToken)
        }
        else {
          if (check !== null && check.status) {
            localStorage.setItem('people', JSON.stringify(response.data))
          }
        }
        
      })
    },

  }
}

