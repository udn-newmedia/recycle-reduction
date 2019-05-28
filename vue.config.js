// --------------------------------------------------
// require modules
// --------------------------------------------------
const pkg = require('./package.json')
const path = require('path').posix
const exec = require('child_process').execSync
const BannderPlugin = require('webpack/lib/BannerPlugin.js')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')

// --------------------------------------------------
// Basic configuration
// --------------------------------------------------
const publicPath = './'
const filenameHashing = false
const runtimeCompiler = false
const disableHtmlMinify = true

// --------------------------------------------------
// Build destinations by types
// --------------------------------------------------
const dest = {
  script: 'js',
  style: 'css',
  image: 'images',
  media: 'media',
  font: 'fonts'
}

// --------------------------------------------------
// SASS auto injection data
// --------------------------------------------------
const sassInjectionData = `
  @import "@/assets/styles/settings/variables.scss";
  @import "@/assets/styles/settings/mixins.scss";
`

// --------------------------------------------------
// Prerender routes
// --------------------------------------------------
// const prerenderRoutes = []

// --------------------------------------------------
// Webpack DevServer
// --------------------------------------------------
const devServer = {
  historyApiFallback: false,
  disableHostCheck: false,
  allowedHosts: [ '.ngrok.io' ],
  proxy: {
    // e.g. proxy github api
    // from: https://api.github.com/repos/f2etw/jobs/issues
    // to: /api-github/repos/f2etw/jobs/issues
    '/api-github/': {
      target: 'https://api.github.com',
      changeOrigin: true,
      pathRewrite: { '^/api-github/': '' }
    }
  }
}

// --------------------------------------------------
// BannerPlugin configuration
// --------------------------------------------------
let user, email, branch, commit
try {
  user = exec('git config user.name').toString().trim()
  email = exec('git config user.email').toString().trim()
  branch = exec('git rev-parse --abbrev-ref HEAD').toString().trim()
  commit = exec('git rev-parse --short HEAD').toString().trim()
} catch (err) {
  user = ''
  email = ''
  branch = ''
  commit = ''
}
const now = new Date().toLocaleString('default', { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
const banner = `/*!\n` +
  `@build with webpack\n` +
  `------------------------------\n` +
  `project : ${pkg.name}\n` +
  `author  : ${user} <${email}>\n` +
  `branch  : ${branch}\n` +
  `commit  : ${commit}\n` +
  `file:   : [file]\n` +
  `hash    : [hash]\n` +
  `chunk   : [chunkhash]\n` +
  `update  : ${now}\n` +
  `------------------------------\n` +
  `*/\n\n`

// --------------------------------------------------
// Configure webpack
// --------------------------------------------------
const configureWebpack = config => {
  return {
    resolve: {
      alias: {
        'TweenMax': 'gsap/src/uncompressed/TweenMax.js',
        'TimelineMax': 'gsap/src/uncompressed/TimelineMax.js',
        'ScrollToPlugin': 'gsap/src/uncompressed/plugins/ScrollToPlugin.js',
        'ScrollMagic': 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
        'animation.gsap': 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js',
        'debug.addIndicators': 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'
      }
    }
  }
}

// --------------------------------------------------
// Chain webpack
// --------------------------------------------------
const chainWebpack = config => {
  // filename pattern
  let assetHash = !filenameHashing ? '' : '.[hash:8]'
  let assetNamePattern = `[name]${assetHash}.[ext]`

  // common
  config.module.rule('images')
    .use('url-loader')
    .loader('url-loader')
    .tap(options => {
      options = {
        limit: 4096,
        fallback: {
          loader: 'file-loader',
          options: {
            name: path.join(dest.image, assetNamePattern)
          }
        }
      }
      return options
    })

  config.module.rule('svg')
    .use('file-loader')
    .loader('file-loader')
    .tap(options => {
      options.name = path.join(dest.image, assetNamePattern)
      return options
    })

  config.module.rule('media')
    .use('url-loader')
    .loader('url-loader')
    .tap(options => {
      options = {
        limit: 4096,
        fallback: {
          loader: 'file-loader',
          options: {
            name: path.join(dest.media, assetNamePattern)
          }
        }
      }
      return options
    })

  config.module.rule('fonts')
    .use('url-loader')
    .loader('url-loader')
    .tap(options => {
      options = {
        limit: 4096,
        fallback: {
          loader: 'file-loader',
          options: {
            name: path.join(dest.font, assetNamePattern)
          }
        }
      }
      return options
    })

  // production mode only
  if (process.env.NODE_ENV === 'production') {
    let hash = !filenameHashing ? '' : '.[contenthash:8]'
    let scriptFullPath = path.join(dest.script, `[name]${hash}.js`)
    let styleFullPath = path.join(dest.style, `[name]${hash}.css`)

    config
      .output
      .filename(scriptFullPath)
      .chunkFilename(scriptFullPath)

    config
      .plugin('extract-css')
      .tap(args => {
        args[0] = {
          filename: styleFullPath,
          chunkFilename: styleFullPath
        }
        return [ ...args ]
      })

    config
      .plugin('banner')
      .use(BannderPlugin, [ { banner, raw: true } ])

    if (disableHtmlMinify) {
      // Disable HtmlWebpackPlugin minify
      config
        .plugin('html')
        .tap(args => {
          args[0].minify = false
          return [ ...args ]
        })
    }

    // if (prerenderRoutes.length) {
    //   config
    //     .plugin('prerender')
    //     .use(PrerenderSPAPlugin, [
    //       {
    //         staticDir: path.join(__dirname, 'dist'),
    //         routes: prerenderRoutes
    //       }
    //     ])
    // }
  }
}

// --------------------------------------------------
// Export vue configuration
// --------------------------------------------------
module.exports = {
  publicPath,
  filenameHashing,
  runtimeCompiler,
  css: {
    loaderOptions: {
      sass: {
        data: sassInjectionData
      }
    }
  },
  devServer,
  configureWebpack,
  chainWebpack
}
