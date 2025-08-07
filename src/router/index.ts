import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import AnniversaryDetails from '../views/AnniversaryDetails.vue'

const routes = [
  { path: '/', component: App },
  { 
    path: '/memories', 
    component: AnniversaryDetails,
    props: { type: 'memories' }
  },
  { 
    path: '/future', 
    component: AnniversaryDetails,
    props: { type: 'future' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router