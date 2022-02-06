<template>
    <v-container style="height: 100%">
        <v-row justify="center">
            <SentContInput></SentContInput>
        </v-row>
        <v-row class="pt-2" justify="center">
            <v-container>
                <v-row justify="center">
                    <v-btn
                        elevation="8"
                        rounded
                        color="primary darken-3"
                        style="border-color: var(--v-primary-base)"
                        :loading="loading"
                        :outlined="loading"
                        :text="loading"
                    >
                        Get Tweets
                    </v-btn>
                </v-row>
            </v-container>
        </v-row>
        <v-row justify="end" align="end">
            <v-col cols="12">
                <v-spacer></v-spacer>
            </v-col>
            <v-col
                class="secondary--text"
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
            ResText: 'Press "Get Tweets" to search for tweets with cuurent parameters',
        }
    },
    methods: {
        GetTwitterData() {
            this.loading = true
            this.$nuxt.$loading.start()
            this.$axios
                .$get(
                    `https://xr18a07x5k.execute-api.eu-west-2.amazonaws.com/default/TwitterLookUp?body=%23${this.hashtags}`
                )
                .then((res) => {
                    this.loading = false
                    this.$nuxt.$loading.finish()
                    const data = JSON.parse(res.Data)
                    const response = JSON.parse(res.Response)
                    this.data = data
                    this.ResText = response
                })
        },
    },
}
</script>

<style lang="scss" scoped></style>
