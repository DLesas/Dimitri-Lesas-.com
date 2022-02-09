<template>
    <div>
    <v-container fluid>
        <v-tabs fixed-tabs align-with-title show-arrows>
            <v-tab>
                The Data & The Why
            </v-tab>
            <v-tab>
                Finding's
            </v-tab>
            <v-tab>
                How it's done
            </v-tab>
            <v-tab-item >
                <SegTheData></SegTheData>
            </v-tab-item>
            <v-tab-item>
                <v-main>
                    <v-container>
                        
                    </v-container>
                </v-main>
            </v-tab-item>
        </v-tabs>
    </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        head() {
        return {
            title: 'Customer Segmentation',
            meta: [
                {
                    hid: 'Customer Segmentation',
                    name: 'Customer Segmentation',
                    content:
                        "Customer Segmentation Front end project created by the Full stack Developer & Data Scientist Dimitri Lesas. Here you will find an example of Dimitri Lesas' front end skills in the form of analysis on consumer behaviour A.K.A Customer Segmentation.",
                },
            ],
        }
    },
        computed: {
        },
        mounted () {
        },
    }
</script>

<style lang="scss" scoped>

</style>