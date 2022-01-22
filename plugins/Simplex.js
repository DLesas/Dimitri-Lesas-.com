import SimplexNoise from 'simplex-noise';
import Vue from "vue";
Vue.prototype.$simplex = () => {
 return {
    SimplexNoise
 }
}