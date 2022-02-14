<template>
    <v-card id="bargraph" raised rounded flat :height="400" :style="dark ? 'background: #121212' : ''">
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
        return {}
    },
    computed: {
        dark() {
            return this.$vuetify.theme.dark
        },
    },
    watch: {},
    mounted() {

        /* eslint-disable camelcase */
        /* eslint-disable no-unused-vars */
        
        const { am5, am5hierarchy, am5xy } = this.$am5()

        const {
            am5themes_Animated,
            am5themes_Dark,
            am5themes_Material,
            am5themes_Responsive,
        } = this.$am5theme()

        const root = am5.Root.new('bargraph')

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([am5themes_Animated.new(root)])

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: 'panX',
                wheelY: 'zoomX',
            })
        )

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}))
        cursor.lineY.set('visible', false)

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 })
        xRenderer.labels.template.setAll({
            rotation: -90,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15,
        })

        const xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                maxDeviation: 0.3,
                categoryField: 'country',
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {}),
            })
        )

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 0.3,
                renderer: am5xy.AxisRendererY.new(root, {}),
            })
        )

        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        const series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: 'Series 1',
                xAxis,
                yAxis,
                valueYField: 'value',
                sequencedInterpolation: true,
                categoryXField: 'country',
                tooltip: am5.Tooltip.new(root, {
                    labelText: '{valueY}',
                }),
            })
        )

        series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 })
        series.columns.template.adapters.add('fill', (fill, target) => {
            return chart.get('colors').getIndex(series.columns.indexOf(target))
        })

        series.columns.template.adapters.add('stroke', (stroke, target) => {
            return chart.get('colors').getIndex(series.columns.indexOf(target))
        })

        // Set data
        const data = [
            {
                country: 'USA',
                value: 2025,
            },
            {
                country: 'China',
                value: 1882,
            },
            {
                country: 'Japan',
                value: 1809,
            },
            {
                country: 'Germany',
                value: 1322,
            },
            {
                country: 'UK',
                value: 1122,
            },
            {
                country: 'France',
                value: 1114,
            },
            {
                country: 'India',
                value: 984,
            },
            {
                country: 'Spain',
                value: 711,
            },
            {
                country: 'Netherlands',
                value: 665,
            },
            {
                country: 'Russia',
                value: 580,
            },
            {
                country: 'South Korea',
                value: 443,
            },
            {
                country: 'Canada',
                value: 441,
            },
        ]

        xAxis.data.setAll(data)
        series.data.setAll(data)

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000)
        chart.appear(1000, 100)
    },
}
</script>

<style lang="scss" scoped></style>
