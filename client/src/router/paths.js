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
    path: '/cadastros',
    name: 'Cadastro',
    view: 'Cadastros',
    meta: {
        requiresAuth: true
    }
  },
  {
    path: '/resultadosExames',
    name: 'Resultados Exames',
    view: 'ResultadosExames',
    meta: {
        requiresAuth: true
    }
  }
]
