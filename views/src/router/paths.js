/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
import auth from './../middleware/auth.js';

export default [
  {
    path: '',
    // Relative to /src/views
    view: 'Dashboard'
  },
  {
    path: '/pessoas',
    name: 'Pessoas',
    view: 'Pessoas',
    meta: {
        middleware: auth
    }
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
    path: '/exames',
    view: 'Exames'
  }
]
