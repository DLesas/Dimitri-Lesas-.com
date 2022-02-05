<template>
    <v-container fluid>
        <v-combobox
            ref="inputtags"
            v-model="model"
            :items="items"
            hide-selected
            hint="Maximum of 5 tags. press enter to save"
            label="Tags to search twitter for"
            multiple
            small-chips
            deletable-chips
            item-color="primary"
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
        items: [],
        model: [],
        search: null,
    }),
    watch: {
        model(val) {
            if (val.length > 5) {
                this.$nextTick(() => this.model.pop())
            }
        },
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped></style>
