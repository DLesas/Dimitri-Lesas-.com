<template>
    <v-navigation-drawer
            :mobile-breakpoint="960"
            app="false"
            v-if="false"
            ref="drawer"
            v-model="drawer"
            :expand-on-hover="expand"
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed
            floating
            style="align-content: centre"
            class="gradient"
            elevation="0"
            @mouseenter.native="handlehover"
            @mouseleave.native="handlehoveroff"
            >
            <v-container v-if="large" slot="prepend" :class="picclass" class="pt-5">
                <!--- :class="picclass" --->
                <v-row >
                    <v-spacer/>
                    <v-col>
                        <v-avatar color="primary" size="120">
                            <img src="Person/Dimi 3.PNG"/> 
                        </v-avatar>
                    </v-col>
                    <v-spacer/>
                </v-row>
                <v-row>
                    <v-card color="rgba(0,0,0,0)" flat class="text-no-wrap body-1 mx-2 px-2 mt-3">
                        <div style="font-size: 12px; line-height: 150%; font-weight: 440; opacity: 0.8; text-align: center; color: white">
                            Welcome to the internet home of <br> <strong><b>Dimitri Lesas.</b></strong> <br>
                            Full stack data Scientist, Software<br> Engineer and amateur Philosopher. <br>
                            Feel free to look around, check out my <br>
                            portfolio or get in touch. <br>
                        </div>
                    </v-card>
                </v-row>
            </v-container>
            <v-row>
                <v-spacer></v-spacer>
            </v-row>
            <v-row style="align-items: center; height: 70%">
                <v-col>
                    <v-list>
                        <v-list-item
                            v-for="(item, i) in items"
                            :key="i"
                            v-ripple="{ class: `ripple--text` }"
                            :to="item.to"
                            color="white"
                            class="sidebarlinks"
                            active-class="sidebarlinkactive"
                            nuxt
                            exact
                            @mouseover.native="item.icontouse = item.icon2; item.class = item.spin"
                            @mouseleave.native="item.icontouse = item.icon1; item.class = ''"
                            >
                            <v-list-item-action>
                                <v-icon color="inherit" :class="item.class">{{ item.icontouse }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ item.title }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
            <v-row>
                <v-spacer></v-spacer>
            </v-row>
            <div slot="append" style="flex:1; justify-content:space-evenly; align-content: center; white-space: nowrap; margin-bottom:0;" class="ml-5 pl-1 pb-5" :class="picclass">
                <v-btn 
                    v-for="(social, i) in socialmedia"
                    :key="i"
                    v-ripple="{ class: `ripple--text` }"
                    icon
                    :href = social.to
                    target="_blank"
                    class="mx-4"
                    @mouseover.native="social.large = true"
                    @mouseleave.native="social.large = false"
                    >
                    <v-icon
                        color="white"
                        size=32
                        :x-large="social.large"
                        >
                        {{ social.icon }} 
                    </v-icon>
                </v-btn>
            </div>
        </v-navigation-drawer>
</template>

<script>
    export default {
        data () {
           return {
             // eslint-disable-next-line no-undef
             includetopbar: true,
             clipped: false,
             drawer: false,
             fixed: false,
             large: false,
             expand: true,
             hover: false,
             spin: "",
             picclass: "faded",
             items: [
               {
                 icon1: 'mdi-home',
                 icon2: 'mdi-home-search',
                 icontouse: 'mdi-home' ,
                 title: 'Home',
                 to: '/',
                 class: '',
                 spin: 'spin'
               },
               {
                 icon1: 'mdi-dna',
                 icon2: 'mdi-human-greeting-variant',
                 icontouse: 'mdi-dna',
                 title: 'About Me',
                 to: '/About',
                 class: '',
                 spin: 'spin' 
               },
               {
                 icon1: 'mdi-code-braces',
                 icon2: 'mdi-code-json',
                 icontouse:'mdi-code-braces', 
                 title: 'Skills',
                 to: '/Skills',
                 class: '',
                 spin: 'spin'
               },
               {
                 icon1: 'mdi-folder-outline',
                 icon2: 'mdi-folder-open-outline',
                 icontouse: 'mdi-folder-multiple',
                 title: 'Portfolio',
                 to: '/Portfolio',
                 class: '',
                 spin: 'spin'
               },
               {
                 icon1: 'mdi-file-document-outline',
                 icon2: 'mdi-file-search-outline',
                 icontouse: 'mdi-file-document',
                 title: 'Resume / CV',
                 to: '/Resume',
                 class: '',
                 spin: 'spin'
               }
             ],
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
             miniVariant: false,
             right: false,
             rightDrawer: false,
             title: 'Dimitri Lesas'
           }
        },
        computed: {
            viewport() {
                return this.$vuetify.breakpoint.name
           },
        },
        watch: {
            viewport(newValue) {
                if (this.viewport !== "md" && newValue !== "lg" && newValue !== "xl") {
                    this.miniVariant = false
                    this.large = false
                    this.expand = false
                    this.picclass = ""
                    this.drawer = false
                }
                else {
                    this.drawer = true
                    this.large = true
                    this.miniVariant = true
                    this.expand = true
                    this.picclass = "faded"
                }
            },
        },
        mounted () {
            if (this.viewport !== "md" && this.viewport !== "lg" && this.viewport !== "xl") {
                this.miniVariant = false
                this.large = false
                this.expand = false
                this.picclass = ""
                this.drawer = false
            }
            else {
                this.drawer = true
                this.large = true
                this.miniVariant = true
                this.expand = true
                this.picclass = "faded"
            };
        },
        methods:{
            handlehover () {
                this.hover = true
                this.picclass = ""
            },
            handlehoveroff () {
                if (this.large) {
                    this.hover = false
                    this.picclass = "faded"
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
.faded {
    opacity: 0;
    }
    .vertical-container {
    flex:1;
    background-color: blue;
    flex-direction: column;
    justify-content: center;
    }
    .container{
    width: 100%;
    }
    .sidebarlinks{
    font-weight: 400;
    font-size: 15px;
    }
    .sidebarlinkactive{
    font-weight: 400;
    font-size: 15px;
    background-color: rgba(255, 255, 255, 1);
    }
    .centered-container{
    flex: 1;
    width: 100%;
    align-content: center;
    }
    @keyframes spin {
    from {
    transform:rotate(0deg);
    }
    to {
    transform:rotate(360deg);
    }}
    .spin {
    animation-name: spin;
    animation-duration: 200ms;
    animation-iteration-count: 1;
    animation-timing-function: cubic-bezier(.14, .75, .2, 1.01)
    }
    @keyframes spininfinite {
    from {
    transform:rotate(0deg);
    }
    to {
    transform:rotate(360deg);
    }
    }
    .spininfinite {
    animation-name: spininfinite;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(.14, .75, .2, 1.01)
    }
    .theme--light.v-list-item--active::before {
    opacity: 0;
    }
    .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    color: white !important;
    }
    .theme--light.v-icon {
    color: inherit;
    }
    .v-list .v-list-item--active {
    color: var(--v-primary-darken4);
    }
    .gradient
{
    background: linear-gradient(var(--v-primary-base), var(--v-secondary-base));
    background-size: 200% 200%;

    -webkit-animation: Animation 11s cubic-bezier(.32,.7,.63,.17) infinite;
    -moz-animation: Animation 11s cubic-bezier(.32,.7,.63,.17) infinite;
    animation: Animation 11s cubic-bezier(.32,.7,.63,.17) infinite;
}

@-webkit-keyframes Animation {
    0%{background-position:10% 0%}
    50%{background-position:30% 70%}
    100%{background-position:0% 10%}
}
@-moz-keyframes Animation {
    0%{background-position:10% 0%}
    50%{background-position:30% 70%}
    100%{background-position:0% 10%}
}
@keyframes Animation { 
    0%{background-position:10% 0%}
    50%{background-position:30% 70%}
    100%{background-position:0% 10%}
}
</style>