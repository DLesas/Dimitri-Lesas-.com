<template>
    <div style="height: 100%">
        <v-container v-if="data.length > 0">
            <Tooltip :steps="steps" name="Sentiment" :daystoreset="1"></Tooltip>
            <v-row no-gutters>
                <v-col cols="12">
                    <SentLineGraph :data="graphdata"></SentLineGraph
                ></v-col>
            </v-row>
            <v-row justify="space-around">
                <v-col cols="12" md="5">
                    <SentBarGraph :data="bardata"></SentBarGraph>
                </v-col>
                <v-col cols="12" md="5">
                    <SentSunBurstGraph></SentSunBurstGraph>
                </v-col>
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
        <v-container v-else style="height: 100%">
            <v-row
                style="height: 100%; text-align: center;"
                align="center"
                justify="center"
                class="text-subtitle-1 pa-0 ma-0"
            >
                <div class="pa-0 ma-0">
                    <p> Here you can pull Tweets from Twitter and analyse their
                    sentiment (and more) towards the topic choosen using the
                    "Get Tweets" button and the various other parameters. <br />
                    The Code that pulls and analyses the tweets can be found
                    <a
                        href="https://github.com/DLesas/Aws-Lambda/blob/master/Deploy/lambda_function.py"
                        target="_blank"
                        rel="noreferrer"
                        >on my github</a
                    >
                    and is hosted on AWS as a lambda function. </p>
                    
                </div>
                <div class="pa-0 ma-0">
                    <p class="text-h6 secondary--text">  Enter Parameters and press "Get Tweets" to get started. </p>
                </div>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            hashtags: '',
            data: [],
            loading: false,
            TimeSeries: {},
            colorindex: 0,
            steps: [
                {
                    target: 'linegraph',
                    text: 'This graph shows you the sentiment of the pulled tweets over time',
                },
                {
                    target: 'bargraph',
                    text: 'This Bargraph represents The average Sentiment score of thee choosen queries',
                },
                {
                    target: 'sunburstgraph',
                    text: 'Here you will see notifications pop up based on your actions',
                },
            ] 
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
                return final
            } else {
                return final
            }
        },
        bardata() {
            // eslint-disable-next-line no-unused-vars
            const ffinal = []
            const final = []
            if (this.data.length > 0) {
                for (const datapoint in this.data) {
                    const relevantdata = this.data[datapoint]
                    if (!(relevantdata.query in final)) {
                        final[relevantdata.query] = {
                            query: relevantdata.query,
                            popularity: [],
                        }
                    }
                    final[relevantdata.query].popularity.push(
                        relevantdata.SentimentScore
                    )
                }
                for (const queryname in final) {
                    final[queryname].popularity =
                        final[queryname].popularity.reduce(
                            (partialSum, a) => partialSum + a,
                            0
                        ) / final[queryname].popularity.length
                }
                for (const queryname in final) {
                    ffinal.push(final[queryname])
                }
            }
            return ffinal
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
                data[datapoint].color =
                    this.$vuetify.theme.currentTheme.analogic_complement[
                        this.colorindex
                    ]
            }
            this.colorindex++
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
