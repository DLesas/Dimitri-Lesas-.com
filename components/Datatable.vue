<template>
    <div>
        <v-data-table
            v-model="selected"
            :items="itemsready"
            :item-key="itemkey"
            :headers="headers"
            fixed-header
            :items-per-page="5"
            multi-sort
        ></v-data-table>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Object,
            default() {
                return {}
            },
        },
        itemkey: {
            type: String,
            default: 'ID',
        },
        toexclude: {
            type: Array,
            default() {
                return []
            }
        },
        
    },
    data() {
        return {
            selected: [],
            headers: [],
            itemsready: undefined,
        }
    },
    watch: {
        selected(newValue) {
            this.$emit('SelectedData', newValue)
        },
        items(newValue) {
            this.headers = []
            this.GetDataReady()
        },
    },
    mounted() {},
    methods: {
        GetDataReady() {
            let count = 0
            for (const header in this.items[0]) {
                if (count === 0) {
                    this.headers.push({
                        align: 'start',
                        text: header,
                        value: header,
                    })
                } else if (!(this.toexclude.includes(header))) {
                    this.headers.push({ text: header, value: header })
                }
                count++
            }
            setTimeout(() => {
                this.itemsready = this.items
            }, 50)
        },
    },
}
</script>

<style lang="scss" scoped>
::v-deep th {
    color: var(--v-primary-lighten1) !important;
    background-color: rgba($color: #000000, $alpha: 0) !important;
}
::v-deep tr:nth-child(even) {
    color: var(--v-primary-lighten3) !important;
    background-color: rgba(0, 0, 0, 0.014);
}
::v-deep td {
    border-bottom: none !important;
}
</style>
