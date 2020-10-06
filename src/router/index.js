import Vue from "vue"
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: () =>
                import(/* webpackChunkName: "baseTable" */ '@/components/Hello'),
        }
    ]

})
