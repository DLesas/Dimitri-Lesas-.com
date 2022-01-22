<template>
    <div>
    <v-navigation-drawer
        v-if="['md', 'lg', 'xl'].includes(view)"
        mobile-breakpoint="960" 
        app 
        right
        floating
        width="240"
        clipped
        :style="dark? 'background: #121212' : ''"
    >
        <v-container fluid style="height:100%">
            <v-row no-gutters style="height:100%">
                <v-col cols="12">
                    <v-row class="py-5 pb-2" align="center" justify="space between">
                        <v-col>
                            <v-icon color="primary">
                                mdi-filter
                            </v-icon>
                        </v-col>
                        <v-col>
                            <v-btn rounded @click="SelectUnselect">{{ btn }}</v-btn>
                        </v-col>
                        <v-col>
                            <v-spacer/>
                        </v-col>
                    </v-row>
                    <v-chip-group v-model="filteredskills" class="pt-10" multiple column>    
                        <v-chip
                        v-for="(skill, i) in Skills"
                        :key="i"
                        filter
                        :color="Skillscolors[i]"
                        >
                            {{ skill }}
                        </v-chip>
                    </v-chip-group>
                </v-col>
            </v-row>
        </v-container>
    </v-navigation-drawer>
    <v-bottom-navigation 
        v-else
        app
        :style="dark? 'background: #121212' : ''"
        height="200"
    >
        <v-container class="" fluid style="width:100%; height: 100%">
            <v-row no-gutters style="height: 100%; width: 100%;" justify="space-between">
                <v-row class="pt-2" justify="space-around">
                    <v-col>
                        <v-spacer>

                        </v-spacer>
                    </v-col>
                    <v-col>
                        <v-icon color="primary">
                            mdi-filter
                        </v-icon>
                        <v-btn outlined rounded style="border-radius: 28px;" @click="SelectUnselect">{{ btn }}</v-btn>
                    </v-col>
                    <v-col>
                        <v-spacer>
                        </v-spacer>
                    </v-col>
                </v-row>
                <v-row>
                    <v-chip-group v-model="filteredskills" multiple column>    
                        <v-chip
                        v-for="(skill, i) in Skills"
                        :key="i"
                        filter
                        pill
                        :x-small="view === 'xs' ? true : false"
                        :small="view === 'sm' ? true : false"
                        :color="Skillscolors[i]"
                        >
                            {{ skill }}
                        </v-chip>
                    </v-chip-group>
                </v-row> 
            </v-row>
        </v-container>
    </v-bottom-navigation>
    </div>
</template>

<script>
import Portfolio from '~/static/Portfolio.json'
    export default {
        data() {
            return {
                filteredskills: [0, 1, 2],
                btn: "Unselect all",
                Skillscolors : []
            }
        },
        computed: {
            dark() {
                return this.$vuetify.theme.dark
            },
            view() {
                return this.$vuetify.breakpoint.name
            },
            filteredforskills() {
                const skillsname = []
                for (const num in this.filteredskills) {
                    skillsname.push(this.Skills[this.filteredskills[num]])
                }
                return skillsname
            },
            Skills () {
                const uniqueskills = []
                for (const project in Portfolio) {
                    for (const skill in Portfolio[project].SkillsUsed) {
                        uniqueskills.push(Portfolio[project].SkillsUsed[skill])
                    }
                }
                function onlyUnique(value, index, self) {
                    return self.indexOf(value) === index;
                }
                return uniqueskills.filter(onlyUnique)
            },
            full () {
                const array = []
                for (let index = 0; index < this.Skills.length; index++) {
                    array.push(index)
                }
                return array
            },
            ModuleColors () {
                try {
                    const colorstouse = []
                    const cookie = this.$cookies.get("analogic")
                    const increments = Math.floor(cookie.length / this.Skills.length) - 1
                    for (let index = 0; index < this.Skills.length; index++) {
                        colorstouse.push(cookie[index + (increments * index)])
                    }
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    this.Skillscolors = colorstouse
                    return cookie
                }
                catch(err) {
                    return this.$vuetify.theme.currentTheme.analogic ? this.$vuetify.theme.currentTheme.analogic : undefined
                }
            },
        },
        watch: {
            filteredskills(newValue) {
                if (this.filteredskills === this.full) {
                    this.btn = "Unselect All"
                }
                else {
                    this.btn = "Select All"
                }
            },
            filteredforskills(newValue) {
                this.$emit('update:skills', newValue)
            },
            ModuleColors: {
                handler(newValue) {
                    const colorstouse = []
                    const increments = Math.floor(newValue.length / this.Skills.length) - 1
                    for (let index = 0; index < this.Skills.length; index++) {
                        // colorstouse.push(newValue[Math.floor(Math.random() * newValue.length)])
                        colorstouse.push(newValue[index + (increments * index)])
                    }
                    this.Skillscolors = colorstouse
                }
            },
        },
        mounted () {
            this.filteredskills = this.full
        },
        methods: {
            SelectUnselect() {
                if (this.filteredskills === this.full) {
                    this.filteredskills = []
                    this.btn = "Select All"
                } else {
                    this.filteredskills = this.full
                    this.btn = "Unselect All"
                }
                
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>