<template>
    <div style="height: 93%">
        <div style="height: 100%; display: flex; align-items: center; width:100%">
            <v-col cols="12" class="pa-0 ma-0">
                <v-list>
                    <v-list-item
                        nuxt
                        to="/"
                        >
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                        nuxt
                        to="/About"
                        >
                        <v-list-item-icon>
                            <v-icon>mdi-account-details</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>About</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                        nuxt
                        to="/Skills"
                        >
                        <v-list-item-icon>
                            <v-icon>mdi-code-braces</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Skills</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                        nuxt
                        to="/Resume"
                        >
                        <v-list-item-icon>
                            <v-icon>mdi-file-document-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Resume</v-list-item-title>
                    </v-list-item>
                    <v-list-group
                        :value="true"
                        prepend-icon="mdi-folder-outline"
                        >
                        <template #activator>
                            <v-list-item-title>Portfolio</v-list-item-title>
                        </template>
                        <v-list-item
                            nuxt
                            to="/Portfolio"
                            >
                            <v-list-item-icon>
                                <v-icon></v-icon>
                            </v-list-item-icon>
                            <v-list-item-icon>
                                <v-icon small></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Index</v-list-item-title>
                            <v-list-item-icon>
                                <v-icon>mdi-format-list-text</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                        <v-list-group
                            v-for="(i, Category) in Projectlinks"
                            :key="Category"
                            no-action
                            sub-group
                            >
                            <template #activator>
                                <v-list-item-content>
                                    <v-list-item-title>{{ Category }}</v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item
                                v-for="(j, Project) in Projectlinks[Category]"
                                :key="Project"
                                nuxt
                                :to="Projectlinks[Category][Project].Link"
                                >
                                <v-list-item-title v-text="Projectlinks[Category][Project].SideBarTitle">{{}}</v-list-item-title>
                                <v-list-item-icon>
                                    <v-icon v-text="Projectlinks[Category][Project].SideBarIcon"></v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                        </v-list-group>
                    </v-list-group>
                </v-list>
            </v-col>
        </div>
    </div>
</template>

<script>
import Portfolio from '~/static/Portfolio.json'
    export default {
        props: {

        },
        data() {
            return {
            }
        },
        computed: {
            Projectlinks() {
                const Projectlinks = {}
                for (const project in Portfolio) {
                    if (!(Portfolio[project].Category in Projectlinks)) {
                        Projectlinks[Portfolio[project].Category] = {}
                    }
                    Projectlinks[Portfolio[project].Category][project] = Portfolio[project]
                }
                return Projectlinks
            }
        },
        mounted () {  
        },
    }
</script>

<style lang="scss" scoped>
.v-list .v-list-item--active {
    color: var(--v-anchor-base)
}
.v-list-item__title {
    white-space: normal;
}
</style>