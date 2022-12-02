import { createStore } from 'vuex'
import auth from './modules/users/auth'
import contacts from './modules/contacts/contacts'
import template from './modules/template/template'

const store = createStore({
  modules: {
      auth,
      contacts,
      template
  }
})

export default store