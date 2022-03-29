<template>
    <canvas :id="id"> </canvas>
</template>
<script>
export default {
    props: {
        data: {
            type: Array,
            default() {
                return []
            },
        },
        id : {
            type: String,
            default() {
                return "bargraph"
            }
        }
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
        computeddata() {
            const colors = this.$vuetify.theme.currentTheme.analogic
            // eslint-disable-next-line no-unused-vars
            const increment = Math.floor(
                colors.length / Object.keys(this.data).length
            )
            const colorsarray = []
            const averagearray = []
            const queryarray = []
            for (let index = 0; index < this.data.length; index++) {
                colorsarray.push(colors[index + (increment - 1) * index])
                averagearray.push(this.data[index].average)
                queryarray.push(this.data[index].query)
            }
            const data = {
                labels: queryarray,
                datasets: [
                    {
                        label: 'Average Sentiment',
                        data: averagearray,
                        backgroundColor: colorsarray,
                        borderColor: colorsarray,
                        borderWidth: 1,
                    },
                    {
                        label: 'Mentions every minute',
                        data: [1, 2],
                        borderColor: colorsarray,
                        borderWidth: 1,
                    },
                ],
            }
            return data
        },
        options() {
            const CalOptions =  {
                scales: {
                    y: {
                        suggestedMin: -1,
                        suggestedMax: 1,
                        title: {
                            display: true,
                            text: 'Value',
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
                    x: {
                        title: {
                            display: true,
                            text: 'Query',
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

                    }
                },
            }
            return CalOptions
        }
    },
    watch: {
        computeddata(newValue) {
            this.chart.data = newValue
            this.chart.update()
        },
        options(newValue) {
            this.chart.options = newValue
            this.chart.update()
        }
    },
    mounted() {
        const { Chart } = this.$Chart()
        const ctx = document.getElementById(this.id)
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: this.computeddata,
            options: this.options
        })
    },
}
</script>

<style lang="scss" scoped></style>
