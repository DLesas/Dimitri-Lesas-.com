<template>
    <v-row no-gutters align="center" justify="space-around">
        <v-col cols="6">
            <span style="text-align:center" class="text-subtitle-2"> Light/Dark Mode Switch </span>
        </v-col>
        <v-col cols="6">
            <v-row no-gutters justify="center">
                <v-switch v-model="dark" inset> </v-switch>
            </v-row>
        </v-col>
    </v-row>    
</template>

<script>
export default {
    data() {
        return {
            dark: false,
        }
    },
    watch: {
        dark(newValue) {
            newValue ? this.darkmode() : this.lightmode()
        },
    },
    mounted() {
        setTimeout(() => {
            this.dark = this.$vuetify.theme.dark
        }, 50)
    },
    methods: {
        darkmode() {
            this.$vuetify.theme.dark = true
        },
        lightmode() {
            this.$vuetify.theme.dark = false
        },
    },
}
</script>

<style lang="scss" scoped></style>
