import UserLogin from '../../views/UserLogin.vue';
import TemplateView from '../../views/TemplateView.vue';
import ContactsList from '../../views/ContactsList.vue';
import ReportView from '../../views/ReportView.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: UserLogin
  },
  {
    path: "/people:token?",
    name: 'Template',
    component: TemplateView,
<<<<<<< HEAD
    beforeEnter: (to) => {
      if (to.params.token) {
        let tokenJson = {
          'token': to.params.token,
          'status': true
        }
        cookies.set('token', JSON.stringify(tokenJson))
        return (to.path = "/people/contacts")
      }
    },
    
    children: [
      { path: 'contacts', 
      component: ContactsList, 
      // beforeEnter: (to) => {
        // let token = cookies.get('token')
        // if (token == null) {
        //   return (to.path = "/")
  
        // } else {
        //   if (!token.status) {
        //     return (to.path = "/")
        //   }
        // }
      // },
=======
    children: [
      { path: 'contacts', 
      component: ContactsList, 
>>>>>>> 7dfd67f0ba4d2c6fcf2d1fe24c7879a8f6e81bfa
    },
      { path: 'report', 
      component: ReportView
    }
    ]
  }
]

export default routes
