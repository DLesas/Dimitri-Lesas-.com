<template>
    <canvas id="Linegraph"> </canvas>
</template>
<script>
import 'chartjs-adapter-date-fns'
import { enGB } from 'date-fns/locale'
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
            chart: undefined,
        }
    },
    computed: {
        dark() {
            return this.$vuetify.theme.dark
        },
        datasets() {
            const colors = this.$vuetify.theme.currentTheme.analogic
            const increment = Math.floor(
                colors.length / Object.keys(this.data).length
            )
            const final = []
            let count = 0
            for (const query in this.data) {
                const inter = {
                    label: `${query} Points`,
                    data: this.data[query],
                    borderColor: colors[count + (increment - 1) * count],
                    tension: 0,
                    showLine: false,
                }
                final.push(inter)
                const regdata = []
                for (const item in this.data[query]) {
                    const interreg = []
                    const datapoint = this.data[query][item]
                    interreg.push(new Date(datapoint.x).getTime())
                    interreg.push(datapoint.y)
                    regdata.push(interreg)
                }
                const regression = this.$regression().regression
                const regressiondata = regression.linear(regdata).points
                for (const item in regressiondata) {
                    const x = regressiondata[item][0]
                    const y = regressiondata[item][1]
                    // eslint-disable-next-line object-shorthand
                    regressiondata[item] = {
                        x: new Date(x).toISOString(),
                        // eslint-disable-next-line object-shorthand
                        y: y,
                    }
                }
                const lineofbestfit = {
                    label: `${query} Line of best fit`,
                    data: regressiondata,
                    backgroundColor: colors[count + (increment - 1) * count],
                    borderColor: colors[count + (increment - 1) * count],
                    pointBackgroundColor:
                        colors[count + (increment - 1) * count],
                    pointBorderColor: colors[count + (increment - 1) * count],
                    pointHoverBackgroundColor:
                        colors[count + (increment - 1) * count],
                    pointHoverBorderColor:
                        colors[count + (increment - 1) * count],
                    tension: 0,
                    pointRadius: 0,
                }
                final.push(lineofbestfit)
                count++
            }
            return final
        },
        options() {
            const options = {
                scales: {
                    x: {
                        type: 'time',
                        adapters: {
                            date: {
                                locale: enGB,
                            },
                        },
                        title: {
                            display: true,
                            text: 'Time',
                            // color: this.dark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                            color: this.$vuetify.theme.currentTheme.secondary
                                .base,
                            font: {
                                family: 'Comic Sans MS',
                                size: 15,
                                weight: 'bold',
                                lineHeight: 1.2,
                            },
                        },
                        ticks: {
                            color: this.$vuetify.theme.currentTheme.secondary
                                .lighten4,
                            // color: this.$vuetify.theme.currentTheme.secondary.lighten4,
                        },
                        grid: {
                            color: this.dark
                                ? 'rgba(255, 255, 255, 0.1)'
                                : 'rgba(0, 0, 0, 0.1)',
                        },
                    },
                    y: {
                        suggestedMin: -1,
                        suggestedMax: 1,
                        title: {
                            display: true,
                            text: 'Sentiment Score',
                            // color: this.dark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                            color: this.$vuetify.theme.currentTheme.secondary
                                .base,
                            font: {
                                family: 'Comic Sans MS',
                                size: 15,
                                weight: 'bold',
                                lineHeight: 1.2,
                            },
                        },
                        ticks: {
                            // color: this.dark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                            color: this.$vuetify.theme.currentTheme.secondary
                                .lighten4,
                        },
                        grid: {
                            color: this.dark
                                ? 'rgba(255, 255, 255, 0.1)'
                                : 'rgba(0, 0, 0, 0.1)',
                        },
                    },
                },
                plugins: {
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'x',
                        },
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true,
                            },
                            mode: 'x',
                        },
                    },
                },
            }
            return options
        },
    },
    watch: {
        datasets(newValue, oldValue) {
            // {query: [{x, y},{}....]}
            this.chart.data.datasets = newValue
            this.chart.update()
        },
        options(newValue) {
            this.chart.options = newValue
            this.chart.update()
        },
    },
    mounted() {
        const zoomPlugin = this.$zoomPlugin()
        const { Chart } = this.$Chart()
        const ctx = document.getElementById('Linegraph')
        Chart.register(zoomPlugin)
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: this.datasets,
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        adapters: {
                            date: {
                                locale: enGB,
                            },
                        },
                        title: {
                            display: true,
                            text: 'Time',
                            // color: this.dark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                            color: this.$vuetify.theme.currentTheme.secondary
                                .base,
                            font: {
                                family: 'Comic Sans MS',
                                size: 15,
                                weight: 'bold',
                                lineHeight: 1.2,
                            },
                        },
                        ticks: {
                            color: this.$vuetify.theme.currentTheme.secondary
                                .lighten4,
                            // color: this.$vuetify.theme.currentTheme.secondary.lighten4,
                        },
                        grid: {
                            color: this.dark
                                ? 'rgba(255, 255, 255, 0.1)'
                                : 'rgba(0, 0, 0, 0.1)',
                        },
                    },
                    y: {
                        suggestedMin: -1,
                        suggestedMax: 1,
                        title: {
                            display: true,
                            text: 'Sentiment Score',
                            // color: this.dark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                            color: this.$vuetify.theme.currentTheme.secondary
                                .base,
                            font: {
                                family: 'Comic Sans MS',
                                size: 15,
                                weight: 'bold',
                                lineHeight: 1.2,
                            },
                        },
                        ticks: {
                            // color: this.dark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                            color: this.$vuetify.theme.currentTheme.secondary
                                .lighten4,
                        },
                        grid: {
                            color: this.dark
                                ? 'rgba(255, 255, 255, 0.1)'
                                : 'rgba(0, 0, 0, 0.1)',
                        },
                    },
                },
                plugins: {
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'x',
                        },
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true,
                            },
                            mode: 'x',
                        },
                    },
                },
            },
        })
    },
}
</script>

<style lang="scss" scoped></style>
