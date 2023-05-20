import axios from "axios";
import { useCookies } from "vue3-cookies";

const cookies = useCookies().cookies;

export default {
  namespaced: true,
  state () {
    return {
      personInfo: {},
      backendUrl: 'http://localhost:5000',
    }
  },
  actions: {
    async getPersonInfo(context) {
      await axios.get(`${context.state.backendUrl}/people`).then((response) => {
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
      })
    },
  }
}

