<template>
    <v-card id="plotly">
    </v-card>
</template>

<script>
    export default {
        props: {
            data: {
                type: Array,
                default () { return [
                    {
	                    x: [1,2,3,4], y: [1,2,3,4], z: [1,2,3,4],
	                    mode: 'markers',
	                    marker: {
		                    size: 12,
		                    line: {
		                        color: 'rgba(217, 217, 217, 0.14)',
		                        width: 0.5
                            },
		                    opacity: 0.8
                        },
	                    type: 'scatter3d',
                        hovertext: 'bob sucks really nice cock'
                    },
                    {
                        x:[5,6,7,8], y: [5,6,7,8], z: [5,6,7,8],
	                    mode: 'markers',
	                    marker: {
		                    color: 'rgb(127, 127, 127)',
		                    size: 12,
		                    symbol: 'circle',
		                    line: {
		                        color: 'rgb(204, 204, 204)',
		                        width: 1
                            },
		                    opacity: 0.8
                        },
	                    type: 'scatter3d'
                    }   
                ] }
            },
            layout: {
                type: Object,
                default() {
                    return {
                        xaxis: {
                            type: 'date'
                        },
                        margin: {
	                    l: 0,
	                    r: 0,
	                    b: 0,
	                    t: 0
                        }
                    }
                }
            }
        },
        watch: {
            data: {
                deep: true,
                handler(newValue) {
                    const el = document.getElementById("plotly")
                    console.log(this.data)
                    this.$plotly().Plotly.react(el, this.data, this.layout)
                }
            },
            layout: {
                deep: true,
                handler(newValue) {
                    const el = document.getElementById("plotly")
                    this.$plotly().Plotly.react(el, this.data, this.layout)
                }
            }
        },
        mounted () {
            setTimeout(() => { 
                const plotly = this.$plotly().Plotly;
                const Graph = document.getElementById("plotly");
                const data = this.data;
                const layout = this.layout
	            plotly.newPlot( Graph, data, layout);
                
            }, 200);
        },
        destroyed () {
            this.$plotly().Plotly.purge(document.getElementById("plotly"));
        },
        
    }
</script>

<style lang="scss" scoped>

</style>