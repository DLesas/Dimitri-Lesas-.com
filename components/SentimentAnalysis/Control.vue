<template>
    <v-container style="height: 100%">
        <v-row justify="center">
            <SentContInput @DataChanged="selected = $event"></SentContInput>
        </v-row>
        <v-row class="pt-0 mt-0">
            <v-col cols="6">
                <v-select
                    v-model="SelectCategory"
                    hint="Tweet categories to look through"
                    :items="CategoryItems"
                    item-text="category"
                    item-value="annotation"
                    persistent-hint
                ></v-select>
            </v-col>
            <v-col cols="6">
                <v-select
                    v-model="SelectNumber"
                    :hint="`Tweets to get. Will take approx. ${
                        (SelectNumber / 100) * 2
                    }s`"
                    :items="NumberItems"
                    label="Select"
                    persistent-hint
                    single-line
                ></v-select>
            </v-col>
        </v-row>
        <v-row class="pt-5" justify="center">
            <v-container>
                <v-row justify="center">
                    <v-btn
                        elevation="8"
                        color="primary darken-3"
                        :style="
                            loading ? 'border-color: var(--v-primary-base)' : ''
                        "
                        :loading="loading"
                        :outlined="loading"
                        :text="loading"
                        @click="loading ? '' : GetTwitterData()"
                    >
                        Get Tweets
                    </v-btn>
                </v-row>
            </v-container>
        </v-row>
        <v-row class="pt-8" no-gutters justify="end" align="end">
            <v-col cols="12">
                <v-spacer></v-spacer>
            </v-col>
            <v-col
                class="secondary--text text-subtitle-2"
                cols="12"
                style="text-align: center; font-weight: bold"
            >
                {{ ResText }}
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            ResText:
                'Press "Get Tweets" to search for tweets with current parameters',
            selected: [],
            NumberItems: [100, 200, 300, 400],
            CategoryItems: [
                { annotation: '0', category: 'All Categories' },
                { annotation: '6', category: 'Sports Events' },
                { annotation: '11', category: 'Sport' },
                { annotation: '12', category: 'Sports Team' },
                { annotation: '26', category: 'Sports League' },
                { annotation: '40', category: 'Sports Series' },
                { annotation: '92', category: 'Sports Personality' },
                { annotation: '27', category: 'American Football Game' },
                { annotation: '28', category: 'NFL Football Game' },
                { annotation: '39', category: 'Basketball Game' },
                { annotation: '68', category: 'Hockey Game' },
                { annotation: '35', category: 'Politicians' },
                { annotation: '38', category: 'Political Race' },
                { annotation: '88', category: 'Political Body' },
                { annotation: '47', category: 'Brand' },
                { annotation: '48', category: 'Product' },
                { annotation: '49', category: 'Product Version' },
                { annotation: '10', category: 'Person' },
                { annotation: '110', category: 'Viral accounts' },
                { annotation: '54', category: 'Musician' },
                { annotation: '55', category: 'Actor' },
                { annotation: '58', category: 'Entertainment Personality' },
                { annotation: '60', category: 'Athlete' },
                { annotation: '67', category: 'Interests & Hobbies' },
                { annotation: '3', category: 'TV Shows' },
                { annotation: '4', category: 'TV Episodes' },
                { annotation: '86', category: 'Movie' },
                { annotation: '130', category: 'Multimedia Franchise' },
                { annotation: '117', category: 'Movie Festival' },
                { annotation: '118', category: 'Award Show' },
                { annotation: '89', category: 'Music Album' },
                { annotation: '90', category: 'Radio Station' },
                { annotation: '132', category: 'Song' },
                { annotation: '91', category: 'Podcast' },
                { annotation: '114', category: 'Concert' },
                { annotation: '71', category: 'Video Game' },
                { annotation: '78', category: 'Video Game Publisher' },
                { annotation: '79', category: 'Video Game Hardware' },
                { annotation: '116', category: 'Video Game Tournament' },
                { annotation: '115', category: 'Video Game Conference' },
                { annotation: '136', category: 'Video Game Personality' },
                { annotation: '122', category: 'Fictional Character' },
                { annotation: '137', category: 'eSports Team' },
                { annotation: '138', category: 'eSports Player' },
                { annotation: '139', category: 'Fan Community' },
                { annotation: '119', category: 'Holiday' },
                { annotation: '120', category: 'Digital Creator' },
            ],
            SelectNumber: 200,
            SelectCategory: '0',
            queryname: ""
        }
    },
    watch: {},
    methods: {
        GetTwitterData() {
            this.loading = true
            this.$nuxt.$loading.start()
            // eslint-disable-next-line no-unused-vars
            const query = this.MakeQuery()
            this.$axios
                .$get(
                    `https://xr18a07x5k.execute-api.eu-west-2.amazonaws.com/default/TwitterLookUp?body=${query}&amount=${this.SelectNumber/100}`
                )
                .then((res) => {
                    this.loading = false
                    this.$nuxt.$loading.finish()
                    const data = JSON.parse(res.Data)
                    const response = res.Response
                    this.$nuxt.$emit('DataRecieved', {'query': this.queryname, 'res': data})
                    this.ResText = response
                })
        },
        MakeQuery() {
            let querystring = ''
            const lang = 'lang:en'
            for (const query in this.selected) {
                querystring = querystring + this.selected[query] + ' '

            }
            this.queryname = querystring
            querystring = querystring + lang
            /* querystring =
                this.SelectCategory === '0'
                    ? querystring
                    : querystring + ' ' + `context:${this.SelectCategory}` */
            return encodeURIComponent(querystring)
        },
    },
}
</script>

<style lang="scss" scoped>
::v-deep .v-messages__message {
    text-align: center !important;
}
::v-deep .v-select__selection {
    color: var(--v-primary-base);
}
</style>
