<template>
    <div>
        <v-container fluid class="mb-5 pb-5">
            <v-main class="px-0">
                <v-row justify="space-around" align="center">
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                        order="2"
                        order-md="1"
                        class=""
                    >
                        <v-row>
                            <div class="text-h5">Dimitri Lesas</div>
                        </v-row>
                        <v-row class="py-5">
                            <div class="text-subtitle-1">
                                Full Stack Data Scientist
                            </div>
                        </v-row>
                        <v-row>
                            <div class="text-body-1">
                                I'm a Data Scientist specialising in driving
                                business value by using advanced data analysis
                                and machine learning techniques (both structured
                                and unstructured data) whilst simulataneous
                                being able to create reports and visuals of my
                                findings for the average professional using my
                                front-end skills. Want to see examples of my
                                work? check out
                                <nuxt-link
                                    to="/Portfolio"
                                    style="color: var(--v-primary-base)"
                                >
                                    my portfolio
                                </nuxt-link>
                            </div>
                        </v-row>
                        <v-row class="py-4" justify="space-between">
                            <v-col class="ml-0 pl-0">
                                <v-btn
                                    width="200"
                                    color="primary"
                                    class="mr-2"
                                    @mouseover="portfoliohover = true"
                                    @mouseleave="portfoliohover = false"
                                >
                                    <v-row
                                        align="center"
                                        justify="space-around"
                                    >
                                        <v-icon class="ml-2">
                                            {{
                                                portfoliohover
                                                    ? 'mdi-folder-open'
                                                    : 'mdi-folder'
                                            }}
                                        </v-icon>
                                        <span class="mx-3">
                                            <nuxt-link
                                                to="/Portfolio"
                                                style="
                                                    color: white;
                                                    text-decoration: none;
                                                "
                                                >View Portfolio
                                            </nuxt-link>
                                        </span>
                                    </v-row>
                                </v-btn>
                            </v-col>
                            <v-col class="ml-0 pl-0">
                                <v-btn
                                    dark
                                    width="200"
                                    class=""
                                    @mouseover="resumehover = true"
                                    @mouseleave="resumehover = false"
                                >
                                    <v-row
                                        align="center"
                                        justify="space-around"
                                    >
                                        <v-icon class="ml-2">
                                            {{
                                                resumehover
                                                    ? 'mdi-file-search'
                                                    : 'mdi-file-document'
                                            }}
                                        </v-icon>
                                        <span class="mr-5 pl-2">
                                            <nuxt-link
                                                to="/Resume"
                                                style="
                                                    color: white;
                                                    text-decoration: none;
                                                "
                                                >View Resume
                                            </nuxt-link></span
                                        >
                                    </v-row>
                                </v-btn>
                            </v-col>
                            <v-col cols="0" md="3">
                                <v-spacer></v-spacer>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        order="1"
                        order-sm="2"
                        order-md="2"
                    >
                        <v-img
                            src="/Person/Top Lad.jpg"
                            class="rounded-lg"
                            width="100%"
                        >
                            <div style="background-color: white; width: 17px; height: 10px; position: absolute; right: 47.2%; top: 34.2%; border-radius: 50%; transform: rotate(23deg);">
                                <div style="background-color: black; width: 6px; height:6px; border-radius: 50%; right: 56%; top: 36%; position: absolute"></div>
                            </div>
                            <div style="background-color: white; width: 17px; height: 10px; position: absolute; right: 41.2%; top: 39.2%; border-radius: 50%; transform: rotate(23deg);">
                                <div style="background-color: black; width: 6px; height:6px; border-radius: 50%; right: 56%; top: 36%; position: absolute"></div>
                            </div>
                        </v-img>
                    </v-col>
                </v-row>
            </v-main>
        </v-container>
        <div
            style="overflow: hidden; display: flex; align-items: center"
            class="py-10"
        >
            <span
                v-for="(review, i, index) in Reviews"
                :key="i"
                class="review px-16 mx-16"
            >
                <Reviews
                    :id="'review' + index"
                    :name="review.name"
                    :review="review.review"
                    :color="review.color"
                    :color2="review.color2"
                    :job="review.job"
                    :link="review.link"
                />
            </span>
        </div>
        <v-container fluid class="pl-5 mt-0 pt-0">
            <v-main class="px-8">
                <v-row class="py-10" align="center">
                    <div class="text-h5 pb-8">
                        <span
                            style="
                                background-color: var(--v-primary-base);
                                color: var(--v-primary-base);
                                font-size: 23px;
                            "
                        >
                            |
                        </span>
                        <span class="px-3"> What do I do? </span>
                    </div>
                    <v-row>
                        <v-col cols="12" md="6" class="text-body-1">
                            I have over {{ 3 + years }} years experience as a
                            data specialist building data-driven software for
                            clients of various different industries. Below is a
                            quick overview of my main technical skills and
                            technologies I use. Want to see in depth exactly
                            what my tech stack is with detailed explanations and
                            rationale on each? Then please visit the skill tree
                            diagram in the
                            <nuxt-link
                                to="/Skills"
                                style="color: var(--v-primary-base)"
                                >skills</nuxt-link
                            >
                            page.
                        </v-col>
                    </v-row>
                </v-row>
                <v-row
                    justify="space-around"
                    class="mb-8 pb-16"
                    style="align-items: center"
                >
                    <v-col
                        v-for="(skill, i) in skills"
                        :key="i"
                        cols="12"
                        sm="12"
                        md="6"
                        lg="6"
                        xl="4"
                        class="ml-0 pl-0 my-5"
                    >
                        <v-lazy>
                            <v-card
                                class="mx-0 px-0"
                                hover
                                style="cursor: default"
                                raised
                            >
                                <v-container>
                                    <v-row
                                        justify="space-between"
                                        class="pl-1 pt-3"
                                    >
                                        <v-col cols="5" class="ma-0 pa-0">
                                            <span
                                                v-for="(
                                                    lang, j
                                                ) in skill.Language"
                                                :key="j"
                                            >
                                                <a
                                                    :href="json[lang].link"
                                                    target="_blank"
                                                >
                                                    <v-avatar size="30" rounded>
                                                        <ImgWithTooltip
                                                            :icon="
                                                                json[lang].icon
                                                            "
                                                            :name="
                                                                json[lang].name
                                                            "
                                                            :brief="
                                                                json[lang].brief
                                                            "
                                                        />
                                                    </v-avatar>
                                                </a>
                                            </span>
                                        </v-col>
                                        <v-col
                                            cols="7"
                                            class="ma-0 py-0"
                                            style="
                                                justify-content: end;
                                                display: flex;
                                            "
                                        >
                                            <span
                                                v-for="(mod, x) in skill.Module"
                                                :key="x"
                                            >
                                                <a
                                                    :href="json[mod].link"
                                                    target="_blank"
                                                >
                                                    <v-avatar size="30" rounded>
                                                        <ImgWithTooltip
                                                            :icon="
                                                                json[mod][
                                                                    'icon'
                                                                ]
                                                            "
                                                            :name="
                                                                json[mod][
                                                                    'name'
                                                                ]
                                                            "
                                                            :brief="
                                                                json[mod][
                                                                    'brief'
                                                                ]
                                                            "
                                                        />
                                                    </v-avatar>
                                                </a>
                                            </span>
                                        </v-col>
                                    </v-row>
                                    <v-row class="py-4 pl-1">
                                        <v-card-title class="pa-0 ma-0">
                                            {{ skill.Title }}
                                        </v-card-title>
                                    </v-row>
                                    <v-row class="pl-1">
                                        <v-card-text class="py-0 my-0 pb-5">
                                            {{
                                                skilltext[skill.Title]['Brief']
                                            }}
                                        </v-card-text>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-lazy>
                    </v-col>
                </v-row>
            </v-main>
        </v-container>
    </div>
</template>

<script>
import ImgWithTooltip from '~/components/ImgWithTooltip.vue'
import Reviews from '~/components/Reviews.vue'
import modulesjson from '~/static/languages_modules.json'
import reviews from '~/static/Reviews.json'
import skills from '~/static/Skills.json'
export default {
    components: { ImgWithTooltip, Reviews },
    data() {
        return {
            resumehover: false,
            portfoliohover: false,
            json: modulesjson,
            Reviews: reviews,
            skilltext: skills,
            skills: [
                {
                    Title: 'Data Analysis',
                    Language: ['Python', 'Excel'],
                    Module: ['Numpy', 'Pandas', 'Scikit-Learn'],
                },
                {
                    Title: 'Data Visualisation',
                    Language: ['Python', 'Javascript', 'Power-BI'],
                    Module: ['Matplotlib', 'Seaborn', 'D3'],
                },
                {
                    Title: 'Machine/Deep Learning',
                    Language: ['Python'],
                    Module: [
                        'Scikit-Learn',
                        'OpenCV',
                        'Pytorch',
                        'Tensorflow',
                        'Keras',
                    ],
                },
                {
                    Title: 'Backend Engineering',
                    Language: ['Python', 'PostgreSQL'],
                    Module: ['Django', 'Flask'],
                },
                {
                    Title: 'Frontend Development',
                    Language: ['Javascript', 'Html'],
                    Module: [
                        'Vue',
                        'Nuxt',
                        'Vuetify',
                        'Axios',
                        'GSAP',
                        'ThreeJS',
                    ],
                },
                {
                    Title: 'System/Cloud Engineering',
                    Language: ['AWS', 'Linux', 'Git'],
                    Module: [],
                },
                {
                    Title: 'Automation',
                    Language: ['Python'],
                    Module: ['Selenium', 'Linux', 'Git'],
                },
            ],
        }
    },
    head() {
        return {
            title: 'About',
            meta: [
                {
                    hid: 'About',
                    name: 'About',
                    content:
                        "About page of the full stack developer & Data scientist Dimitri Lesas', who is avaliable for employment / Contract Work / freelance work. Here you can find a quick overview of my skills and experiences.",
                },
            ],
        }
    },
    computed: {
        years() {
            return Math.abs(
                new Date(
                    new Date() - new Date('2021-06-13T00:00:00Z')
                ).getUTCFullYear() - 1970
            )
        },
        dark() {
            return this.$vuetify.theme.dark
        },
    },
    mounted() {
        this.$gsap.set('.review', { x: 300 })
        this.MoveReviewGSAP()
        const count = Object.keys(this.Reviews).length
        for (let step = 0; step < count; step++) {
            const randnum = this.getRandomArbitrary(0, 0)
            // Runs 5 times, with values of step 0 through 4.
            this.$gsap.set('#review' + step, { rotation: randnum })
        }
    },
    methods: {
        MoveReviewGSAP() {
            const gsap = this.$gsap
            gsap.to('.review', { x: -10000, duration: 600 })
        },
        getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min
        },
    },
}
</script>
<style scoped></style>
