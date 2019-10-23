import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const sing = () => import('@/views/sing')
const Index = () => import('@/views/index')
const drag = () => import('@/views/drag');
const history = () => import('@/views/history');
const addImage = () => import('@/views/addImagedemo');
const jigsaw = () => import('@/views/jigsaw');

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'sing',
      component: Index,
      meta: {title: ''}
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {title: '', keepAlive: true}
    },
    {
      path: '/drag',
      name: 'drag',
      component: drag,
      meta: {title: '', keepAlive: true}
    },
    {
      path: '/history',
      name: 'history',
      component: history,
      meta: {title: ''}
    },
    {
      path: '/addImage',
      name: 'addImage',
      component: addImage,
      meta: {title: ''}
    },
    {
      path: '/jigsaw',
      name: 'jigsaw',
      component: jigsaw,
      meta: {title: ''}
    },
  ],


})
