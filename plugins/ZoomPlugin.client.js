import Vue from 'vue'
import zoomPlugin from 'chartjs-plugin-zoom'
Vue.prototype.$zoomPlugin = () => {
    return {
        zoomPlugin
    }
}