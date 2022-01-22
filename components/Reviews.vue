<template>
    <v-card v-ripple="{ class: `ripple--text` }" shaped rounded="xl"  elevation="3" outlined width="450" :href="link" target="_blank">
            <v-card-title class="mb-0 pb-0 pt-1">
                <v-row class="pb-0 mb-0">
                    <v-col cols="4" class="pb-0 mb-0">
                        <v-icon x-large :color="color">
                            mdi-format-quote-open
                        </v-icon>
                    </v-col>
                    <v-col cols="8" class="pb-0 mb-0">
                        <v-spacer/>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text class="mb-0 mt-0 pt-0">
                <v-row class="pt-0 mt-0">
                    <v-col class="px-14 pb-0" justify-center style="text-align: center">
                        {{ review }}
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-title class="mb-0 pb-0 pt-0">
                <v-row class="pb-0 mb-0 pt-0">
                    <v-col cols="10" class="pb-0 mb-0 pt-0 mt-0">
                        <v-spacer/>
                    </v-col>
                    <v-col cols="2" class="pb-0 mb-0">
                        <v-icon x-large :color="color2">
                            mdi-format-quote-close
                        </v-icon>
                    </v-col>
                </v-row>
            </v-card-title>
                <v-card-text :style="style" class="ma-0 pa-2 px-5 py-5 rounded-xl sortit">
                    <v-row no-gutters align="center" style="color: white">
                        <v-col class="Fancy">
                            {{ name }}
                        </v-col>
                        <v-col>
                            <v-spacer/>
                        </v-col>
                            <span v-if="job" style="">
                                <v-icon v-if="link" size="25" color="white">
                                    {{ name === "Shia LaBoeuf" ? "mdi-youtube" : "mdi-linkedin" }}
                                </v-icon>
                             {{ job }}   
                            </span>    
                    </v-row>    
                </v-card-text>
    </v-card>
</template>

<script>
    export default {
        props: {
            name : {
                type: String,
                default: "Bob"
            },
            review : {
                type: String,
                default: "Don't like him"
            },
            color : {
                type: String,
                default: "rgba(0,255,0,.4)"
            },
            color2: {
                type: String,
                default: "rgba(0,255,0,.4)"
            },
            job : {
                type: String,
                default: "your average joe"
            },
            link : {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                style: "background-image: linear-gradient(to right, " + this.color + ", " + this.color2 + ");"
            }
        },
    }
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Tangerine:wght@700&display=swap');

.Fancy{
    font-family: 'Tangerine', cursive;
    font-size: 30px;
}
.sortit{
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
}
</style>