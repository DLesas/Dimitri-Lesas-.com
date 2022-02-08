<template>
    <v-container>
        <v-row> </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <plotlychart :data="graphdata"></plotlychart>
            </v-col>
            <v-col cols="12" md="6">
                <Datatable
                    :items="data"
                    :toexclude="[
                        'id',
                        'created_at',
                        'place_id',
                        'Tags',
                        'CleanText',
                        'Targeted @',
                        'Tweet Url',
                    ]"
                ></Datatable>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            hashtags: '',
            data: [],
            loading: false,
            TimeSeries: {},
        }
    },
    computed: {
        graphdata() {
            const intermediate = {}
            const final = []
            if (this.data.length > 0) {
                for (const datapoint in this.data) {
                    const relevantdata = this.data[datapoint]
                    if (!(relevantdata.query in intermediate)) {
                        intermediate[relevantdata.query] = { x: [], y: [] }
                    }
                    intermediate[relevantdata.query].x.push(
                        relevantdata.created_at
                    )
                    intermediate[relevantdata.query].y.push(
                        relevantdata.SentimentScore
                    )
                }
                let colorindex = 0
                for (const trace in intermediate) {

                    console.log(this.$vuetify.theme.currentTheme.analogic_complement[colorindex])
                    final.push({
                        type: 'scatter',
                        mode: 'lines',
                        name: trace,
                        x: intermediate[trace].x,
                        y: intermediate[trace].y,
                        line: { color: this.$vuetify.theme.currentTheme.analogic_complement[colorindex] },
                    })
                    colorindex++
                }
                return final
            } else {
                return final
            }
        },
    },
    watch: {},
    mounted() {
        this.$nuxt.$on('DataRecieved', (data) => {
            console.log(data)
            const cleandata = this.PrepareData(data.res, data.query)
            if (this.data.length > 0) {
                this.data = this.data.concat(cleandata)
            } else {
                this.data = cleandata
            }
        })
    },
    methods: {
        PrepareData(data, query) {
            // data = [ {}, {} ]
            for (const datapoint in data) {
                data[datapoint].created_at = new Date(
                    data[datapoint].created_at
                )
                data[datapoint].date = this.cleandates(
                    data[datapoint].created_at
                )
                data[datapoint].query = query
            }
            return data
        },
        cleandates(d) {
            const datestring =
                ('0' + d.getDate()).slice(-2) +
                '-' +
                ('0' + (d.getMonth() + 1)).slice(-2) +
                '-' +
                d.getFullYear() +
                ' ' +
                ('0' + d.getHours()).slice(-2) +
                ':' +
                ('0' + d.getMinutes()).slice(-2)
            return datestring
        },
    },
}
</script>

<style lang="scss" scoped></style>
