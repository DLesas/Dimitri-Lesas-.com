<template>
    <v-menu
        v-model="menu"
        close-on-click
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
        offset-y
        @input="changecog()"
        >
        <template #activator="{ on, attrs }">
            <v-btn
                color="primary"
                icon
                v-bind="attrs"
                :class="btnclass"
                v-on="on"
                @mouseover.native="btnclass = 'spin'"
                @mouseleave.native="btnclass = ''"
                >
                <v-icon>{{ icon }}</v-icon>
            </v-btn>
        </template>
        <v-card>
            <div>settings</div>
            <v-tabs right>
                <v-tab>
                    <v-icon left>
                        mdi-account
                    </v-icon>
                    Option 1
                </v-tab>
                <v-tab>
                    <v-icon left>
                        mdi-lock
                    </v-icon>
                    Option 2
                </v-tab>
                <v-tab>
                    <v-icon left>
                        mdi-access-point
                    </v-icon>
                    Option 3
                </v-tab>
                <v-tab-item>
                    <v-card flat>
                        <LaySetColorPicker/>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat height="200" width="200">
                        bob
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat width="200" height="200">
                        bob
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-menu>
</template>
<script>
    export default {
      data: () => ({
          colormenu: false,
          selectedItem: false,
          menu: false,
          icon: "mdi-cog",
          btnclass: ''
      }),
      methods: {
          changecog() {
              if (this.icon === 'mdi-cog') {
                  this.icon = 'mdi-cog-off'
              }
              else {
                  this.icon = 'mdi-cog'
              }
          }
      },
    }
</script>
<style scoped>
    @keyframes spin {
    from {
    transform:rotate(0deg);
    }
    to {
    transform:rotate(360deg);
    }
    }
    .spin {
    animation-name: spin;
    animation-duration: 500ms;
    animation-iteration-count: 1;
    animation-timing-function: cubic-bezier(.14, .75, .2, 1.01)
    }
</style>