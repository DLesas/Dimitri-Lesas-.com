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
        computed: {
        },
        mounted () {
        },
    }
</script>

<style lang="scss" scoped>

</style>