import chroma from "chroma-js";
import Vue from "vue";
Vue.prototype.$chroma = () => {
 return {
    chroma
 }
}