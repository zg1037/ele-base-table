import Vue from 'vue'
import App from './App.vue'
import router  from "./router"
import {Button,Table,TableColumn,Pagination,Row,Col,Input,Select,Option,Loading,Switch,Tooltip} from "element-ui";
Vue.use(Button)
    .use(Table)
    .use(TableColumn)
    .use(Pagination)
    .use(Row)
    .use(Col)
    .use(Input)
    .use(Select)
    .use(Option)
    .use(Loading)
    .use(Switch)
    .use(Tooltip)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
