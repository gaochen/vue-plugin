import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const one = r => require.ensure([], () => r(require('@/components/one')), 'one');
const two = r => require.ensure([], () => r(require('@/components/two')), 'two');

export default new Router({
  base: '/',
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'one',
      component: one
    },
    {
      path: '/two',
      name: 'two',
      component: two
    }
  ]
})
