import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage    from '../views/HomePage.vue'
import ArchivePage from '../views/ArchivePage.vue'
import ContentView from '../views/ContentView.vue'
import AboutPage   from '../views/AboutPage.vue'

export default createRouter({
  history: createWebHashHistory(), 
  routes: [
    { path: '/',           component: HomePage   },
    { path: '/archive',    component: ArchivePage},
    { path: '/archive/:id',component: ContentView, props: true },
    { path: '/about',      component: AboutPage  },
  ]
})