import axios from "axios";
import { useCookies } from "vue3-cookies";

const cookies = useCookies().cookies;

export default {
  state () {
    return {
      personInfo: {},
      backendUrl: 'https://superorgcontact-3fufpf5spq-rj.a.run.app',
      // backendUrl: 'http://localhost:5000'
    }
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
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}

