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

function validAuth() {
    if(localStorage.getItem("tokenlogin") === null){
        return true;
    }else {
        return false;
    }
}

router.beforeEach((to, from, next) => {
    console.log(to.fullPath);
    console.log(validAuth());
    if(to.path != '/login'){
        if (validAuth()) {
            return next({
                path: '/login'
            });
        }
    }
    // else {
    //     next();
    // }
    next();
});


Vue.use(Meta)

export default router
