<template>
    <v-container>
        <Datatable :items="data"></Datatable>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            hashtags: '',
            data: {},
            loading: false,
        }
    },
    watch: {
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped></style>
