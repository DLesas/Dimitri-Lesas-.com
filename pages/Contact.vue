<template>
    <v-container>
        <v-row no-gutters>
            <v-col cols="12" md="6">
                <v-card flat :height="height" :style="styling"> </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <contact-map :height="height" :style="styling"></contact-map>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            height: 850,
        }
    },
    head() {
        return {
            title: 'Contact',
            meta: [
                {
                    hid: 'Contact',
                    name: 'Contact',
                    content:
                        "Contact page of the portfolio of the full stack developer & Data scientist Dimitri Lesas', who is avaliable for employment / Contract Work / freelance work. Here you can find a way to contact me for abnything related to work, data or web development",
                },
            ],
        }
    },
    computed: {
        dark() {
            return this.$vuetify.theme.dark
        },
        styling() {
            return this.dark ? 'background: #121212' : ''
        },
        mobile() {
            return this.$vuetify.breakpoint.mobile
        },
    },
    mounted() {
        this.init()
        this.resize()
    },
    beforeDestroy() {
        // this.ref.dispose()
        window.removeEventListener('resize', this.resize)
    },
    methods: {
        init() {
            window.addEventListener('resize', this.resize)
        },
        resize() {
            const element = document.getElementById('map')
            this.height = this.mobile
                ? (window.outerHeight - element.getBoundingClientRect().y) / 2
                : window.outerHeight - element.getBoundingClientRect().y - 40
            console.log(this.height)
        },
    },
}
</script>

<style lang="scss" scoped></style>
