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
        <div
            :style="
                dark ? 'background-color: #121212' : 'background-color: white'
            "
        >
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
                <v-btn
                    v-else-if="item.btn"
                    :key="index"
                    height="53"
                    text
                    large
                    color="secondary"
                    @click="resetdefaults()"
                >
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
        id: { type: String, default: 'bob' },
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
        },
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
        async resetdefaults() {
            await this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie))
            const primary = '#03A9F4'
            const secondary = '#FF5722'
            const analogic = [
                '#1006EC',
                '#1706ED',
                '#1E06ED',
                '#2506EE',
                '#2C06EF',
                '#3306EF',
                '#3A05F0',
                '#4105F1',
                '#4805F1',
                '#4F05F2',
                '#5605F2',
                '#5E05F3',
                '#6505F4',
                '#6C05F4',
                '#7404F5',
                '#7B04F6',
                '#8304F6',
                '#8A04F7',
                '#9204F7',
                '#9A04F8',
                '#A104F9',
                '#A904F9',
                '#B104FA',
                '#B903FB',
                '#C003FB',
                '#C803FC',
                '#D004FC',
                '#D804FC',
                '#DF04FC',
                '#E705FC',
                '#EE05FC',
                '#F605FD',
                '#FD06FC',
                '#FD06F5',
                '#FD07ED',
                '#FD07E6',
                '#FD07DF',
                '#FD08D8',
                '#FE08D1',
                '#FE09C9',
                '#FE09C2',
                '#FE09BB',
                '#FE0AB4',
                '#FE0AAD',
                '#FE0AA6',
                '#FE0B9F',
                '#FF0B98',
                '#FF0C90',
                '#FF0C89',
                '#FF0C82',
            ]
            const analogiccomplement = [
                '#A79118',
                '#BEA416',
                '#9404F7',
                '#F403FC',
                '#FD06A8',
                '#FE0A4E',
            ]
            const wave = ['0x0e09dc', '0x1cd1e1', '0x18c02c', '0xee3bcf']
            this.$vuetify.theme.currentTheme.primary.base = primary
            this.$vuetify.theme.themes.dark.primary.base = primary
            this.$vuetify.theme.themes.light.primary.base = primary
            this.$cookies.set('primarybase', primary, '30D')
            for (let index = 1; index < 6; index++) {
                const lighten = this.pSBC(0.1 * index, primary)
                const darken = this.pSBC(-0.1 * index, primary)
                this.$vuetify.theme.themes.dark.primary[`lighten${index}`] =
                    lighten
                this.$vuetify.theme.themes.light.primary[`lighten${index}`] =
                    lighten
                this.$vuetify.theme.themes.dark.primary[`darken${index}`] =
                    darken
                this.$vuetify.theme.themes.light.primary[`darken${index}`] =
                    darken
                this.$vuetify.theme.currentTheme.primary[`lighten${index}`] =
                    lighten
                this.$vuetify.theme.currentTheme.primary[`darken${index}`] =
                    darken
                this.$cookies.set(`primaryligten${index}`, lighten, '30D')
                this.$cookies.set(`primarydarken${index}`, darken, '30D')
            }
            this.$vuetify.theme.currentTheme.secondary = {}
            this.$vuetify.theme.currentTheme.secondary.base = secondary
            this.$vuetify.theme.themes.dark.secondary.base = secondary
            this.$vuetify.theme.themes.light.secondary.base = secondary
            this.$cookies.set('secondarybase', secondary, '30D')
            for (let index = 1; index < 6; index++) {
                const lighten = this.pSBC(0.1 * index, secondary)
                const darken = this.pSBC(-0.1 * index, secondary)
                this.$vuetify.theme.themes.dark.secondary[`lighten${index}`] =
                    lighten
                this.$vuetify.theme.themes.light.secondary[`lighten${index}`] =
                    lighten
                this.$vuetify.theme.themes.dark.secondary[`darken${index}`] =
                    darken
                this.$vuetify.theme.themes.light.secondary[`darken${index}`] =
                    darken
                this.$vuetify.theme.currentTheme.secondary[`lighten${index}`] =
                    lighten
                this.$vuetify.theme.currentTheme.secondary[`darken${index}`] =
                    darken
                this.$cookies.set(`secondaryligten${index}`, lighten, '30D')
                this.$cookies.set(`secondarydarken${index}`, darken, '30D')
            }
            this.$vuetify.theme.currentTheme.analogic = analogic
            this.$vuetify.theme.themes.light.analogic = analogic
            this.$vuetify.theme.themes.dark.analogic = analogic
            this.$cookies.set(`analogic`, JSON.stringify(analogic), '30D')
            this.$vuetify.theme.currentTheme.analogic_complement =
                analogiccomplement
            this.$vuetify.theme.themes.light.analogic_complement =
                analogiccomplement
            this.$vuetify.theme.themes.dark.analogic_complement =
                analogiccomplement
            this.$cookies.set(
                `analogic_complement`,
                JSON.stringify(analogiccomplement),
                '30D'
            )
            this.$vuetify.theme.currentTheme.wave = wave
            this.$vuetify.theme.themes.light.wave = wave
            this.$vuetify.theme.themes.dark.wave = wave
            this.$cookies.set(`wave`, JSON.stringify(wave), '30D')
        },
        pSBC(p, c0, c1, l) {
            /* 
                    https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
                    props to Pimp Trizkit
                */

            /* eslint-disable */
            let r,
                g,
                b,
                P,
                f,
                t,
                h,
                i = parseInt,
                m = Math.round,
                a = typeof c1 === 'string'
            if (
                typeof p !== 'number' ||
                p < -1 ||
                p > 1 ||
                typeof c0 !== 'string' ||
                (c0[0] !== 'r' && c0[0] !== '#') ||
                (c1 && !a)
            )
                return null
            if (!this.pSBCr)
                this.pSBCr = (d) => {
                    let n = d.length,
                        x = {}
                    if (n > 9) {
                        ;([r, g, b, a] = d = d.split(',')), (n = d.length)
                        if (n < 3 || n > 4) return null
                        ;(x.r = i(r[3] == 'a' ? r.slice(5) : r.slice(4))),
                            (x.g = i(g)),
                            (x.b = i(b)),
                            (x.a = a ? parseFloat(a) : -1)
                    } else {
                        if (n == 8 || n == 6 || n < 4) return null
                        if (n < 6)
                            d =
                                '#' +
                                d[1] +
                                d[1] +
                                d[2] +
                                d[2] +
                                d[3] +
                                d[3] +
                                (n > 4 ? d[4] + d[4] : '')
                        d = i(d.slice(1), 16)
                        if (n == 9 || n == 5)
                            (x.r = (d >> 24) & 255),
                                (x.g = (d >> 16) & 255),
                                (x.b = (d >> 8) & 255),
                                (x.a = m((d & 255) / 0.255) / 1000)
                        else
                            (x.r = d >> 16),
                                (x.g = (d >> 8) & 255),
                                (x.b = d & 255),
                                (x.a = -1)
                    }
                    return x
                }
            ;(h = c0.length > 9),
                (h = a ? (c1.length > 9 ? true : c1 == 'c' ? !h : false) : h),
                (f = this.pSBCr(c0)),
                (P = p < 0),
                (t =
                    c1 && c1 != 'c'
                        ? this.pSBCr(c1)
                        : P
                        ? { r: 0, g: 0, b: 0, a: -1 }
                        : { r: 255, g: 255, b: 255, a: -1 }),
                (p = P ? p * -1 : p),
                (P = 1 - p)
            if (!f || !t) return null
            if (l)
                (r = m(P * f.r + p * t.r)),
                    (g = m(P * f.g + p * t.g)),
                    (b = m(P * f.b + p * t.b))
            else
                (r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5)),
                    (g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5)),
                    (b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5))
            ;(a = f.a),
                (t = t.a),
                (f = a >= 0 || t >= 0),
                (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0)
            if (h)
                return (
                    'rgb' +
                    (f ? 'a(' : '(') +
                    r +
                    ',' +
                    g +
                    ',' +
                    b +
                    (f ? ',' + m(a * 1000) / 1000 : '') +
                    ')'
                )
            else
                return (
                    '#' +
                    (
                        4294967296 +
                        r * 16777216 +
                        g * 65536 +
                        b * 256 +
                        (f ? m(a * 255) : 0)
                    )
                        .toString(16)
                        .slice(1, f ? undefined : -2)
                )
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
