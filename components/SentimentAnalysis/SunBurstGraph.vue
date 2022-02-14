<template>
    <v-card id="sunburstgraph" raised rounded flat :height="400" :style="dark ? 'background: #121212' : ''">
    </v-card>
</template>

<script>
export default {
    props: {},
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

        /* eslint-disable no-unused-vars */
        /* eslint-disable camelcase */

        const { am5, am5hierarchy, am5xy } = this.$am5()

        const {
            am5themes_Animated,
            am5themes_Dark,
            am5themes_Material,
            am5themes_Responsive,
        } = this.$am5theme()

        const root = am5.Root.new('sunburstgraph')

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([am5themes_Animated.new(root)])

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
            am5hierarchy.Sunburst.new(root, {
                singleBranchOnly: true,
                downDepth: 10,
                initialDepth: 10,
                valueField: 'value',
                categoryField: 'name',
                childDataField: 'children',
            })
        )

        // Generate and set data
        // https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
        const maxLevels = 2
        const maxNodes = 3
        const maxValue = 100

        const data = {
            name: 'Root',
            children: [],
        }
        generateLevel(data, '', 0)

        series.data.setAll([data])
        series.set('selectedDataItem', series.dataItems[0])

        function generateLevel(data, name, level) {
            for (let i = 0; i < Math.ceil(maxNodes * Math.random()) + 1; i++) {
                const nodeName = name + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i]
                // eslint-disable-next-line no-var
                var child
                if (level < maxLevels) {
                    child = {
                        name: nodeName + level,
                    }

                    if (level > 0 && Math.random() < 0.5) {
                        child.value = Math.round(Math.random() * maxValue)
                    } else {
                        child.children = []
                        generateLevel(child, nodeName + i, level + 1)
                    }
                } else {
                    child = {
                        name: name + i,
                        value: Math.round(Math.random() * maxValue),
                    }
                }
                data.children.push(child)
            }

            level++
            return data
        }

        // Make stuff animate on load
        series.appear(1000, 100)
    },
}
</script>

<style lang="scss" scoped></style>
