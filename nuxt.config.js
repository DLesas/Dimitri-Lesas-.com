import colors from 'vuetify/es5/util/colors'

export default {
    vue: {
        config: {
            silent: true,
        },
    },
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - Dimitri Lesas',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/vueTyper.client.js',
        '~/plugins/amchart.client.js',
        '~/plugins/amcharttheme.client.js',
        '~/plugins/amcharttheme.client.js',
        '~/plugins/Chart.client.js',
        '~/plugins/Vue-pdf.client.js',
        '~/plugins/three.client.js',
        '~/plugins/Simplex.js',
        '~/plugins/Img-Comparison.client.js',
        '~/plugins/Vue-Cookies.client.js',
        '~/plugins/ZoomPlugin.client.js',
        '~/plugins/Regression.js',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: [
        '~/components',
        { path: '~/components/CustomerSegmentation/', prefix: 'Seg' },
        { path: '~/components/Layout/', prefix: 'Lay' },
        { path: '~/components/Layout/Settings', prefix: 'LaySet' },
        { path: '~/components/Layout/Portfolio', prefix: 'LayPort' },
        { path: '~/components/SentimentAnalysis/', prefix: 'Sent' },
        {
            path: '~/components/SentimentAnalysis/Controls/',
            prefix: 'SentCont',
        },
    ],

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
        'nuxt-gsap-module',
    ],

    gsap: {
        extraPlugins: {
            scrollTo: true,
            scrollTrigger: true,
        },
        extraEases: {
            expoScaleEase: true,
        },
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // '@nuxtjs/localtunnel',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        theme: {
            options: { customProperties: true },
            light: true,
            dark: false,
            themes: {
                dark: {
                    primary: colors.lightBlue,
                    secondary: colors.deepOrange,
                    accent: colors.white,
                    strongaccent: colors.blue.lighten5,
                    ripple: colors.indigo.accent4,
                    wave: ['0x0e09dc', '0x1cd1e1', '0x18c02c', '0xee3bcf'],
                    analogic: [
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
                    ],
                    analogic_complement: [
                        '#A79118',
                        '#BEA416',
                        '#9404F7',
                        '#F403FC',
                        '#FD06A8',
                        '#FE0A4E',
                    ],
                },
                light: {
                    primary: colors.lightBlue,
                    secondary: colors.deepOrange,
                    accent: colors.white,
                    strongaccent: colors.blue.lighten5,
                    ripple: colors.indigo.accent4,
                    wave: ['0x0e09dc', '0x1cd1e1', '0x18c02c', '0xee3bcf'],
                    analogic: [
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
                    ],
                    analogic_complement: [
                        '#A79118',
                        '#BEA416',
                        '#9404F7',
                        '#F403FC',
                        '#FD06A8',
                        '#FE0A4E',
                    ],
                },
            },
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extend(config, ctx) {
            config.output.globalObject = 'this'
            config.module.rules.push({
                test: /\.pdf$/,
                loader: 'url-loader',
            })
        },
    },

    pageTransition: {
        name: 'page',
        mode: 'out-in',
        css: false,

        beforeEnter(el) {
            this.$gsap.set(el, {
                opacity: 0,
            })
        },

        enter(el, done) {
            this.$gsap.to(el, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: done,
            })
        },

        leave(el, done) {
            this.$gsap.to(el, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: done,
            })
        },
    },
}
