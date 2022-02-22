<template>
    <v-navigation-drawer
        v-if="['md', 'lg', 'xl'].includes(view)"
        mobile-breakpoint="960"
        app
        right
        floating
        clipped
        :style="dark ? 'background: #121212' : ''"
    >
        <div v-if="route === '/Portfolio/EPA'">
            <v-container slot="prepend" class="text-h6 primary--text text--darken-4"> Contents </v-container>
            <v-container>
                <v-list flat dense class="py-0 my-0">
                    <v-list-group
                        v-for="(content, i) in contents"
                        :key="i"
                        :append-icon="
                            content.Children.length > 0
                                ? 'mdi-chevron-down'
                                : ''
                        "
                        class="pl-5 text-body-2 py-0 my-0 font-weight-regular"
                        @click.native="
                            content.Children.length === 0
                                ? goto(content.ID)
                                : ''
                        "
                    >
                        <template #activator>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ content.Title }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item
                            v-for="(child, j) in content.Children"
                            :key="j"
                            class="pl-10 text-body-3 py-0 my-0 font-weight-regular"
                            nuxt
                            :to="child.ID"
                        >
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ child.Title }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </v-list>
            </v-container>
        </div>
        <div v-else-if="route = '/Portfolio/Sentiment_Analysis'" style="height: 100%">
            <v-container slot="prepend" class="text-h6 primary--text text--darken-4"> Controls </v-container>
            <v-container fluid style="height: 90%">
                <SentControl></SentControl>
            </v-container>
        </div>
        <v-container fluid slot="append">
            <v-container fluid class="px-0 mx-0" style="text-decoration: underline;"> Languages Used </v-container>
            <v-chip-group class="pl-5" column>
                <v-chip
                    v-for="(Lang, j) in LanguageTags"
                    :key="j"
                    :color="Languagecolors[j]"
                >
                    {{ Lang }}
                </v-chip>
            </v-chip-group>
            <v-container class="px-0 mx-0" style="text-decoration: underline;"> Modules Used </v-container>
            <v-chip-group class="pl-5" column>
                <v-chip
                    v-for="(Tag, i) in ModuleTags"
                    :key="i"
                    :color="Modulecolors[i]"
                >
                    {{ Tag }}
                </v-chip>
            </v-chip-group>
        </v-container>
    </v-navigation-drawer>
</template>

<script>
import Portfolio from '~/static/Portfolio.json'
import modulesjson from '~/static/languages_modules.json'
export default {
    data() {
        return {
            Modulecolors: [],
            Languagecolors: [],
            contents: [],
            sectionObserver: null,
        }
    },
    computed: {
        view() {
            return this.$vuetify.breakpoint.name
        },
        color() {
            return this.$vuetify.theme.currentTheme.primary.base
        },
        dark() {
            return this.$vuetify.theme.dark
        },
        hash() {
            return this.$route.hash
        },
        route() {
            return this.$route.path
        },
        ModuleTags() {
            const Tags = []
            for (const project in Portfolio) {
                // eslint-disable-next-line dot-notation
                if (Portfolio[project].Link === this.route) {
                    for (const skillindex in Portfolio[project].SkillsUsed) {
                        if (
                            modulesjson[
                                Portfolio[project].SkillsUsed[skillindex]
                            ].type !== 'Language'
                        ) {
                            Tags.push(Portfolio[project].SkillsUsed[skillindex])
                        }
                    }
                    break
                }
            }
            return Tags
        },
        LanguageTags() {
            const Tags = []
            for (const project in Portfolio) {
                // eslint-disable-next-line dot-notation
                if (Portfolio[project].Link === this.route) {
                    for (const skillindex in Portfolio[project].SkillsUsed) {
                        if (
                            modulesjson[
                                Portfolio[project].SkillsUsed[skillindex]
                            ].type === 'Language'
                        ) {
                            Tags.push(Portfolio[project].SkillsUsed[skillindex])
                        }
                    }
                    break
                }
            }
            return Tags
        },
        ModuleColors() {
            try {
                const colorstouse = []
                const cookie = this.$cookies.get('analogic')
                const increments = Math.floor(
                    (cookie.length - 10) / this.ModuleTags.length
                )
                for (let index = 0; index < this.ModuleTags.length; index++) {
                    colorstouse.push(cookie[index + increments * index])
                }
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.Modulecolors = colorstouse
                return cookie
            } catch (err) {
                return this.$vuetify.theme.currentTheme.analogic
                    ? this.$vuetify.theme.currentTheme.analogic
                    : undefined
            }
        },
        LanguageColors() {
            try {
                const colorstouse = []
                const cookie = this.$cookies.get('analogic_complement')
                const increments = Math.floor(
                    cookie.length / this.LanguageTags.length
                )
                for (let index = 0; index < this.LanguageTags.length; index++) {
                    // colorstouse.push(cookie[Math.floor(Math.random() * cookie.length)])
                    colorstouse.push(cookie[index + (increments - 1) * index])
                }
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.Languagecolors = colorstouse
                return cookie
            } catch (err) {
                return this.$vuetify.theme.currentTheme.analogic_complement
                    ? this.$vuetify.theme.currentTheme.analogic_complement
                    : undefined
            }
        },
    },
    watch: {
        ModuleColors: {
            handler(newValue) {
                const colorstouse = []
                const increments = Math.floor(
                    newValue.length / this.ModuleTags.length
                )
                for (let index = 0; index < this.ModuleTags.length; index++) {
                    // colorstouse.push(newValue[Math.floor(Math.random() * newValue.length)])
                    colorstouse.push(newValue[index + increments * index])
                }
                this.Modulecolors = colorstouse
            },
        },
        LanguageColors: {
            handler(newValue) {
                const colorstouse = []
                const increments = Math.floor(
                    newValue.length / this.LanguageTags.length
                )
                for (let index = 0; index < this.LanguageTags.length; index++) {
                    // colorstouse.push(newValue[Math.floor(Math.random() * newValue.length)])
                    colorstouse.push(newValue[index + (increments - 1) * index])
                }
                this.Languagecolors = colorstouse
            },
        },
        hash: {
            handler() {
                this.updatecontents()
            },
        },
        dark: {
            handler() {
                this.updatecontents()
            },
        },
        color: {
            handler() {
                this.updatecontents()
            },
        },
        view: {
            handler() {
                this.updatecontents()
            },
        },
        route: {
            handler() {
                setTimeout(() => {
                    this.updatecontents()
                }, 800)
            },
        },
    },
    mounted() {
        /* setTimeout(() => {
            this.observeSections()
        }, 200) */
        setTimeout(() => {
            this.updatecontents()
        }, 800)
    },
    methods: {
        observeSections() {
            try {
                this.sectionObserver.disconnect()
            } catch (error) {}

            const options = {
                rootMargin: '0px 0px',
                threshold: 0,
            }
            this.sectionObserver = new IntersectionObserver(
                this.sectionObserverHandler,
                options
            )

            // Observe each section
            const sections = document.querySelectorAll(
                '.text-h6, .text-subtitle-1'
            )
            sections.forEach((section) => {
                this.sectionObserver.observe(section)
            })
        },
        sectionObserverHandler(entries) {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id
                    // Push sectionId to router here
                    setTimeout(() => {
                        this.$router.replace({
                            name: this.$route.name,
                            hash: `#${sectionId}`,
                        })
                        this.updatecontents()
                    }, 100)
                }
            }
        },
        updatecontents() {
            const content = []
            const els = document.querySelectorAll('.text-h6, .text-subtitle-1')
            const titles = []
            for (let index = 0; index < els.length; index++) {
                if (els[index].innerText !== 'Contents') {
                    titles.push(els[index])
                }
            }
            let lastmainindex = 0
            let lastsubindex = 0
            for (let index = 0; index < titles.length; index++) {
                if (titles[index].className.includes('text-h6')) {
                    content.push({})
                    content[lastmainindex].Title = titles[index].innerText
                    if (titles[index].ID === undefined) {
                        titles[index].setAttribute(
                            'id',
                            `${titles[index].innerText}`
                        )
                    }
                    content[lastmainindex].ID = titles[index].id
                    content[lastmainindex].Children = []
                    lastmainindex++
                    lastsubindex = 0
                } else if (
                    titles[index].className.includes('text-subtitle-1')
                ) {
                    content[lastmainindex - 1].Children.push({})
                    content[lastmainindex - 1].Children[lastsubindex].Title =
                        titles[index].innerText
                    if (titles[index].ID === undefined) {
                        titles[index].setAttribute(
                            'id',
                            `#${titles[index].innerText}`
                        )
                    }
                    content[lastmainindex - 1].Children[lastsubindex].ID =
                        titles[index].id
                    lastsubindex++
                }
            }
            setTimeout(() => {
                this.contents = content
            }, 50)
        },
        goto(hash) {
            this.$router.replace(`#${hash}`)
        },
    },
}
</script>

<style lang="scss" scoped>
.v-list ::v-deep .v-list-item--active {
    color: var(--v-secondary-base);
}
::v-deep .v-chip {
    color: white !important
}

</style>
<style>
.theme--light.v-chip {
    color: white !important
}
</style>
