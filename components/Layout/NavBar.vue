<template>
    <div>
        <v-app-bar
            clipped-left
            clipped-right
            elevation="0"
            fixed
            :dark="dark"
            :app="app"
            style="
                backdrop-filter: blur(4px);
                background-color: rgba(255, 255, 255, 0);
            "
        >
            <v-app-bar-nav-icon
                id="navicon"
                color="primary"
                style="z-index: 100"
                @click.stop="
                    $emit('EnableSide')
                    sidebar = !sidebar
                    movetitle()
                "
            />
            <v-toolbar-title
                id="toolbartitle"
                class="ma-0 pa-0"
                style="z-index: -10"
            >
                <LayTitle />
            </v-toolbar-title>
            <v-spacer />
            <v-btn id="noti" v-ripple="{ class: `ripple--text` }" depressed icon>
                <v-icon color="primary"> mdi-bell </v-icon>
            </v-btn>
            <div id="settings">
                <settings-pop />
            </div>
            <Tooltip
                :steps="steps"
                name="NavBar"
            ></Tooltip>
        </v-app-bar>
    </div>
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
            style: 'background-color: rgba(255, 255, 255, 0.3)',
            steps: [
                {
                    target: "settings",
                    text: "You can customise this website to your liking here"
                }
            ],
            tool : false
        }
    },
    computed: {
        route() {
            return this.$route.path
        },
        dark() {
            return this.$vuetify.theme.dark
        },
        mobile() {
            return this.$vuetify.breakpoint.mobile
        },
    },
    watch: {
        route(newValue) {
            if (newValue !== '/') {
                this.app = true
            } else {
                this.app = false
            }
        },
        mobile(newValue) {
            this.handletitle(newValue)
        },
    },
    mounted() {
        if (this.route !== '/') {
            this.app = true
        } else {
            this.app = false
        }
        this.tomove = 175
        this.mobile ? this.handletitle(this.mobile) : (this.tomove = 170)
    },
    methods: {
        movetitle() {
            // eslint-disable-next-line no-unused-vars
            if (!this.mobile) {
                if (this.sidebar === true) {
                    this.$gsap.to('#toolbartitle', {
                        x: this.tomove,
                        duration: 0.3,
                    })
                } else {
                    this.$gsap.to('#toolbartitle', { x: 0, duration: 0.3 })
                }
            }
        },
        handletitle(value) {
            value
                ? this.$gsap.to('#toolbartitle', { x: -20, duration: 0.3 })
                : this.$gsap.to('#toolbartitle', { x: 0, duration: 0.3 })
        },
    },
}
</script>
<style lang="scss" scoped></style>
