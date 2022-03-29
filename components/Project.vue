<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card
        class="mx-auto" 
      >
        <v-row no-gutters>
            <v-col cols="12">
                <v-img :src="img" height="150">
                </v-img>
            </v-col>
            <v-col cols="12">
                <v-container fluid class="pa-0 ma-0" style="height:100%">
                    <v-row justify="centre" align="centre" no-gutters style="height: 100%;">
                        <v-col cols="12">
                            <v-spacer></v-spacer>
                        </v-col>
                        <v-col cols="12" align-self="center">
                            <v-card-title lang="eng" class="text-subtitle-2" style=" background-color: pruple; word-break: normal; text-align: center; display: block; hyphens: auto;-ms-hyphens: auto; -moz-hyphens: auto; -webkit-hyphens: auto;">
                                {{ project }}
                            </v-card-title>
                        </v-col>
                        <v-col cols="12">
                            <v-spacer></v-spacer>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
        <v-fade-transition>
          <v-overlay
            v-if="hover"
            absolute
            color="primary"
          >
          <v-row align="center" justify="center" style="text-align: center">
              {{ projecttext }}
          </v-row>
            <v-row align="center" justify="center" style="text-align: center">
                <v-col cols="12">
                    <v-btn depressed nuxt :to="link">
                        See more
                    </v-btn>
                </v-col>
            </v-row>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
    export default {
        props: {
            project: {
                type: String,
                default: "Placeholder Project"
            },
            projecttext: {
                type: String,
                default: "Placeholder Project text xd lorem ipsum"
            },
            link: {
                type: String,
                default: ""
            },
            img: {
                type: String,
                default: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
            },
            skills: {
                type: Array,
                default() {
                    return []
                }
            }
        },        
    }
</script>

<style lang="scss" scoped>
</style>