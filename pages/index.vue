<template>
    <div>
        <v-container id="main" fluid class="parent" fill-height>
            <v-row no-gutters align="center" class="pt-11 mt-0 pt-md-0">
                <v-col cols="12">
                    <client-only>
                        <div id="toremove" class="mid pt-md-5 pt-lg-9 pt-md-0">
                            <div ref="textsurround" class="mid pt-0 text">
                                <div class="my-5 mid">
                                    <vue-typer
                                        v-if="render"
                                        repeat="0"
                                        :class="dark ? 'dark' : ''"
                                        :text="text1"
                                        @completed="render0finished"
                                    ></vue-typer>
                                    <vue-typer
                                        v-if="render1"
                                        repeat="0"
                                        :text="text2"
                                        :class="dark ? 'dark' : ''"
                                        type-delay="97"
                                        @completed="render2 = true"
                                    ></vue-typer>
                                    <vue-typer
                                        v-if="render2"
                                        text="Dimitri Lesas."
                                        repeat="0"
                                        :class="dark ? 'dark name' : 'name'"
                                        type-delay="112"
                                        @completed="render2finished"
                                    ></vue-typer>
                                </div>
                                <div class="my-5 mid">
                                    <vue-typer
                                        v-if="render3"
                                        repeat="0"
                                        :class="dark ? 'dark' : ''"
                                        text="A self-taught programmer and a finance BSc graduate hailing from"
                                        type-delay="27"
                                        style="word-wrap: normal"
                                        @completed="render4 = true"
                                    ></vue-typer>
                                    <a
                                        href="https://www.southampton.ac.uk/about.page"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <vue-typer
                                            v-if="render4"
                                            ref="unityper"
                                            repeat="0"
                                            text="The University of Southampton."
                                            type-delay="30"
                                            :class="
                                                dark
                                                    ? 'dark university'
                                                    : 'university'
                                            "
                                            @completed="render4finished"
                                        ></vue-typer>
                                    </a>
                                </div>
                                <div class="my-5 mid">
                                    <vue-typer
                                        v-if="render5"
                                        repeat="0"
                                        text="Full stack developer & data scientist with"
                                        type-delay="29"
                                        :class="dark ? 'dark' : ''"
                                        @completed="render6 = true"
                                    ></vue-typer>
                                    <vue-typer
                                        v-if="render6"
                                        :class="dark ? 'dark name' : 'name'"
                                        repeat="0"
                                        text="expertise in extracting decision making insights from data."
                                        type-delay="42"
                                        @completed="render6finished"
                                    ></vue-typer>
                                    <!--- expertise in desining data driven user experiences --->
                                    <!-- expertise in story telling with data. --->
                                </div>
                                <div class="mt-5 mid">
                                    <vue-typer
                                        v-if="render7"
                                        :class="dark ? 'dark' : ''"
                                        repeat="0"
                                        text="I'm passionate about using data to"
                                        type-delay="52"
                                        @completed="render8 = true"
                                    ></vue-typer>
                                    <vue-typer
                                        v-if="render8"
                                        :class="dark ? 'dark' : ''"
                                        repeat="0"
                                        class="unsure"
                                        :text="passionate"
                                        pre-erase-delay="1000"
                                        erase-style="backspace"
                                        erase-delay="13"
                                        type-delay="57"
                                        @completed="rendertextfinished"
                                    ></vue-typer>
                                    <!--- expertise in desining data driven user experiences --->
                                </div>
                            </div>
                        </div>
                    </client-only>
                </v-col>
                <v-col cols="12">
                    <v-row no-gutters class="icons pt-9 pt-md-0">
                        <v-row
                            style="align-items: center"
                            justify="space-around"
                        >
                            <v-col
                                v-for="(link, i) in quicklinks"
                                :key="i"
                                class="pb-3"
                                :cols="orientation === 'landscape' ? 4 : 6"
                                md="4"
                            >
                                <v-btn
                                    :id="link.id"
                                    v-ripple="{ class: `ripple--text` }"
                                    :class="iconclass"
                                    text
                                    :to="link.to"
                                    router
                                    exact
                                    rounded
                                    color="primary"
                                    style="width: 100%; height: 100%"
                                    @mouseover.native="
                                        link.icontouse = link.icon2
                                        style =
                                            'background-color: var(--v-secondary-base)'
                                    "
                                    @mouseleave.native="
                                        link.icontouse = link.icon
                                    "
                                >
                                    <v-col cols="12">
                                        <v-row
                                            width="100%"
                                            style="
                                                place-content: center;
                                                margin-bottom: 12px;
                                            "
                                        >
                                            <v-icon large>
                                                {{ link.icontouse }}
                                            </v-icon>
                                        </v-row>
                                        <v-row
                                            width="100%"
                                            style="place-content: center"
                                        >
                                            <span style="font-weight: bold">
                                                {{ link.title }}
                                            </span>
                                        </v-row>
                                    </v-col>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <three-background></three-background>
    </div>
</template>
<script>
/* eslint-disable camelcase */
import ThreeBackground from '~/components/ThreeBackground.vue'
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
export default {
    components: { ThreeBackground },
    data() {
        return {
            orientation: 'landscape',
            countWord: 0,
            timestamp: 0,
            render: false,
            text1: 'Hello there!',
            text2: 'I am',
            render1: false,
            render2: false,
            render3: false,
            render4: false,
            render5: false,
            render6: false,
            render7: false,
            render8: false,
            passionate: [
                'create historical stories.',
                'help machines learn and eventually take over the world.',
                'make the world a better place.',
            ],
            rendericons: false,
            quicklinks: [
                {
                    icon: 'mdi-code-braces',
                    icon2: 'mdi-code-json',
                    icontouse: 'mdi-code-braces',
                    title: 'Skills',
                    id: 'Skills',
                    to: '/Skills',
                },
                {
                    icon: 'mdi-folder-outline',
                    icon2: 'mdi-folder-open-outline',
                    icontouse: 'mdi-folder-outline',
                    title: 'Portfolio',
                    id: 'Portfolio',
                    to: '/Portfolio',
                },
                {
                    icon: 'mdi-file-document-outline',
                    icon2: 'mdi-file-search-outline',
                    icontouse: 'mdi-file-document-outline',
                    title: 'Resume / CV',
                    id: 'Resume',
                    to: '/Resume',
                },
            ],
            iconclass: 'transparent',
        }
    },
    head() {
        return {
            title: 'Homepage',
            meta: [
                {
                    hid: 'Homepage',
                    name: 'Homepage',
                    content:
                        "Home page of the portfolio of the full stack developer & Data scientist Dimitri Lesas', who is avaliable for employment / Contract Work / freelance work. Specialist in Data Analysis, Data Visualisation, Deep-Learning, Web development and web development.",
                },
            ],
        }
    },
    computed: {
        dark() {
            return this.$vuetify.theme.dark
        },
        view() {
            return this.$vuetify.breakpoint.name
        },
    },
    async mounted() {
        setTimeout(() => {
            this.$nuxt.$emit('indexmounted')
            this.handleorientation(window.screen.orientation.type)
            window.addEventListener('orientationchange', this.handleorientation)
        }, 400)

        const visited = await this.getCookie('visited')
        if (visited === null) {
            this.setCookie('visited', 1, 31)
        } else {
            this.text1 = 'Welcome back!'
            this.text2 = 'As you know I am'
        }

        this.render = true
    },
    beforeDestroy() {
        const el = document.getElementById('toremove')
        el.parentNode.removeChild(el)
        window.removeEventListener('orientationchange', this.handleorientation)
    },
    methods: {
        async render0finished() {
            await sleep(1250)
            this.render1 = true
        },
        async render2finished() {
            await sleep(500)
            this.render3 = true
        },
        async render4finished() {
            await sleep(1000)
            this.render5 = true
        },
        async render6finished() {
            await sleep(760)
            this.render7 = true
        },
        async rendertextfinished() {
            await sleep(250)
            this.animation()
        },
        async animation() {
            const animation = this.$gsap.timeline()
            await animation
                .to('#Skills', { duration: 0.3, opacity: 1 })
                .to('#Portfolio', { duration: 0.3, opacity: 1 })
                .to('#Resume', { duration: 0.3, opacity: 1 })
            this.iconclass = 'opaque'
        },
        sendevent(evt) {
            const canvas = document.getElementById('background')
            if (evt.timeStamp - this.timestamp < 0.65) {
                // eslint-disable-next-line no-useless-return
                return
            } else {
                this.timestamp = evt.timeStamp
                const newevent = new MouseEvent('mousemove', evt)
                canvas.dispatchEvent(newevent)
            }
        },
        formatText(text, ref, textSize = 22) {
            const maxChars = Math.floor(this.$refs[ref].clientWidth / textSize)
            const words = text.split(' ')
            let breaked = ''
            let currentCount = 0
            words.forEach((word) => {
                currentCount += word.length
                currentCount += 1
                if (currentCount >= maxChars) {
                    currentCount = word.length
                    breaked = `${breaked}\n${word} `
                } else {
                    breaked = `${breaked}${word} `
                }
            })
            return breaked
        },
        setCookie(cname, cvalue, exdays) {
            const d = new Date()
            d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
            const expires = 'expires=' + d.toUTCString()
            document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
        },
        getCookie(cookieName) {
            const reg = new RegExp(
                '^(?:.*;)?\\s*' + cookieName + '\\s*=\\s*([^;]+)(?:.*)?$'
            )
            // eslint-disable-next-line no-sparse-arrays
            const value_or_null = (document.cookie.match(reg) || [, null])[1]
            return value_or_null
        },
        handleorientation() {
            setTimeout(() => {
                if (window.screen.orientation.angle === 0) {
                    this.orientation = 'portrait'
                }
                if (window.screen.orientation.angle === 90) {
                    this.orientation = 'landscape'
                }
            }, 200)
        },
    },
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Handlee&family=Merienda&family=Patrick+Hand&display=swap');
.parent {
    display: flex;
    flex-direction: column;
    height: 80vh;
    width: 100%;
}
.mid {
    align-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
}
.icons {
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    width: 100%;
}
.name {
    font-weight: bold;
}
.textcenter {
    text-align: center;
}
.vue-typer.university ::v-deep .typed {
    color: var(--v-primary) !important;
    text-decoration: underline;
    font-weight: bold;
    cursor: pointer;
}
.vue-typer.unsure ::v-deep .typed {
    font-size: 20px;
    text-decoration: underline;
    text-decoration-style: dotted;
    font-style: italic;
}
.vue-typer.dark ::v-deep .typed {
    color: rgb(255, 255, 255);
}

@media only screen and (max-width: 600px) {
    .vue-typer ::v-deep .typed {
        font-size: 15px;
    }
    .vue-typer.unsure ::v-deep .typed {
        font-size: 15px;
    }
}

@media only screen and (orientation: landscape) and (max-width: 1000px) {
    .vue-typer ::v-deep .typed {
        font-size: 13px;
    }
    .vue-typer.unsure ::v-deep .typed {
        font-size: 13px;
    }
}

.text {
    font-family: 'Handlee', cursive;
    //  font-family: 'Merienda', cursive;
    // font-family: 'Patrick Hand', cursive;
    font-weight: normal;
    letter-spacing: 1px;
    font-size: 20px;
}
.transparent {
    opacity: 0;
}
.opaque {
    opacity: 1;
}
span.nowrap {
    white-space: nowrap;
}
</style>
