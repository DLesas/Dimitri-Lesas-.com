import regression from 'regression'
import Vue from 'vue'
Vue.prototype.$regression = () => {
    return {
        regression,
    }
}