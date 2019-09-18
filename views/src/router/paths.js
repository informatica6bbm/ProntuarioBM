/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '',
    // Relative to /src/views
    view: 'Dashboard'
  },
  {
    path: '/pessoas',
    name: 'Pessoas',
    view: 'Pessoas'
  },
  {
    path: '/batalhoes',
    name: 'Batalhões',
    view: 'Batalhoes'
  },
  {
    path: '/escalas',
    view: 'Escalas'
  },
  {
    path: '/hierarquias',
    view: 'Hierarquia'
  },
  {
    path: '/setores',
    view: 'Setores'
  },
  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/upgrade',
    name: 'Upgrade to PRO',
    view: 'Upgrade'
  }
]
