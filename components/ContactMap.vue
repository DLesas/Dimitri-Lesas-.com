
<template>
    <v-card id="map" flat :height="height" :style="styling">
    </v-card>
</template>

<script>
    export default {
        props: {
            height: {
                type: Number,
                default: 900
            },
            styling: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                el: undefined
            }
        },
        mounted () {
            this.init();
        },
        methods: {
            init() {
                /* eslint-disable camelcase */
                // eslint-disable-next-line no-unused-vars
                const {am5, am5hierarchy, am5themes_Animated} = this.$am5();;
                const am5map = require("@amcharts/amcharts5/map")
                const WorldHigh = require("@amcharts/amcharts5-geodata/region/world/europeHigh").default
                this.el = document.getElementById("map")
                const root = am5.Root.new(this.el);
                root.setThemes([
                    am5themes_Animated.new(root)
                ]);
                const colors = am5.ColorSet.new(root, {});
                const chart = root.container.children.push(
                    am5map.MapChart.new(root, {
                        projection: am5map.geoMercator()
                    })
                );
                const worldSeries = chart.series.push(
                    am5map.MapPolygonSeries.new(root, {
                        geoJSON: WorldHigh,
                        exclude: ["AQ"]
                    })
                );
                worldSeries.mapPolygons.template.states.create("hover", {
                    fill: colors.getIndex(9)
                });
                worldSeries.mapPolygons.template.setAll({
                    tooltipText: "{name}",
                    interactive: true,
                    fill: am5.color(0x6A5ACD),
                    templateField: "polygonSettings"
                });
                setTimeout(() => {  
                console.log(worldSeries)
                }, 0);
                const graticuleSeries = chart.series.insertIndex(
                    0, am5map.GraticuleSeries.new(root, {})
                );
                graticuleSeries.mapLines.template.setAll({
                    stroke: am5.color(0x000000),
                    strokeOpacity: 0.1
                });

            }
        }
    }
                // const root = am5.Root.new(this.el)




// Set themes


// Create polygon series


</script>

<style lang="scss" scoped>

</style>