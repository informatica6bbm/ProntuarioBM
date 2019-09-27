/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
// import auth from './../middleware/auth';

export default [
  {
    path: '',
    // Relative to /src/views
    name: 'dashboard',
    view: 'Dashboard'
  },
  {
    path: '/pessoas',
    name: 'Pessoas',
    view: 'Pessoas',
    meta: {
        requiresAuth: true
    }
  },
  {
    path: '/batalhoes',
    name: 'Batalhões',
    view: 'Batalhoes',
    meta: {
        requiresAuth: true
    }
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
    path: '/exames',
    view: 'Exames'
  }
]
