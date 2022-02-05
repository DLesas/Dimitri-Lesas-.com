<template>
    <v-container>
        <v-row justify="center">
            <SentContInput></SentContInput>
        </v-row>
        <v-row justify="center">
            <v-container>
                <v-row justify="center">
                    <v-btn> apply </v-btn>
                </v-row>
                <v-row justify="center" cols="12"> lmao </v-row>
            </v-container>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        GetTwitterData() {
            this.loading = true
            this.$axios
                .$get(
                    `https://xr18a07x5k.execute-api.eu-west-2.amazonaws.com/default/TwitterLookUp?body=%23${this.hashtags}`
                )
                .then((res) => {
                    this.loading = false
                    const data = JSON.parse(res.Data)
                    // const response = JSON.parse()
                    this.data = data
                })
        },
    },
}
</script>

<style lang="scss" scoped></style>
