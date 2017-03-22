export default [
  {
    path: '/',
    name: 'main-desk',
    component: require('components/mainDesk')
  },
  {
    path: '*',
    redirect: '/'
  }
]
