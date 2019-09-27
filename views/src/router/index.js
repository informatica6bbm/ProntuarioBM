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

router.afterEach((to, from, next) => {
    console.log(to);
    if (to.meta.requiresAuth) {
        next({
            name: 'dashboard'
        });
    }

    next({
        path: ''
    });
});


Vue.use(Meta)

export default router
