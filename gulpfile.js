var gulp = require('gulp')
var plumber = require('gulp-plumber')
var source = require('vinyl-source-stream')
const sourcemaps = require('gulp-sourcemaps')
var tsify = require('tsify')
var browserify = require('browserify')
const browserifycss = require('browserify-css')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const notifier = require('node-notifier')
const localenvify = require('localenvify')
const SASS = './web/src/**/*.scss'
const destination = './web/public/'
var browserSync = require('browser-sync').create()
const path = require('path')
const c = require('ansi-colors')

let startBundle, endBundle, startSASS, endSASS

// Notifiers

gulp.task('initial-build-complete', (cb) => {
  notifier.notify({
    icon: path.join(__dirname, 'web/public/assets/images/reactReduxTS.png'),
    title: 'React-Redux-TS',
    message: 'Initial Build Complete!',
    sound: 'Pop',
  })
  return cb()
})

gulp.task('build-bundle-complete', (cb) => {
  notifier.notify({
    icon: path.join(__dirname, 'web/public/assets/images/reactReduxTS.png'),
    title: 'React-Redux-TS',
    message: 'Bundled!',
    sound: 'Pop',
  })
  return cb()
})

gulp.task('build-sass-complete', (cb) => {
  notifier.notify({
    icon: path.join(__dirname, 'web/public/assets/images/reactReduxTS.png'),
    title: 'React-Redux-TS',
    message: 'SASS compiled!',
    sound: 'Pop',
  })
  return cb()
})

// Create Bundle

gulp.task('browserify', function () {
  var bundler = browserify({
    entries: ['./web/src/index.tsx'],
    cache: {},
    packageCache: {},
    fullPaths: true,
    debug: true,
  })
    .transform(browserifycss, { global: true })
    .plugin(tsify, {
      noImplicitAny: false,
      module: 'commonjs',
      target: 'es2018',
    })
    .transform(localenvify, { envfile: '.env.local' })

  var bundle = function () {
    return bundler
      .bundle()
      .on('error', (error) => {
        console.log(error)
      })
      .pipe(plumber())
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(destination))
  }

  bundler.on('update', bundle)
  return bundle()
})

gulp.task('build-bundle', gulp.parallel('browserify'))

gulp.task(
  'build-bundle-and-alert',
  gulp.series('build-bundle', 'build-bundle-complete')
)

gulp.task('log-start-build-bundle', (cb) => {
  startBundle = new Date()
  console.log('      ')
  console.log(
    c.bgGreen.bold(
      '*************************************************************************'
    )
  )
  console.log('      ')
  console.log(
    c.green.bold(
      `Bundling...                                ${startBundle.toTimeString()}`
    )
  )
  console.log('      ')

  return cb()
})

gulp.task('log-end-build-bundle', (cb) => {
  endBundle = new Date()
  console.log('      ')
  console.log(
    c.green.bold(
      `Bundled!                                   ${endBundle.toTimeString()}`
    )
  )
  console.log(
    c.green.bold(`time elapsed: ${(endBundle - startBundle) / 1000} seconds.`)
  )
  console.log('      ')

  console.log(
    c.bgGreen.bold(
      '*************************************************************************'
    )
  )
  console.log('      ')

  return cb()
})

gulp.task(
  'build-bundle-and-alert-with-logs',
  gulp.series(
    'log-start-build-bundle',
    'build-bundle-and-alert',
    'log-end-build-bundle'
  )
)

// Compile SASS

gulp.task('sass', (cb) => {
  gulp
    .src(SASS)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destination))
  return cb()
})

gulp.task('build-sass', gulp.parallel('sass'))

gulp.task(
  'build-sass-and-alert',
  gulp.series('build-sass', 'build-sass-complete')
)

gulp.task('reload-page', (cb) => {
  browserSync.reload()
  return cb()
})

gulp.task('log-start-build-sass', (cb) => {
  startSASS = new Date()
  console.log('      ')
  console.log(
    c.bgMagenta.bold(
      '*************************************************************************'
    )
  )
  console.log('      ')
  console.log(
    c.magenta.bold(
      `Compiling SASS...                                ${startSASS.toTimeString()}`
    )
  )
  console.log('      ')

  return cb()
})

gulp.task('log-end-build-sass', (cb) => {
  endSASS = new Date()
  console.log('      ')
  console.log(
    c.magenta.bold(
      `Compiled!                                        ${endSASS.toTimeString()}`
    )
  )
  console.log(
    c.magenta.bold(`time elapsed: ${(endSASS - startSASS) / 1000} seconds.`)
  )
  console.log('      ')
  console.log(
    c.bgMagenta.bold(
      '*************************************************************************'
    )
  )
  console.log('      ')

  return cb()
})

gulp.task(
  'build-sass-and-alert-with-logs',
  gulp.series(
    'log-start-build-sass',
    'build-sass-and-alert',
    'log-end-build-sass'
  )
)

gulp.task('watch-and-alert', () => {
  browserSync.init({
    ui: {
      port: 8079,
    },
    port: 8080,
    proxy: 'http://localhost:8081',
    open: false,
  })

  gulp.watch(
    ['./web/src/**/*.tsx', './web/src/**/*.ts'],
    gulp.series('build-bundle-and-alert-with-logs', 'reload-page')
  )
  gulp.watch(
    ['./web/src/**/*.scss'],
    gulp.series('build-sass-and-alert-with-logs', 'reload-page')
  )
})

gulp.task('watch', gulp.series('watch-and-alert'))

gulp.task(
  'initial-build',
  gulp.series(
    'build-sass-and-alert-with-logs',
    'build-bundle-and-alert-with-logs',
    'initial-build-complete'
  )
)

gulp.task('default', gulp.series('initial-build', 'watch'))
