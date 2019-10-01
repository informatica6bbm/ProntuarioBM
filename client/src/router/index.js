// Lib imports
import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

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

// router.beforeEach((to, from, next) => {
//     console.log(localStorage.getItem('login'));
//     if(localStorage.getItem('login')){
//         return next();
//     }else {
//         localStorage.setItem('login', 'true');
//     }
//
//     next({
//         path: '',
//         query: {
//             redirect: to.fullPath
//         }
//     });
// });


Vue.use(Meta)

export default router
