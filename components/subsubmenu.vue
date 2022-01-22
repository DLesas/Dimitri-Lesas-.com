<template>
   <v-menu>
      <template
         #activator="{ on }"
         >
         <v-btn
            color="primary"
            icon
            v-bind="attrs"
            :class="btnclass"
            v-on="on"
            @mouseover.native="btnclass = 'spin'"
            @mouseleave.native="btnclass = ''"
            >
            <v-icon :class="btnclass">{{ icon }}</v-icon>
         </v-btn>
         <v-list-item
            class='d-flex justify-space-between'
            v-if='isSubMenu'
            v-on="on"
            >
            {{ name }}
            <div class="flex-grow-1">
            </div>
            <v-icon>
               mdi-chevron-right
            </v-icon>
         </v-list-item>
         <v-btn
            :color='color'
            @click="openMenu=true"
            text
            v-else
            v-on="on"
            >
            {{ name }}
         </v-btn>
      </template>
   </v-menu>
</template>
<script>
    export default {
        props: {
            menuItems: {type: Array, default() { return [] }},
            color: { type: String, default: "secondary" },
            isOffsetX: { type: Boolean, default: false },
            isOffsetY: { type: Boolean, default: true },
            isOpenOnHover: { type: Boolean, default: false },
            isSubMenu: { type: Boolean, default: false },
            transition: { type: String, default: "scale-transition" }
        },
        data: () => ({
            openMenu: false,
            colormenu: false,
            selectedItem: false,
            menu: false,
            icon: "mdi-cog",
            btnclass: ''
        }),
        methods: {
            emitClickEvent(item) {
                this.$emit("sub-menu-click", item);
                this.openMenu = false;
            },
            changecog() {
              if (this.icon === 'mdi-cog') {
                  this.icon = 'mdi-cog-off'
              }
              else {
                  this.icon = 'mdi-cog'
              }
          }
        }
        
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