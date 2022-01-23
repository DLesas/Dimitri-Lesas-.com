import colors from 'vuetify/es5/util/colors'

export default {
  vue: {
    config: {
      silent: true
    }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Dimitri',
    title: 'Dimitri Lesas',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vueTyper.client.js',
    '~/plugins/amchart.client.js',
    '~/plugins/plotly.client.js',
    '~/plugins/Vue-pdf.client.js',
    '~/plugins/three.client.js',
    '~/plugins/Simplex.js',
    '~/plugins/Img-Comparison.client.js',
    '~/plugins/Vue-Cookies.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    { path: '~/components/CustomerSegmentation/', prefix: 'Seg' },
    { path: '~/components/Layout/', prefix: 'Lay' },
    { path: '~/components/Layout/Settings', prefix: 'LaySet' },
    { path: '~/components/Layout/Portfolio', prefix: 'LayPort' }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'nuxt-gsap-module'

  ],

  gsap: {
    extraPlugins: {
      scrollTo: true,
      scrollTrigger: true
    },
    extraEases: {
      expoScaleEase: true
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // '@nuxtjs/localtunnel'
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
            secondary : colors.deepOrange,
            accent: colors.white,
            strongaccent: colors.blue.lighten5,
            ripple: colors.indigo.accent4,
            wave: [0x0E09DC, 0x1CD1E1, 0x18C02C, 0xee3bcf]
        },
        light: {
            primary: colors.lightBlue,
            secondary : colors.deepOrange,
            accent: colors.white,
            strongaccent: colors.blue.lighten5,
            ripple: colors.indigo.accent4,
            wave: [0x0E09DC, 0x1CD1E1, 0x18C02C, 0xee3bcf]
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.output.globalObject = 'this'
      config.module.rules.push(
        {
          test: /\.pdf$/,
          loader: 'url-loader'
        }
      )
    }
  },

  pageTransition: {
    name: 'page',
    mode: 'out-in',
    css: false,

    beforeEnter(el) {
      this.$gsap.set(el, {
        opacity: 0
      })
    },

    enter(el, done) {
      this.$gsap.to(el, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: done
      })
    },

    leave(el, done) {
      this.$gsap.to(el, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: done
      })
    }
  }
}
