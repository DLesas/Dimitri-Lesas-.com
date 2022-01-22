<template>
    <v-app-bar
    clipped-left
    clipped-right
    elevation="0"
    fixed
    :dark="dark"
    :app="app"
    style="backdrop-filter: blur(4px); background-color: rgba(255, 255, 255, 0.0)"
    >
        <v-app-bar-nav-icon id="navicon" color="primary" @click.stop="$emit('EnableSide'); sidebar=!sidebar; movetitle()"/>
        <v-toolbar-title id="toolbartitle">
            <LayTitle/>
        </v-toolbar-title>
        <v-spacer/>
        <LaySetDayNightSwitch></LaySetDayNightSwitch>
            <v-btn v-ripple="{ class: `ripple--text` }" depressed icon>
                <v-icon color="primary">
                    mdi-bell 
                </v-icon>
            </v-btn>
            <settings-pop/>
    </v-app-bar>
</template>

<script>
    import SettingsPop from '~/components/SettingsPop.vue'
    export default {
        components: { SettingsPop },
        data() {
            return {
                app: false,
                sidebar: false,
                tomove: 0,
                style: "background-color: rgba(255, 255, 255, 0.3)"
            }
        },
        computed: {
            route() {
                return this.$route.path 
            },
            dark() {
                return this.$vuetify.theme.dark
            }
        },
        watch: {
            route(newValue) {
                if (newValue !== "/") {
                    this.app = true
                }
                else {
                    this.app = false
                }
            },
        },
        mounted () {
            if (this.route !== "/") {
                    this.app = true
                }
                else {
                    this.app = false
                }
            this.tomove = 170
        },
        methods: {
            movetitle() {
                // eslint-disable-next-line no-unused-vars
                if (this.sidebar === true) {
                    this.$gsap.to('#toolbartitle', {x: this.tomove, duration: 0.3})
                }
                else {
                    this.$gsap.to('#toolbartitle', {x: 0, duration: 0.3})
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>