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

// Create a new router
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

// async function validAuth(){
//     if(localStorage.getItem("tokenlogin") === null){
//         return true;
//     }else {
//         var dataToken = {
//             token: localStorage.getItem("tokenlogin")
//         }
//         let res = await axios.post("http://localhost:3000/login/validToken", dataToken);
//         let { data } = res;
//         // console.log(data);
//         return data === true ? false : true;
//     }
// }

 async function validAuth(){
    if(localStorage.getItem("tokenlogin") === null){
        return true;
    }else {
        var dataToken = {
            token: localStorage.getItem("tokenlogin")
        }
        let res = await axios.post("http://localhost:3000/login/validToken", dataToken);

        return res;
    }
}

router.beforeEach((to, from, next) => {
    
    validAuth().then(response => {
        var res = response.data;
        console.log(response.data);
        if(to.path != '/login'){
            if (!res) {
                return next({
                    path: '/login'
                });
            }else {

            }
        }else {
            if(res) {
                if(to.path === '/login') {
                    return next({
                        path: '/'
                    });
                }
            }
        }

        next();
    });

    
});


Vue.use(Meta)

export default router
