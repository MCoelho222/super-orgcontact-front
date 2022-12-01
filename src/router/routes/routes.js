import UserLogin from '../../views/UserLogin.vue';
import TemplateView from '../../views/TemplateView.vue';
import ContactsList from '../../views/ContactsList.vue';
import ReportView from '../../views/ReportView.vue';
import { useCookies } from "vue3-cookies";

const cookies = useCookies().cookies;

const routes = [
  {
    path: '/',
    name: 'Login',
    component: UserLogin
  },
  {
    path: "/people",
    name: 'Template',
    component: TemplateView,
    
    children: [
      { path: 'contacts/:token?', 
      component: ContactsList, 
      beforeEnter: (to) => {
        // let token = cookies.get('token')
        // if (token == null) {
        //   return (to.path = "/")
  
        // } else {
        //   if (!token.status) {
        //     return (to.path = "/")
        //   }
        // }
        if (to.params.token) {
          let tokenJson = {
            'token': to.params.token,
            'status': true
          }
          cookies.set('token', JSON.stringify(tokenJson))
          // return (to.path = "/people/contacts")
          return true
        }
        return (to.path = "/")
      },
    },
      { path: 'report', 
      component: ReportView
    }
    ]
  }
]

export default routes
