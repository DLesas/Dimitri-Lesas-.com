<template>
    <div>
        <v-navigation-drawer
        v-if="['md', 'lg', 'xl'].includes(view)"
        mobile-breakpoint="960"
        app
        right 
        floating
        clipped
        :style="dark? 'background: #121212' : ''"
        >
            <v-container fluid fill-height style="align-items: start;">
                <v-row>
                    <v-spacer></v-spacer>
                </v-row>
                <v-row align="center" justify="center" no-gutters>
                    <v-col cols="12">
                        <v-spacer/>
                        <v-switch v-model="skillsprim" color="primary" ripple inset :label="skillsprim ? 'Use Skills as Primary Category' : 'Use Languages as Primary Category'"> </v-switch>
                        <v-spacer/>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-card flat style="width: 100%" :style="dark? 'background: #121212' : ''">
                            <v-card-title class="subtitle-1">
                                <div class="pb-3">
                                    <v-img contain :src="selectedicon" :alt="alt" width="200" height="220">
                                    </v-img>
                                </div>
                                <span :style="selectedtextcolor" class="pb-3">
                                    {{ selectedskill }}
                                </span>
                                <v-progress-linear rounded  height="13" :value="selectedvalue" :color="selectedcolor">
                                    <template #default>
                                        <span style="color: white; font-size: 12px;"><strong>{{ selectedlevel }}</strong></span>
                                    </template>
                                </v-progress-linear>
                            </v-card-title>
                            <v-card-text>
                                {{ selectedskilltext }}
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                </v-row>
            </v-container>
        </v-navigation-drawer>
        <v-container fluid> 
            <v-row v-if="['xs', 'sm'].includes(view)">
                <v-col cols="4">
                    <v-img style="margin-left: auto; margin-right: auto;" contain :src="selectedicon" :height="heightofimg + 30" :max-width="heightofimg" :alt="'Image portraying ' + selectedicon.split('/')[1]">
                        <template #placeholder>
                            <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                            >
                                <v-progress-circular
                                indeterminate
                                color="primary"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-col>
                <v-col ref="textcontainer" cols="8">
                    <v-row align="center">
                        <v-col cols="4">
                            <span :style="selectedtextcolor" class="pb-3">
                                {{ selectedskill }}
                            </span>
                        </v-col>
                        <v-col cols="8">
                            <v-progress-linear rounded  height="10" :value="selectedvalue" :color="selectedcolor">
                                <template #default>
                                    <span style="color: white; font-size: 12px;"><strong>{{ selectedlevel }}</strong></span>
                                </template>
                            </v-progress-linear>
                        </v-col>
                    </v-row>
                    <v-row ref="textcontent" no-gutters>
                        <v-card-text>
                            {{ selectedskilltext }}
                        </v-card-text>
                    </v-row>
                </v-col>
            </v-row>
            <v-row no-gutters class="">
                <v-col cols="12">
                    <network-tree ref="skilltree" :networkdata="skillsprim ? NetworkdataLanguage : NetworkdataSkills" :color="color" @HoverOnNode="ChangeSelected"/>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import NetworkTree from '~/components/NetworkTree.vue'
import modulesjson from '~/static/languages_modules.json'
import skills from '~/static/Skills.json'
    export default {
  components: { NetworkTree },
        data() {
            return {
                color: 6,
                mounted: false,
                heightofimg: 100,
                selectedskill: ['xs', 'sm', 'md'].includes(this.$vuetify.breakpoint.name) ? "Drag a node" : "Hover over a Node",
                selectedskilltext: ['xs', 'sm', 'md'].includes(this.$vuetify.breakpoint.name) ? "Drag a node to see more information regarding skill" : "Drag/Hover over a node to see more information regarding skill/language",
                selectedicon: this.$vuetify.theme.dark ? "Languages & Frameworks/default_dark.gif" : "Languages & Frameworks/default.gif",
                alt: 'Image portraying default hovering icon, pre seeing my prograaming and data science skills',
                selectedtextcolor: "primary",
                selectedcolor: "primary",
                selectedvalue: 0,
                selectedlevel: "",
                skillsprim: false,
                chosen: "Python",
                Langs: ['Python', 'Javascript', 'Misc'],
                packages: modulesjson,
                skils: skills,
                NetworkdataSkills: {
                    name : "Tech Stack",
                    value: 0,
                    children: [
                    {
                        name: "Data Analysis",
                        value: 3,
                        children: [
                            {
                                name: "Python",
                                value: 2,
                                children: [
                                    {
                                        name: "Numpy",
                                        value: 1
                                    },
                                    {
                                        name: "Pandas",
                                        value: 1
                                    },
                                    {
                                        name: "Scikit-Learn",
                                        value: 1
                                    }
                                ]
                            },
                            {
                                name: "Excel",
                                value: 2
                            }
                        ]
                    },
                    {
                        name: "Data Visualisation",
                        value: 3,
                        children: [
                            {
                                name: "Python",
                                value: 2,
                                children : [
                                    {
                                        name: "Matplotlib",
                                        value: 1
                                    },
                                    {
                                        name: "Seaborn",
                                        value: 1
                                    }
                                ]
                            },
                            {
                                name: "Javascript",
                                value: 2,
                                children: [
                                    {
                                        name: "D3",
                                        value: 1
                                    },
                                    {
                                        name: "Plotly",
                                        value: 1
                                    },
                                    {
                                        name: "amCharts",
                                        value: 1
                                    }
                                ]
                            },
                            {
                                name: "Power-BI",
                                value: 2
                            }
                        ]
                    },
                    {
                        name: "Machine/Deep Learning",
                        value: 3,
                        children: [
                            {
                                name: "Python",
                                value: 2,
                                children: [
                                    {
                                        name: "Scikit-Learn",
                                        value: 1
                                    },
                                    {
                                        name: "OpenCV",
                                        value: 1
                                    },
                                    {
                                        name: "Pytorch",
                                        value: 1
                                    },
                                    {
                                        name: "Tensorflow",
                                        value: 1
                                    },
                                    {
                                        name: "Keras",
                                        value: 1
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: "Backend Engineering",
                        value: 3,
                        children: [
                            {
                                name: "Python",
                                value: 2,
                                children: [
                                    {
                                        name: "Django",
                                        value: 1
                                    },
                                    {
                                        name: "Flask",
                                        value: 1
                                    }
                                ]
                            },
                            {
                                name: "Javascript",
                                value: 2,
                                children: [
                                    {
                                        name: "NodeJS",
                                        value: 1
                                    }
                                ]
                            },
                            {
                                name: "PostgreSQL",
                                value: 2
                            }
                        ]
                    },
                    {
                        name: "Frontend Development",
                        value: 3,
                        children: [
                            {
                                name: "Javascript",
                                value: 2,
                                children: [
                                    {
                                        name : "Vue",
                                        value : 1,
                                    },
                                    {
                                        name : "Nuxt",
                                        value : 1
                                    },
                                    {
                                        name: "Vuetify",
                                        value : 1
                                    },
                                    {
                                        name: "Axios",
                                        value: 1
                                    },
                                    {
                                        name: "GSAP",
                                        value: 1
                                    },
                                    {
                                        name: "ThreeJS",
                                        value: 1
                                    }
                                ]
                            },
                            {
                                name: "Html",
                                value: 2
                            }
                        ]
                    },
                    {
                        name: "System/Cloud Engineering",
                        value: 3,
                        children: [
                            {
                                name: "AWS",
                                value: 2
                            },
                            {
                                name: "Linux",
                                value: 2
                            },
                            {
                                name: "Git",
                                value: 2
                            }
                        ]
                    },
                    {
                        name: "Automation",
                        value: 3,
                        children: [
                            {
                                name: "Python",
                                value: 2,
                                children: [
                                    {
                                        name: "Selenium",
                                        value: 1
                                    }
                                ]
                            }
                        ]
                    }
                    ]
                },
                NetworkdataLanguage : {
                    name : "Tech Stack",
                    value: 0,
                    children: [
                    {
                        name: "Python",
                        value: 3,
                        children: [
                            {
                                name: "Data Analysis",
                                value: 2,
                                children: [
                                    {
                                        name: "Numpy",
                                        value: 1
                                    },
                                    {
                                        name: "Pandas",
                                        value: 1
                                    },
                                    {
                                        name: "Scikit-Learn",
                                        value: 1
                                    }
                                ]
                            },
                            {
                                name: "Data Visualisation",
                                value: 2,
                                children: [
                                    {
                                        name: "Matplotlib",
                                        value: 1
                                    },
                                    {
                                        name: "Seaborn",
                                        value: 1
                                    }
                                ]
                            },
                            {
                                name: "Machine/Deep Learning",
                                value: 2,
                                children: [
                                    {
                                        name: "Scikit-Learn",
                                        value: 1
                                    },
                                    {
                                        name: "OpenCV",
                                        value: 1
                                    },
                                    {
                                        name: "Pytorch",
                                        value: 1
                                    },
                                    {
                                        name: "Tensorflow",
                                        value: 1
                                    },
                                    {
                                        name: "Keras",
                                        value: 1
                                    }
                                ]
                            },
                            {
                                name: "Backend Engineering",
                                value: 2,
                                children: [
                                    {
                                        name: "Django",
                                        value: 1
                                    },
                                    {
                                        name: "Flask",
                                        value: 1
                                    },
                                ]
                            },
                            {
                                name: "Automation",
                                value: 2,
                                children: [
                                    {
                                        name: "Selenium",
                                        value: 1
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: "Javascript",
                        value: 3,
                        children: [
                            {
                                name: "Frontend Development",
                                value: 2,
                                children : [
                                    {
                                        name : "Vue",
                                        value : 1,
                                    },
                                    {
                                        name : "Nuxt",
                                        value : 1
                                    },
                                    {
                                        name: "Vuetify",
                                        value : 1
                                    },
                                    {
                                        name: "Axios",
                                        value: 1
                                    },
                                    {
                                        name: "GSAP",
                                        value: 1
                                    },
                                    {
                                        name: "ThreeJS",
                                        value: 1
                                    }
                                ]
                            },
                            {
                                name: "Data Visualisation",
                                value: 2,
                                children: [
                                    {
                                        name: "D3",
                                        value: 1
                                    },
                                    {
                                        name: "Plotly",
                                        value: 1
                                    },
                                    {
                                        name: "amCharts",
                                        value: 1
                                    }
                                ] 
                            }
                        ]
                    },
                    {
                        name: "AWS",
                        value: 2
                    },
                    {
                        name: "Html",
                        value: 2
                    },
                    {
                        name: "Linux",
                        value : 2
                    },
                    {
                        name : "Power-BI",
                        value : 2
                    },
                    {
                        name : "Excel",
                         value : 2
                    },
                    {
                        name : "PostgreSQL",
                        value : 2
                    },
                    {
                        name : "Git",
                        value : 2
                    }]
                }
            }
        },
        computed: {
            dark() {
                return this.$vuetify.theme.dark
            },
            view() {
                return this.$vuetify.breakpoint.name
            }
        },
        watch: {
            selectedskill(newValue) {
                this.GetSelectedSkill(newValue)
            },
            selectedvalue(newValue) {
                this.GetSelectedValue(newValue)
            },
            dark(newValue) {
                if (this.selectedskill === "Drag a node" || this.selectedskill === "Hover over a Node") {
                    this.selectedicon = newValue ? "Languages & Frameworks/default_dark.gif" : "Languages & Frameworks/default.gif"
                } else {
                    this.GetSelectedSkill(this.selectedskill)
                }
            }
        },
        mounted () {
            setTimeout(() => {  
                this.view = this.$vuetify.breakpoint.name 
            }, 200);
            // if (['xs', 'sm', 'md'].includes(this.view)) {
            //    this.selectedskilltext = "Click a Node to see more information regarding skill/language"
            //    this.selectedskill = "click a Node"
            // }
        },
        destroyed () {
        },
        methods: {
            Select(lang) {
                this.$gsap.to('#'+lang, {scale: 5, duration:0.4, ease: 'Linear.easeNone'})
            },
            ChangeSelected(name, color) {
                this.selectedskill = name
                this.selectedtextcolor = "color: rgb("+color[0]+","+color[1]+","+color[2]+");"
                this.selectedcolor = "rgb("+color[0]+","+color[1]+","+color[2]+")"
                if (['xs', 'sm'].includes(this.view)) {
                    setTimeout(() => {  
                        this.$refs.skilltree.resize(); 
                    }, 200);
                    setTimeout(() => { 
                        this.heightofimg = this.$refs.textcontent.getBoundingClientRect().bottom - this.$refs.textcontainer.getBoundingClientRect().top
                    }, 20)
                }
            },
            GetSelectedSkill(Skill) {
                if (this.packages[Skill]) {
                    this.selectedskilltext = this.packages[Skill].brief
                    this.selectedicon = this.dark && Object.prototype.hasOwnProperty.call(this.packages[Skill], "dark") ?  this.packages[Skill].dark : this.packages[Skill].icon
                    this.selectedvalue = this.packages[Skill].value
                }
                else if (this.skils[Skill]) {
                    this.selectedskilltext = this.skils[Skill].Brief
                    this.selectedicon = this.dark && Object.prototype.hasOwnProperty.call(this.skils[Skill], "dark") ?  this.skils[Skill].dark : this.skils[Skill].icon
                    this.selectedvalue = this.skils[Skill].value
                }
                else {
                    this.selectedskilltext = "not present"
                    this.selectedicon = undefined
                }
                this.alt = `Image portraying ${this.selectedicon.split("/")[1]}`
                
            },
            GetSelectedValue (Skill) {
                if (Skill <= 35) {
                    this.selectedlevel = "Beginner"
                }
                else if (Skill > 35 && Skill <= 50) {
                    this.selectedlevel = "Elementary"
                }
                else if (Skill > 50 && Skill <= 75) {
                    this.selectedlevel = "Intermediate"
                }
                else {
                    this.selectedlevel = "Master"
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.centre {
  position: absolute;
  left: 50%;
  top: 43%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  align-content: center;
}
</style>