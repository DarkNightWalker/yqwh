import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AnniversaryDetails from '../views/AnniversaryDetails.vue'

const routes = [
  { path: '/', component: Home },
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