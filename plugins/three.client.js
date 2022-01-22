import * as THREE from 'three'
import { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import Vue from "vue";

Vue.prototype.$Three = () => {
   return {
      THREE
   }
}

Vue.prototype.$ThreeFontLoader = () => {
   return {
      Font
   }
}