<template>
    <v-menu
      :close-on-content-click="false"
      :offset-x='true'
      :offset-y='isOffsetY'
      :open-on-hover='isOpenOnHover'
      :transition='transition'
      :value="openMenu"
    >
      <template
        v-slot:activator="{ on }"
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
      <v-list>
        <template
          v-for="(item, index) in menuItems"
        >
          <v-divider
            :key='index'
            v-if='item.isDivider'
          />
          <sub-menu
            :is-offset-x=true
            :is-offset-y=false
            :is-open-on-hover=false
            :is-sub-menu=true
            :key='index'
            :menu-items='item.menu'
            :name='item.name'
            @sub-menu-click='emitClickEvent'
            v-else-if='item.menu'
          />
          <v-list-item
            :key='index'
            @click='emitClickEvent(item)'
            v-else
          >
            <v-list-item-action v-if="item.icon">
              <v-icon>mdi-{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
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