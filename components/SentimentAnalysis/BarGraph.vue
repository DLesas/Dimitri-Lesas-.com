<template>
    <v-card
        id="bargraph"
        raised
        rounded
        flat
        :height="400"
        :style="dark ? 'background: #121212' : ''"
    >
    </v-card>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    data() {
        return {
            root: undefined,
            chart: undefined,
            xAxis: undefined,
            yAxis: undefined,
            am5xy: undefined,
            am5: undefined,
        }
    },
    computed: {
        dark() {
            return this.$vuetify.theme.dark
        },
    },
    watch: {
        data(newValue, oldValue) {
            if (Object.keys(newValue).length > 0) {
                this.SetData(newValue, oldValue)
            }
        },
    },
    mounted() {
        /* eslint-disable camelcase */
        /* eslint-disable no-unused-vars */
        console.log(this.data)
        const { am5, am5hierarchy, am5xy } = this.$am5()
        this.am5xy = am5xy
        this.am5 = am5
        const {
            am5themes_Animated,
            am5themes_Dark,
            am5themes_Material,
            am5themes_Responsive,
        } = this.$am5theme()

        this.root = am5.Root.new('bargraph')

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        this.root.setThemes([am5themes_Animated.new(this.root)])

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        this.chart = this.root.container.children.push(
            am5xy.XYChart.new(this.root, {
                panX: true,
                panY: true,
                wheelX: 'panX',
                wheelY: 'zoomX',
            })
        )

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        const cursor = this.chart.set(
            'cursor',
            am5xy.XYCursor.new(this.root, {})
        )
        cursor.lineY.set('visible', false)

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        const xRenderer = am5xy.AxisRendererX.new(this.root, {
            minGridDistance: 30,
        })
        xRenderer.labels.template.setAll({
            rotation: -90,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15,
        })

        this.xAxis = this.chart.xAxes.push(
            am5xy.CategoryAxis.new(this.root, {
                maxDeviation: 0.3,
                categoryField: 'query',
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(this.root, {}),
            })
        )

        this.yAxis = this.chart.yAxes.push(
            am5xy.ValueAxis.new(this.root, {
                maxDeviation: 0.3,
                renderer: am5xy.AxisRendererY.new(this.root, {}),
            })
        )

        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

        // Set data
        /* 
        [{
  country: "USA",
  value: 2025
}, {
  country: "China",
  value: 1882
}, {
  country: "Japan",
  value: 1809
}, {
  country: "Germany",
  value: 1322
}, {
  country: "UK",
  value: 1122
}, {
  country: "France",
  value: 1114
}, {
  country: "India",
  value: 984
}, {
  country: "Spain",
  value: 711
}, {
  country: "Netherlands",
  value: 665
}, {
  country: "Russia",
  value: 580
}, {
  country: "South Korea",
  value: 443
}, {
  country: "Canada",
  value: 441
}]; */

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        this.chart.appear(1000, 100)
        if (Object.keys(this.data).length > 0) {
            this.SetData(this.data, {})
        }
    },
    methods: {
        SetData(newValue, oldValue) {
            this.chart.series.clear()
            const series = this.chart.series.push(
                this.am5xy.ColumnSeries.new(this.root, {
                    name: 'query',
                    xAxis: this.xAxis,
                    yAxis: this.yAxis,
                    valueYField: 'popularity',
                    sequencedInterpolation: true,
                    categoryXField: 'query',
                    tooltip: this.am5.Tooltip.new(this.root, {
                        labelText: '{valueY}',
                    }),
                })
            )
            series.columns.template.setAll({
                cornerRadiusTL: 5,
                cornerRadiusTR: 5,
            })
            series.columns.template.adapters.add('fill', (fill, target) => {
                return this.chart
                    .get('colors')
                    .getIndex(series.columns.indexOf(target))
            })

            series.columns.template.adapters.add('stroke', (stroke, target) => {
                return this.chart
                    .get('colors')
                    .getIndex(series.columns.indexOf(target))
            })
            series.data.setAll(newValue)
            series.appear(1000)

            // eslint-disable-next-line no-unused-vars

            // Add scrollbar
            // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
            // Set data

            // It's is important to set legend data after all the events are set on template, otherwise events won't be copied
            this.xAxis.data.setAll(this.data)
        },
    },
}
</script>

<style lang="scss" scoped></style>
