<template>
    <v-tooltip top eager offset-overflow max-width="250">
      <template #activator="{ on, attrs }">
        <img :src="icon" v-bind="attrs" :alt="name + ': ' + brief" v-on="on">
      </template>
      <v-container>
        <div style="text-align: center;"> <h2> {{ name }} </h2><br> {{ brief }} <br><br>  click to find out more </div>
      </v-container>
    </v-tooltip>
</template>
<script>
    export default {
        props: {
            // eslint-disable-next-line vue/prop-name-casing
            icon: {
                type: String,
                default: "Bob"
            },
            // eslint-disable-next-line vue/prop-name-casing
            name: {
                type: String,
                default: "Bob"
            },
            // eslint-disable-next-line vue/prop-name-casing
            brief : {
                type: String,
                default: "Bob"
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>