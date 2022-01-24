/* eslint-disable one-var */
<template>
    <v-color-picker
        v-model="color"
        hide-canvas
        hide-inputs
        mode="hex"
        :style="dark ? 'background-color: #121212' : 'background-color: white'"
        @update:color="updatecolor(color)"
    >
    </v-color-picker>
</template>

<script>
export default {
    data() {
        return {
            color: 0,
            count: 0,
        }
    },
    computed: {
        dark() {
            return this.$vuetify.theme.dark
        },
    },
    methods: {
        updatecolor(color) {
            if (this.count !== 0) {
                this.$vuetify.theme.currentTheme.primary.base = color.hex
                this.$vuetify.theme.themes.dark.primary.base = color.hex
                this.$vuetify.theme.themes.light.primary.base = color.hex
                this.$cookies.set('primarybase', color.hex, '30D')
                for (let index = 1; index < 6; index++) {
                    const lighten = this.pSBC(0.1 * index, color.hex)
                    const darken = this.pSBC(-0.1 * index, color.hex)
                    this.$vuetify.theme.themes.dark.primary[`lighten${index}`] =
                        lighten
                    this.$vuetify.theme.themes.light.primary[
                        `lighten${index}`
                    ] = lighten
                    this.$vuetify.theme.themes.dark.primary[`darken${index}`] =
                        darken
                    this.$vuetify.theme.themes.light.primary[`darken${index}`] =
                        darken
                    this.$vuetify.theme.currentTheme.primary[
                        `lighten${index}`
                    ] = lighten
                    this.$vuetify.theme.currentTheme.primary[`darken${index}`] =
                        darken
                    this.$cookies.set(`primaryligten${index}`, lighten, '30D')
                    this.$cookies.set(`primarydarken${index}`, darken, '30D')
                }
                this.$axios
                    .$get(
                        `https://www.thecolorapi.com/scheme?hex=${color.hex.replace(
                            '#',
                            ''
                        )}&mode=complement&count=2`
                    )
                    .then((res) => {
                        this.$vuetify.theme.currentTheme.secondary = {}
                        this.$vuetify.theme.currentTheme.secondary.base =
                            res.colors[0].hex.value
                        this.$vuetify.theme.themes.dark.secondary.base =
                            res.colors[0].hex.value
                        this.$vuetify.theme.themes.light.secondary.base =
                            res.colors[0].hex.value
                        this.$cookies.set(
                            'secondarybase',
                            res.colors[0].hex.value,
                            '30D'
                        )
                        for (let index = 1; index < 6; index++) {
                            const lighten = this.pSBC(
                                0.1 * index,
                                res.colors[0].hex.value
                            )
                            const darken = this.pSBC(
                                -0.1 * index,
                                res.colors[0].hex.value
                            )
                            this.$vuetify.theme.themes.dark.secondary[
                                `lighten${index}`
                            ] = lighten
                            this.$vuetify.theme.themes.light.secondary[
                                `lighten${index}`
                            ] = lighten
                            this.$vuetify.theme.themes.dark.secondary[
                                `darken${index}`
                            ] = darken
                            this.$vuetify.theme.themes.light.secondary[
                                `darken${index}`
                            ] = darken
                            this.$vuetify.theme.currentTheme.secondary[
                                `lighten${index}`
                            ] = lighten
                            this.$vuetify.theme.currentTheme.secondary[
                                `darken${index}`
                            ] = darken
                            this.$cookies.set(
                                `secondaryligten${index}`,
                                lighten,
                                '30D'
                            )
                            this.$cookies.set(
                                `secondarydarken${index}`,
                                darken,
                                '30D'
                            )
                        }
                    })
                const analogic = []
                this.$axios
                    .$get(
                        `https://www.thecolorapi.com/scheme?hex=${color.hex.replace(
                            '#',
                            ''
                        )}&mode=analogic&count=50`
                    )
                    .then((res) => {
                        for (color in res.colors) {
                            analogic.push(res.colors[color].hex.value)
                        }
                        this.$vuetify.theme.currentTheme.analogic = analogic
                        this.$vuetify.theme.themes.light.analogic = analogic
                        this.$vuetify.theme.themes.dark.analogic = analogic
                        this.$cookies.set(
                            `analogic`,
                            JSON.stringify(analogic),
                            '30D'
                        )
                    })
                const analogiccomplement = []
                this.$axios
                    .$get(
                        `https://www.thecolorapi.com/scheme?hex=${color.hex.replace(
                            '#',
                            ''
                        )}&mode=analogic-complement&count=6`
                    )
                    .then((res) => {
                        for (color in res.colors) {
                            analogiccomplement.push(res.colors[color].hex.value)
                        }
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
                    })
                const quad = []
                this.$axios
                    .$get(
                        `https://www.thecolorapi.com/scheme?hex=${color.hex.replace(
                            '#',
                            ''
                        )}&mode=quad&count=4`
                    )
                    .then((res) => {
                        for (color in res.colors) {
                            quad.push('0x' + res.colors[color].hex.clean)
                        }
                        this.$vuetify.theme.currentTheme.wave = quad
                        this.$vuetify.theme.themes.light.wave = quad
                        this.$vuetify.theme.themes.dark.wave = quad
                        this.$cookies.set(`wave`, JSON.stringify(quad), '30D')
                    })
            }
            this.count++
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

<style lang="scss" scoped></style>
