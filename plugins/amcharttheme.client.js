/* eslint-disable camelcase */
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark'
import am5themes_Material from '@amcharts/amcharts5/themes/Material'
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive'
import Vue from 'vue'
Vue.prototype.$am5theme = () => {
    return {
        am5themes_Animated,
        am5themes_Dark,
        am5themes_Material,
        am5themes_Responsive,
    }
}
