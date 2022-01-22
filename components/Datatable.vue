<template>
    <div>
        <v-data-table v-model="selected" show-select :items="items" :item-key="itemkey" :headers="headers"></v-data-table>
    </div>
</template>

<script>
    export default {
        props: {
            items: {
                type: Object,
                default () {
                    return {}
                }
            },
            itemkey: {
                type: String,
                default: "ID"
            }
        },
        data() {
            return {
                selected: [],
                headers: []
            }
        },
        watch: {
            selected(newValue) {
                this.$emit("SelectedData", newValue)
            }
        },
        mounted () {
            let count = 0
            for (const header in this.items[0]) {
                if (count === 0) {
                      this.headers.push({align: "start", text: header, value: header}) 
                }
                else {
                    this.headers.push({text: header, value: header})
                }
                count++
            }
        },
    }
</script>

<style lang="scss" scoped>
 ::v-deep th {
  color: var(--v-primary-lighten1) !important;
  background-color: rgba($color: #000000, $alpha: 0.000) !important;
}
 ::v-deep tr:nth-child(even) {
     color: var(--v-primary-lighten3) !important;
     background-color: rgba(0, 0, 0, 0.014);
 }
 ::v-deep td {
    border-bottom: none !important
}
</style>