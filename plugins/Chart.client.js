import Chart from 'chart.js/auto'
import Vue from 'vue'
Vue.prototype.$Chart = () => {
    return {
        Chart
    }
}
