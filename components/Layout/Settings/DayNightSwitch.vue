<template>
    <div class="px-0 mx-0">
        <v-switch
            class="pt-6"
            inset
            v-model="dark"
        >
        </v-switch>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dark: false
            }
        },
        watch: {
            dark(newValue) {
                newValue? this.darkmode() : this.lightmode()
            }
        },
        mounted () {
            setTimeout(() => { this.dark = this.$vuetify.theme.dark }, 50);
        },
        methods: {
            darkmode() {
                this.$vuetify.theme.dark = true
            },
            lightmode() {
                this.$vuetify.theme.dark = false
            }
        },
        
    }
</script>

<style lang="scss" scoped>


</style>