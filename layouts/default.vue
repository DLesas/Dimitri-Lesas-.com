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
            // eslint-disable-next-line no-unused-vars
            
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