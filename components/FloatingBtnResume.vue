<template>
    <v-speed-dial
        :value="true"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
        style="position: fixed; height: %"
    >
        <template #activator>
            <v-tooltip top>
                <template #activator="{ on, attrs }">
                    <v-btn
                        fab
                        small
                        color="secondary"
                        v-bind="attrs"
                        :disabled="!(currentpage > 1)"
                        v-on="on"
                        @click="previouspage()"
                    >
                        <v-icon>mdi-arrow-left-bold</v-icon>
                    </v-btn>
                </template>
                <span>Previous page</span>
            </v-tooltip>
            <v-tooltip top>
                <template #activator="{ on, attrs }">
                    <v-btn
                        fab
                        small
                        color="secondary"
                        v-bind="attrs"
                        :disabled="!(currentpage < maxpages)"
                        v-on="on"
                        @click="nextpage()"
                    >
                        <v-icon>mdi-arrow-right-bold</v-icon>
                    </v-btn>
                </template>
                <span>Next page</span>
            </v-tooltip>
            <a href="/Person/Data CV Latest.pdf">
                <v-tooltip top>
                    <template #activator="{ on, attrs }">
                        <v-btn
                            fab
                            dark
                            small
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon>mdi-file-download</v-icon>
                        </v-btn>
                    </template>
                    <span>Download Resume</span>
                </v-tooltip>
            </a>
            <span style="color: rgba(255, 255, 255, 0)">lol</span>
            <v-btn
                :color="fab ? 'red' : 'primary darken-2'"
                dark
                fab
            >
                <span v-if="fab"> {{ currentpage }}/{{ maxpages }} </span>
                <v-icon v-else> mdi-dots-vertical </v-icon>
            </v-btn>
        </template>
    </v-speed-dial>
</template>

<script>
export default {
    props: {
        maxpages: {
            type: Number,
            default: 1,
        },
    },
    data: () => ({
        currentpage: 1,
        direction: 'left',
        fab: true,
        hover: false,
        top: false,
        right: true,
        bottom: true,
        left: false,
        transition: 'scale-transition',
    }),
    watch: {
        currentpage(newValue) {
            this.$emit('pagechange', newValue)
        },
    },
    methods: {
        nextpage() {
            this.currentpage++
        },
        previouspage() {
            this.currentpage = this.currentpage - 1
        },
    },
}
</script>

<style lang="scss" scoped></style>
