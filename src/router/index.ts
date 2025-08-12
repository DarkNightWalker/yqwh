import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AnniversaryDetails from '../views/AnniversaryDetails.vue'
import Birthday from '../views/Birthday.vue'

const routes = [
    { path: '/', component: Birthday },
  { path: '/home', component: Home },
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
  history: createWebHashHistory(),
  routes
})

export default router