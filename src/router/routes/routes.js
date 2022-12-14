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
    path: "/people:token?",
    name: 'Template',
    component: TemplateView,
    beforeEnter: (to) => {
      if (to.params.token) {
        let tokenJson = {
          'token': to.params.token,
          'status': true
        }
        cookies.set('token', JSON.stringify(tokenJson))
        return (to.path = "/people/contacts")
      }
      return (to.path = "/")
    },
    children: [

      { path: 'contacts', 
      component: ContactsList, 
      },
      { path: 'report', 
      component: ReportView
      }
    ]
  }
]

export default routes
