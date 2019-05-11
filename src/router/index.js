import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const sing = () => import('@/views/sing')
const Index = () => import('@/views/index')
const drag = () => import('@/views/drag');
const history = () => import('@/views/history');
const onself = () => import('@/views/onself');
const addImage = () => import('@/views/addImagedemo');
const upload = () => import('@/views/upload');
const jigsaw = () => import('@/views/jigsaw');
const login =() => import('@/views/login');
const regist =() => import('@/views/regist');
const personal =() => import('@/views/personal');
const images=()=>import('@/views/image');

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: {title: ''}
    },
    {
      path: '/sing',
      name: 'sing',
      component: sing,
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
      path: '/onself',
      name: 'onself',
      component: onself,
      meta: {title: ''}
    },
    {

      path: '/addImage',
      name: 'addImage',
      component: addImage,
      meta: {title: ''}
    },

    {path: '/upload',
      name: 'upload',
      component: upload,
      meta: {title: ''}
    },
    {
      path: '/jigsaw',
      name: 'jigsaw',
      component: jigsaw,
      meta: {title: ''}
    },
   


   	{
      path: '/login',
      name: 'login',
      component: login,
      meta: {title: ''}
    },
    {
      path: '/regist',
      name: 'regist',
      component: regist,
      meta: {title: ''}
    },{
      path: '/personal',
      name: 'personal',
      component: personal,
      meta: {title: ''}
    },
		{
      path: '/images',
      name: 'images',
      component: images,
      meta: {title: ''}
    },
  ],


})
