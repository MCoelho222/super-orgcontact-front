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
    path: "/people",
    name: 'Template',
    component: TemplateView,
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
