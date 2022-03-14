<!-- eslint-disable -->
<template>
    <v-container fluid>
        <v-combobox
            ref="inputtags"
            v-model="model"
            :items="items"
            hide-selected
            hint="Maximum of 5 tags/Words, press enter to save tag/Word."
            label="Tags/Words to search twitter for"
            multiple
            small-chips
            deletable-chips
            :search-input="search"
        >
            <div slot="append">
            </div>
        </v-combobox>
    </v-container>
</template>
<script>

export default {
    data: () => ({
        model: [],
        items: [],
        search: null,
    }),
    watch: {
        model(val) {
            if (val.length > 5) {
                // eslint-disable-next-line vue/no-mutating-props
                this.$nextTick(() => this.model.pop())
            }
            this.$emit('DataChanged', this.model)
        },
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
.v-select ::v-deep .v-chip {
    background-color: var(--v-primary-darken5) !important;
}
::v-deep .v-messages__message {
    text-align: center !important
}
</style>
