<template>
    <v-menu
        id="mainmenu"
        :close-on-content-click="false"
        :offset-x="isOffsetX"
        :offset-y="isOffsetY"
        :open-on-hover="isOpenOnHover"
        :transition="transition"
        :value="openMenu"
        left
        offset-overflow
        background-color="primary"
    >
        <template #activator="{ on }">
            <v-list-item
                v-if="isSubMenu"
                class="d-flex justify-space-between"
                v-on="on"
                @click="btnclass = 'spin'"
                @mouseleave.native="btnclass = ''"
            >
                {{ name }}
                <div class="flex-grow-1"></div>
                <v-list-item-icon>
                    <v-icon color="primary" :class="btnclass">
                        {{ icon }}
                    </v-icon>
                </v-list-item-icon>
            </v-list-item>
            <v-btn
                v-else
                color="primary"
                icon
                :class="btnclass"
                v-on="on"
                @click="
                    openMenu = true
                    btnclass = 'spin'
                "
                @mouseleave.native="btnclass = ''"
            >
                <v-icon :class="btnclass">{{ icon }}</v-icon>
            </v-btn>
        </template>
        <div :style="dark? 'background-color: #121212' : 'background-color: white'">
            <template
                v-for="(item, index) in menuItems"
                style="transform: translateX(-50px)"
            >
                <v-divider v-if="item.isDivider" :key="index" />
                <sub-menu
                    v-else-if="item.menu"
                    id="submenu"
                    :key="index"
                    :is-offset-x="true"
                    :is-offset-y="false"
                    :is-open-on-hover="false"
                    :is-sub-menu="true"
                    :menu-items="item.menu"
                    :name="item.name"
                    :iconon="item.iconon"
                    :iconoff="item.iconoff"
                ></sub-menu>
                <!---LaySetColorPicker
                    v-else-if="item.appearance"
                    :key="index"
                /--->
                <LaySetDayNightSwitch
                    v-else-if="item.lightmode"
                    :key="index"
                    class="pl-5"
                />
                <LaySetColorPicker
                    v-else-if="item.colorpicker"
                    :key="index"
                    class="pl-5"
                />
                <v-btn v-else-if="item.btn" :key="index" height="51" large color="primary">
                    {{ item.name }}
                </v-btn>
                <v-list-item
                    v-else
                    :key="index"
                    :disabled="item.placeholder"
                    @click="emitClickEvent(item)"
                >
                    <v-list-item-title>
                        <del v-if="item.placeholder"> {{ item.name }} </del>
                        <span v-else> {{ item.name }} </span>
                    </v-list-item-title>
                    <v-list-item-icon v-if="item.icon">
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </template>
        </div>
    </v-menu>
</template>
<script>
export default {
    props: {
        menuItems: {
            type: Array,
            default() {
                return []
            },
        },
        color: { type: String, default: 'secondary' },
        isOffsetX: { type: Boolean, default: false },
        isOffsetY: { type: Boolean, default: true },
        isOpenOnHover: { type: Boolean, default: false },
        isSubMenu: { type: Boolean, default: false },
        transition: { type: String, default: 'scale-transition' },
        iconon: { type: String, default: 'mdi-cog' },
        iconoff: { type: String, default: 'mdi-cog-off' },
        parent: { type: Boolean, default: false },
        name: { type: String, default: 'bob' },
    },
    data: () => ({
        openMenu: false,
        colormenu: false,
        selectedItem: false,
        menu: false,
        icon: '',
        btnclass: '',
        width: false,
    }),
    computed: {
        dark() {
            return this.$vuetify.theme.dark
        }
    },
    watch: {},
    mounted() {
        this.icon = this.iconon
    },
    methods: {
        emitClickEvent(item) {
            this.$emit('sub-menu-click', item)
            this.openMenu = false
        },
        changecog() {
            if (this.icon === this.iconon) {
                this.icon = this.iconoff
            } else {
                this.icon = this.iconon
            }
        },
    },
}
</script>
<style scoped>
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.spin {
    animation-name: spin;
    animation-duration: 500ms;
    animation-iteration-count: 1;
    animation-timing-function: cubic-bezier(0.14, 0.75, 0.2, 1.01);
}
</style>
