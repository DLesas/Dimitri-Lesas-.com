<template>
    <v-card id="linegraph" raised :height="400" rounded flat :style="dark ? 'background: #121212' : ''">
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
            am5: undefined,
            am5xy: undefined,
            root: undefined,
            chart: undefined,
            xAxis: undefined,
            yAxis: undefined,
            legend: undefined,
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
        // eslint-disable-next-line no-unused-vars
        const { am5, am5hierarchy, am5xy } = this.$am5()
        // eslint-disable-next-line no-unused-vars
        const {
            am5themes_Animated,
            // eslint-disable-next-line no-unused-vars
            am5themes_Dark,
            am5themes_Material,
            am5themes_Responsive,
        } = this.$am5theme()
        this.am5 = am5
        this.am5xy = am5xy
        this.root = am5.Root.new('linegraph')

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        this.root.setThemes([
            am5themes_Animated.new(this.root),
            am5themes_Material.new(this.root),
            am5themes_Responsive.new(this.root),
        ])

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
            am5xy.XYCursor.new(this.root, {
                behavior: 'none',
            })
        )
        cursor.lineY.set('visible', false)

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        this.xAxis = this.chart.xAxes.push(
            am5xy.DateAxis.new(this.root, {
                baseInterval: {
                    timeUnit: 'seconds',
                    count: 1,
                },
                groupData: true,
                groupCount: 50,
                renderer: am5xy.AxisRendererX.new(this.root, {}),
                tooltip: am5.Tooltip.new(this.root, {}),
            })
        )

        this.yAxis = this.chart.yAxes.push(
            am5xy.ValueAxis.new(this.root, {
                renderer: am5xy.AxisRendererY.new(this.root, {}),
            })
        )
        this.chart.set(
            'scrollbarX',
            am5.Scrollbar.new(this.root, {
                orientation: 'horizontal',
            })
        )
        this.legend = this.chart.rightAxesContainer.children.push(
            this.am5.Legend.new(this.root, {
                width: 200,
                paddingLeft: 15,
                height: this.am5.percent(100),
            })
        )
        this.legend.itemContainers.template.events.on(
            'pointerover',
            function (e) {
                const itemContainer = e.target

                // As series list is data of a legend, dataContext is series
                const series = itemContainer.dataItem.dataContext

                this.chart.series.each(function (chartSeries) {
                    if (chartSeries !== series) {
                        chartSeries.strokes.template.setAll({
                            strokeOpacity: 0.15,
                            stroke: this.am5.color(0x000000),
                        })
                    } else {
                        chartSeries.strokes.template.setAll({
                            strokeWidth: 3,
                        })
                    }
                })
            }
        )
        this.legend.itemContainers.template.set('width', this.am5.p100)
        this.legend.valueLabels.template.setAll({
            width: this.am5.p100,
            textAlign: 'right',
        })
        this.chart.appear(1000, 100)
        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
    },
    methods: {
        async SetData(newValue, oldValue) {
            for (const seriesname in newValue) {
                if (!(seriesname in oldValue)) {
                    const series = this.chart.series.push(
                        this.am5xy.LineSeries.new(this.root, {
                            name: seriesname,
                            xAxis: this.xAxis,
                            yAxis: this.yAxis,
                            valueYField: 'sentiment',
                            valueXField: 'date',
                            valueYGrouped: 'average',
                            strokeWidth: 4,
                            tooltip: this.am5.Tooltip.new(this.root, {
                                labelText: '{valueY} {name}',
                            }),
                        })
                    )
                    await series.data.setAll(this.data[seriesname])
                    series.appear(1000)
                }
                // eslint-disable-next-line no-unused-vars

                // Add scrollbar
                // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
                // Set data

                // It's is important to set legend data after all the events are set on template, otherwise events won't be copied
                this.legend.data.setAll(this.chart.series.values)
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>
