import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/history',
    component: () => import('../views/HistoryView.vue'),
    meta: { scrollTop: true },
  },
  {
    path: '/community-story',
    component: () => import('../views/CommunityStoryView.vue'),
    meta: { scrollTop: true },
  },
  {
    path: '/products',
    component: () => import('../views/ProductsView.vue'),
    meta: { scrollTop: true },
  },
  {
    path: '/products/category/:slug',
    component: () => import('../views/ProductsView.vue'),
    meta: { scrollTop: true },
  },
  {
    path: '/products/:id',
    component: () => import('../views/ProductDetailView.vue'),
    meta: { scrollTop: true },
  },
  {
    path: '/producers',
    component: () => import('../views/ProducersView.vue'),
    meta: { scrollTop: true },
  },
  {
    path: '/admin',
    redirect: '/admin/products',
  },
  {
    path: '/admin/products',
    component: () => import('../views/admin/AdminProductsView.vue'),
    meta: { scrollTop: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
