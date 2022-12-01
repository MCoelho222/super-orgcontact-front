import { createStore } from 'vuex'
import auth from './modules/users/auth'
import contacts from './modules/contacts/contacts'

const store = createStore({
  modules: {
      auth,
      contacts
  }
})

export default store