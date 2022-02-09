<template>
    <v-container>
        <v-row no-gutters>
            <v-col cols="12">
                <SentLineGraph :data="graphdata"></SentLineGraph
            ></v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12">
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
    head() {
        return {
            title: 'Sentiment Analysis',
            meta: [
                {
                    hid: 'Sentiment Analysis',
                    name: 'Sentiment Analysis',
                    content:
                        'Sentiment Analysis Full Stack project created by the Full stack Developer & Data Scientist Dimitri Lesas. Here you can pull and filter tweets from twitter and check the sentiment of the general public using various machine learning and deep learning models.',
                },
            ],
        }
    },
    computed: {
        // current data is in [{x....}]
        // need to set data as {x : [{'sentiment': y, 'date': x}]}
        graphdata() {
            const final = {}
            if (this.data.length > 0) {
                for (const datapoint in this.data) {
                    const relevantdata = this.data[datapoint]
                    if (!(relevantdata.query in final)) {
                        final[relevantdata.query] = []
                    }
                    final[relevantdata.query].push({
                        sentiment: relevantdata.SentimentScore,
                        date: relevantdata.created_at,
                    })
                }
                console.log('final')
                console.log(final)
                return final
            } else {
                return final
            }
        },
    },
    watch: {},
    mounted() {
        this.$nuxt.$on('DataRecieved', (data) => {
            const cleandata = this.PrepareData(data.res, data.query)
            if (this.data.length > 0) {
                this.data = this.data.concat(cleandata).sort(this.custom_sort)
            } else {
                this.data = cleandata.sort(this.custom_sort)
            }
            console.log(this.data)
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
                data[datapoint].created_at = Date.parse(
                    data[datapoint].created_at
                )
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
        custom_sort(a, b) {
            return (
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            )
        },
    },
}
</script>

<style lang="scss" scoped></style>
