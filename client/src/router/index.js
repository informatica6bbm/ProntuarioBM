// Lib imports
import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import axios from 'axios';
// Routes
import paths from './paths'

function route (path, view, name) {
  return {
    name: name || view,
    path,
    component: (resovle) => import(
      `@/views/${view}.vue`
    ).then(resovle)
  }
}

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: paths.map(path => route(path.path, path.view, path.name, path.meta)).concat([
        { path: '*', redirect: '/' }
    ]),
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        if (to.hash) {
            return { selector: to.hash }
        }
        return { x: 0, y: 0 }
    },

});

 async function validAuth(){
    if(localStorage.getItem("tokenlogin") === null){
        return true;
    }
    var dataToken = {
        token: localStorage.getItem("tokenlogin")
    }
    let res = await axios.post(process.env.VUE_APP_URL_API + "/login/validToken", dataToken);

    return res;
}

async function getPessoa(){
    var data = {
        usuario: localStorage.getItem("usuario")
    }
    let res = await axios.post(process.env.VUE_APP_URL_API + "/pessoa/getPorNomeUsuario", data);

    return res;
}

router.beforeEach((to, from, next) =>{
    getPessoa().then(response => {
        const pessoa = response.data;
        validAuth().then(response => {
            var res = response.data;
            if(to.path != '/login'){
                if (!res) {
                    if(localStorage.getItem("tokenlogin")){
                        localStorage.removeItem("tokenlogin");
                    }
                    return next({
                        path: '/login'
                    });
                }

                if(res && to.path != '/prontuario' && pessoa.tipoPessoa == false){
                    return next({
                        path: '/prontuario'
                    });
                }

                if(res && to.path == '/prontuario' && pessoa.tipoPessoa){
                    return next({
                        path: '/'
                    });
                }
            }
            
            if(res && to.path == '/login'){
                return next({
                    path: '/'
                });
            }

           next();
        });
    });

    
});


Vue.use(Meta)

export default router
