<template>
    <v-card
        v-if="show"
        :id="name"
        class="ma-0 pa-0 pt-1 tooltip"
        raised
        rounded
        outlined
        style="z-index: 10000"
    >
        <v-container
            class="pa-2 pb-4"
            style="max-width: 200px; min-width: 100px"
        >
            <v-row no-gutters>
                <v-col cols="12" style="text-align: center">
                    {{ text }}
                </v-col>
            </v-row>
            <v-row no-gutters class="pt-4" justify="space-around">
                <v-col v-if="steps.length > index + 1" cols="4">
                    <v-btn block color="secondary" small @click="NextStep()">
                        Next
                    </v-btn>
                </v-col>
                <v-col :cols="steps.length > index + 1 ? 4 : 6">
                    <v-btn
                        block
                        color="secondary"
                        small
                        :x-small="steps.length > index + 1 ? false : true"
                        @click="ClearPopper()"
                    >
                        Done
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-card
            id="arrow"
            color="secondary lighten-3"
            raised
            outlined
            data-popper-arrow
        ></v-card>
        <v-progress-linear v-model="value" color="primary"></v-progress-linear>
    </v-card>
</template>

<script>
export default {
    /* eslint-disable camelcase */
    props: {
        steps: {
            type: Array,
            default() {
                // expects data in the form of [{'target': 'x', 'text': 'y'}, {...}, {...}]
                return []
            },
        },
        timetoshow: {
            type: Number,
            default() {
                return 15000
            },
        },
        name: {
            type: String,
            default() {
                return 'default'
            },
        },
    },
    data() {
        return {
            show: false,
            popper: undefined,
            tooltip: undefined,
            index: 0,
            value: 0,
        }
    },
    computed: {
        target() {
            return '#' + `${this.steps[this.index].target}`
        },
        text() {
            return this.steps[this.index].text
        },
    },
    watch: {
        target(newValue, oldValue) {
            this.popper.destroy()
            this.show = false
            const targetquery = document.querySelector(newValue)
            this.show = true
            // eslint-disable-next-line no-undef
            this.popper = Popper.createPopper(targetquery, this.tooltip)
        },
    },
    async mounted() {
        /* eslint-disable no-undef */
        const cookie = await this.getCookie(this.name)
        if (cookie !== 'true') {
            this.show = true
            this.$nextTick(() => {
                this.tooltip = document.querySelector('#' + `${this.name}`)
                const targetquery = document.querySelector(this.target)
                this.popper = Popper.createPopper(targetquery, this.tooltip)
                this.StartInterval()
            })
        }
    },
    methods: {
        NextStep() {
            this.index++
            this.value = 0
            this.StartInterval()
        },
        StartInterval() {
            const vue = this
            const interval = setInterval(() => {
                vue.value = vue.value + 100 / (vue.timetoshow / 100)
                if (vue.value >= 100) {
                    clearInterval(interval)
                    if (vue.steps.length > vue.index + 1) {
                        vue.NextStep()
                    } else {
                        vue.ClearPopper()
                    }
                }
            }, 100)
        },
        ClearPopper() {
            this.popper.destroy()
            this.show = false
            this.$cookies.set(this.name, true, '10D')
        },
        getCookie(cookieName) {
            const reg = new RegExp(
                '^(?:.*;)?\\s*' + cookieName + '\\s*=\\s*([^;]+)(?:.*)?$'
            )
            // eslint-disable-next-line no-sparse-arrays
            // eslint-disable-next-line camelcase
            // eslint-disable-next-line no-sparse-arrays
            const value_or_null = (document.cookie.match(reg) || [, null])[1]
            return value_or_null
        },
    },
}
</script>

<style lang="scss" scoped>
.tooltip {
    font-weight: bold;
    padding: 4px 8px;
    font-size: 13px;
    animation: fadeIn 5s;
    -webkit-animation: fadeIn 5s;
    -moz-animation: fadeIn 5s;
    -o-animation: fadeIn 5s;
    -ms-animation: fadeIn 5s;
}
@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@-moz-keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@-webkit-keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@-o-keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@-ms-keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
#arrow,
#arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
}

#arrow {
    visibility: hidden;
}

#arrow::before {
    visibility: visible;
    content: '';
    transform: rotate(45deg);
}
.tooltip[data-popper-placement^='top'] > #arrow {
    bottom: -4px;
}

.tooltip[data-popper-placement^='bottom'] > #arrow {
    top: -4px;
}

.tooltip[data-popper-placement^='left'] > #arrow {
    right: -4px;
}

.tooltip[data-popper-placement^='right'] > #arrow {
    left: -4px;
}
</style>
