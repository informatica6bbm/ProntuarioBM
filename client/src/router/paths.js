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
        path: '/batalhoes',
        name: 'Batalhões',
        view: 'Cadastros/Batalhoes',
    },
    {
        path: '/escalas',
        name: 'Escalas',
        view: 'Cadastros/Escalas',
    },
    {
        path: '/exames',
        name: 'Exames',
        view: 'Cadastros/Exames',
    },
    {
        path: '/hierarquia',
        name: 'Hierarquia',
        view: 'Cadastros/Hierarquia',
    },
    {
        path: '/setores',
        name: 'Setores',
        view: 'Cadastros/Setores',
    },
    {
        path: '/pacientes',
        name: 'Pacientes',
        view: 'Pacientes/Pacientes',
    },
    {
        path: '/paciente/lts',
        name: 'LTS',
        view: 'Pacientes/Lts',
    },
    {
        path: '/paciente/historicodoencas',
        name: 'Histórico Doenças',
        view: 'Pacientes/HistoricoDoencas',
    },
    {
        path: '/paciente/medicamentocontrolado',
        name: 'Medicamento Controlado',
        view: 'Pacientes/MedicamentoControlado',
    },

    {
        path: '/resultadosExames',
        name: 'Resultados Exames',
        view: 'ResultadosExames',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        view: 'Login',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/prontuario',
        name: 'Prontuario',
        view: 'Prontuario'
    }
]
