<template>
    <v-app :style="route === '/' && indexmounted === true ? 'background-color: rgba(0, 0 ,0, 0)' : ''">
        <LayPortRightSideBar v-if="route.includes('Portfolio/')"></LayPortRightSideBar>
        <LayNavBar ref="LayNav" @EnableSide="drawer = !drawer"></LayNavBar>
        <v-navigation-drawer id="sidebar" ref="navsidebar" v-model="drawer" dark stateless :temporary="mobile" app>
            <v-row slot="prepend" class="pt-3" no-gutters>
                <v-col cols="10">
                    <v-spacer></v-spacer>
                </v-col>
                <v-col cols="2">
                    <v-btn v-ripple="{ class: `ripple--text` }" text depressed icon @click="closeside()">
                        <v-icon color="primary" large>
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <!-- eslint-disable-next-line vue/valid-v-on -->
            <LaySideBarContent></LaySideBarContent>
            <div slot="append">
            <v-row no-gutters class="mb-10" justify="space-around">
                <v-col cols="10">
                    <v-btn light color="secondary" large width="100%" nuxt to="/Contact">
                        Contact Me
                    </v-btn>
                </v-col>
            </v-row>
            <v-row no-gutters class="mb-5 mx-5 " align="center" justify="space-around">
                <v-col v-for="(social, i) in socialmedia" :key="i" cols="2" style="justify-content: center;">
                <v-btn 
                    v-ripple="{ class: `ripple--text` }"
                    icon
                    :href = social.to
                    rel="noreferrer"
                    target="_blank"
                    @mouseover.native="social.large = true"
                    @mouseleave.native="social.large = false"
                >
                    <v-icon
                        color="primary"
                        size=32
                        :x-large="social.large"
                    >
                        {{ social.icon }} 
                    </v-icon>
                </v-btn>
                </v-col>  
            </v-row>
            </div>
        </v-navigation-drawer>
        <v-main>
            <nuxt/>
        </v-main>
    </v-app>
</template>

<script>
/* eslint-disable camelcase */
    export default {
        data() {
            return {
                overlay: false,
                indexmounted: true,
                darkdrawer: true,
                drawer: false,
                socialmedia: [
                    {
                        icon: "mdi-linkedin",
                        to: "https://www.linkedin.com/in/dimitri-lesas-analytics/",
                        large:false
                 
                    },
                    {
                        icon: "mdi-github",
                        to: "https://github.com/DLesas",
                        large:false
                    },
                    {
                        icon: "mdi-instagram",
                        to: "",
                        large:false
                    }
                ],
            }
        },
        computed: {
            color() {
                return this.$vuetify.theme.currentTheme.primary.base
            },
            mobile () {
               return this.$vuetify.breakpoint.mobile
            },
            dark () {
                return this.$vuetify.theme.dark
            },
            route() {
                return this.$route.path 
            }
        },
        watch: {
            route(newValue) {
                if (newValue !== "/") {
                    this.indexmounted = false
                }
            }
        },
        mounted () {
            this.$nuxt.$on('indexmounted', () => {
                this.indexmounted = true
            })
            const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            if (darkMediaQuery.matches) {
                setTimeout(() => { 
                    this.$vuetify.theme.dark = true 
                }, 0);
            }
            setTimeout(() => { 
                const check = this.$cookies.isKey("primarybase")
                const primarybase = this.$cookies.get("primarybase")
                if (check) {
                    this.$vuetify.theme.currentTheme.primary.base = primarybase
                    this.$vuetify.theme.themes.dark.primary.base = primarybase
                    this.$vuetify.theme.themes.light.primary.base = primarybase
                    for (let index = 1; index < 6; index++) {
                        const lighten = this.$cookies.get(`primaryligten${index}`)
                        const darken = this.$cookies.get(`primarydarken${index}`)
                        this.$vuetify.theme.themes.dark.primary[`lighten${index}`] = lighten
                        this.$vuetify.theme.themes.light.primary[`lighten${index}`] = lighten
                        this.$vuetify.theme.themes.dark.primary[`darken${index}`] = darken
                        this.$vuetify.theme.themes.light.primary[`darken${index}`] = darken
                        this.$vuetify.theme.currentTheme.primary[`lighten${index}`] = lighten
                        this.$vuetify.theme.currentTheme.primary[`darken${index}`] = darken             
                    }
                    const secondarybase = this.$cookies.get("secondarybase")
                    this.$vuetify.theme.currentTheme.secondary = {}
                    this.$vuetify.theme.currentTheme.secondary.base = secondarybase
                    this.$vuetify.theme.themes.dark.secondary.base = secondarybase
                    this.$vuetify.theme.themes.light.secondary.base = secondarybase
                    for (let index = 1; index < 6; index++) {
                        const lighten = this.$cookies.get(`secondaryligten${index}`)
                        const darken = this.$cookies.get(`secondarydarken${index}`)
                        this.$vuetify.theme.themes.dark.secondary[`lighten${index}`] = lighten
                        this.$vuetify.theme.themes.light.secondary[`lighten${index}`] = lighten
                        this.$vuetify.theme.themes.dark.secondary[`darken${index}`] = darken
                        this.$vuetify.theme.themes.light.secondary[`darken${index}`] = darken
                        this.$vuetify.theme.currentTheme.secondary[`lighten${index}`] = lighten
                        this.$vuetify.theme.currentTheme.secondary[`darken${index}`] = darken
                    }
                    const analogic = this.$cookies.get(`analogic`)
                    this.$vuetify.theme.currentTheme.analogic = analogic
                    this.$vuetify.theme.themes.light.analogic = analogic
                    this.$vuetify.theme.themes.dark.analogic = analogic
                    const analogiccomplement = this.$cookies.get(`analogic_complement`)
                    this.$vuetify.theme.currentTheme.analogic_complement = analogiccomplement
                    this.$vuetify.theme.themes.light.analogic_complement = analogiccomplement
                    this.$vuetify.theme.themes.dark.analogic_complement = analogiccomplement
                    const wave = this.$cookies.get(`wave`)
                    this.$vuetify.theme.currentTheme.wave = wave
                    this.$vuetify.theme.themes.light.wave = wave
                    this.$vuetify.theme.themes.dark.wave = wave
                }
            }, 0);
        },
        methods: {
            closeside() {
                this.drawer = false
                this.$refs.LayNav.sidebar = !this.$refs.LayNav.sidebar
                this.$refs.LayNav.movetitle()
            },
        },
    }
</script>

<style lang="scss" scoped>
</style>
<style>
.nuxt-progress{
    background-color: var(--v-primary-darken5) !important
}
</style>