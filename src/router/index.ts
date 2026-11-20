import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const sections = ['projects', 'about', 'skills', 'contact']

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    ...sections.map(section => ({
      path: '/' + section,
      name: section,
      redirect: { name: 'home', hash: '#' + section },
    })),
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    const smooth = from.matched.length > 0 && !matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior = smooth ? 'smooth' : 'instant'
    const target = to.hash && document.getElementById(to.hash.slice(1))
    if (target) {
      target.focus({ preventScroll: true })
      const top = parseFloat(getComputedStyle(target).scrollMarginTop)
      return { el: target, top, behavior }
    }
    return { top: 0, behavior }
  },
})
