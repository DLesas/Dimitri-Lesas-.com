<template>
    <div>
    <LayPortIndexSideBar @update:skills="filteredforskills = $event"/>
    <v-container fluid>
        <v-container v-if="Object.keys(Projectlinks).length === 0">
            <v-row style="height: 80vh" align="center">
                <v-col>
                    <v-img src="Misc/Confused_Travolta.webp"></v-img>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-for="(x, projecttype) in Projectlinks" :key="projecttype" fluid>
            <v-row>
                {{ projecttype }}
            </v-row>
            <v-row class="mx-md-3" align="center">
                <v-col v-for="(i, project) in x" :key="project" class="px-lg-15" cols="12" sm="6" xl="4">
                    <Project :projecttext="i.brief" :skills="i.SkillsUsed" :project="i.SideBarTitle" :img="i.Img" :link="i.Link" class="mx-md-2"></Project>
                </v-col>
            </v-row>
            <v-divider class="my-6"/>
        </v-container>
    </v-container>
    </div>
</template>
<script>
import Portfolio from '~/static/Portfolio.json'
    export default {
        data() {
            return {
                filteredforskills: []
            }
        },
        computed: {      
            Projectlinks() {
                const Projectlinks = {}
                for (const project in Portfolio) {
                    if (Portfolio[project].SkillsUsed.some(r=> this.filteredforskills.includes(r)) ) {
                        if (!(Portfolio[project].Category in Projectlinks)) {
                            Projectlinks[Portfolio[project].Category] = {}
                        }
                        Projectlinks[Portfolio[project].Category][project] = Portfolio[project]
                    }
                }
                return Projectlinks
            },
        },
   }
</script>
<style lang="scss" scoped>
</style>