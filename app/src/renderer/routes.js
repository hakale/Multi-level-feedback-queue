export default [
  {
    path: '/',
    name: 'start-page',
    component: require('components/startPage')
  },
  {
    path: '/mainDesk',
    name: 'main-desk',
    component: require('components/mainDesk')
  },
  {
    path: '*',
    redirect: '/'
  }
]
