<template>
    <v-card raised rounded flat :style="dark ? 'background: #121212' : ''">
        <v-row>
            <v-col cols="12">
                <v-card
                    id="chartdiv"
                    ref="test"
                    flat
                    :height="heighttouse"
                    :style="dark ? 'background: #121212' : ''"
                >
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    props: {
        networkdata: {
            type: Object,
            default() {
                return {}
            },
        },
        color: {
            type: Number,
            default: 6,
        },
        selected: {
            type: String,
            default: 'default',
        },
    },
    data() {
        return {
            heighttouse: 500,
            ref: undefined,
            data: this.networkdata,
            selectedchild: this.selected,
            resizing: false,
        }
    },
    computed: {
        dark() {
            return this.$vuetify.theme.dark
        },
        view() {
            return this.$vuetify.breakpoint.name
        },
    },
    watch: {
        networkdata(newValue) {
            this.ref.data.setAll([newValue])
        },
        view() {
            this.resize()
        },
    },
    mounted() {
        window.addEventListener('resize', this.resize())
        window.addEventListener('orientationchange', this.resize())
        const element = document.getElementById('chartdiv')
        this.heighttouse =
            window.innerHeight - element.getBoundingClientRect().y - 20
        // eslint-disable-next-line camelcase
        const { am5, am5hierarchy, am5themes_Animated } = this.$am5()
        const root = am5.Root.new('chartdiv')
        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([am5themes_Animated.new(root)])
        const networkdata = this.data
        // Create wrapper container
        const container = root.container.children.push(
            am5.Container.new(root, {
                width: am5.percent(100),
                height: am5.percent(100),
                layout: root.verticalLayout,
            })
        )
        // Create series
        // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
        const series = container.children.push(
            am5hierarchy.ForceDirected.new(root, {
                singleBranchOnly: false,
                downDepth: 2,
                topDepth: 1,
                initialDepth: 3,
                valueField: 'value',
                categoryField: 'name',
                childDataField: 'children',
                idField: 'name',
                linkWithField: 'linkWith',
                manyBodyStrength: -5,
                centerStrength: 0.5,
                zoomable: true,
            })
        )
        const vue = this
        series.nodes.template.events.on('pointerover', function (ev) {
            // eslint-disable-next-line no-unused-vars
            const r = ev.target.dataItem._settings.fill.r
            const g = ev.target.dataItem._settings.fill.g
            const b = ev.target.dataItem._settings.fill.b
            vue.emitname(ev.target.dataItem.dataContext.name, [r, g, b])
        })
        series.nodes.template.setup = function (target) {
            target.events.on('dataitemchanged', function (ev) {
                // eslint-disable-next-line no-unused-vars
                const icon = target.children.push(
                    am5.Picture.new(root, {
                        width: 70,
                        height: 70,
                        centerX: am5.percent(50),
                        centerY: am5.percent(50),
                        src: ev.target.dataItem.dataContext.image,
                    })
                )
            })
        }
        series.get('colors').setAll({
            step: this.color,
        })
        series.links.template.set('strength', 0.4)
        series.data.setAll([networkdata])
        series.set('selectedDataItem', series.dataItems[0])
        // Make stuff animate on load
        series.appear(1000, 100)
        const legend = series.children.push(am5.Legend.new(root, {}))
        legend.data.setAll(series.get('selectedDataItem'))
        this.ref = series
        setTimeout(() => {
            this.resize()
        }, 50)
    },
    beforeDestroy() {
        this.ref.dispose()
        window.removeEventListener('resize', this.resize())
        window.removeEventListener('orientationchange', this.resize())
    },
    destroyed() {},
    methods: {
        emitname(eventname, listcolor) {
            this.$emit('HoverOnNode', eventname, listcolor)
        },
        resize() {
            if (!this.resizing) {
                this.resizing = true
                setTimeout(() => {
                    const element = document.getElementById('chartdiv')
                    this.heighttouse =
                        window.innerHeight -
                        element.getBoundingClientRect().y -
                        20
                    this.resizing = false
                }, 50)
            } else {
                setTimeout(() => {
                    this.resize()
                }, 50)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.chartdiv {
    display: flex;
}
</style>
