<template>
    <v-card  raised rounded flat :style="dark ? 'background: #121212' : ''">
        <v-row no-gutters>
            <v-col cols="12">
                <v-card id="linegraph" flat :height="400"> </v-card>
            </v-col>
        </v-row>
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
            legend: undefined
        }
    },
    watch: {
        data(newValue) {
            if (Object.keys(newValue).length > 0) {
                this.SetData()
            }
        },
    },
    mounted() {
        /* eslint-disable camelcase */
        // eslint-disable-next-line no-unused-vars
        const { am5, am5hierarchy, am5themes_Animated, am5xy } = this.$am5()
        this.am5 = am5
        this.am5xy = am5xy
        this.root = am5.Root.new('linegraph')

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
            am5xy.XYCursor.new(this.root, {
                behavior: 'none',
            })
        )
        cursor.lineY.set('visible', false)

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        this.xAxis = this.chart.xAxes.push(
            am5xy.DateAxis.new(this.root, {
                maxDeviation: 0.2,
                baseInterval: {
                    timeUnit: 'minute',
                    count: 1,
                },
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
        this.chart.appear(1000, 100)
        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
    },
    methods: {
        SetData() {
            console.log("complete data")
            console.log(this.data)
            for (const seriesname in this.data) {
                const series = this.chart.series.push(
                    this.am5xy.LineSeries.new(this.root, {
                        name: seriesname,
                        xAxis: this.xAxis,
                        yAxis: this.yAxis,
                        valueYField: 'sentiment',
                        valueXField: 'date',
                        tooltip: this.am5.Tooltip.new(this.root, {
                            labelText: '{valueY}',
                        }),
                    })
                )
                series.data.setAll(this.data[seriesname])
                // Add scrollbar
                // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
                // Set data
                console.log('this.data[seriesname]')
                console.log(this.data[seriesname])
                

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

                // It's is important to set legend data after all the events are set on template, otherwise events won't be copied
                console.log(`chart series values:`)
                console.log(this.chart.series.values)
                this.legend.data.setAll(this.chart.series.values)
                series.appear(1000)
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>
