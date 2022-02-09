import * as am5 from '@amcharts/amcharts5'
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy'
import * as am5xy from '@amcharts/amcharts5/xy'
// eslint-disable-next-line camelcase
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import Vue from 'vue'
Vue.prototype.$am5 = () => {
    return {
        am5,
        am5hierarchy,
        am5themes_Animated,
        am5xy
    }
}
