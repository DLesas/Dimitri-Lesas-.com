<template>
      <v-container>
         <v-row align="center" justify="center">
            <v-col cols="12" md="6">
               <v-card flat style=""> Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia nesciunt nobis, ea nulla doloribus a optio neque quam hic magnam odit vero aliquam sapiente in atque harum voluptatibus blanditiis iure.</v-card>
            </v-col>
            <v-col cols="12" md="6">
               <Datatable :items="customerdata"></Datatable>
            </v-col>
         </v-row>
      </v-container>
</template>

<script>
import Customerdata from '~/static/Data/Customer-Segmentation.json'
    export default {
        data() {
            return {
                selecteditems: [],
                customerdata: Customerdata,
            }
        },
        computed: {
        },
    }
</script>

<style lang="scss" scoped>
</style>