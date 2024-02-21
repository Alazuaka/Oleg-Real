
import gulp from 'gulp';
const { src, dest, parallel, series, watch } = gulp;
import autoprefixers from 'gulp-autoprefixer';
import image from 'gulp-image';
import uglifyEs from 'gulp-uglify-es';
import babel from 'gulp-babel';
import notify from 'gulp-notify';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import sourcemaps from 'gulp-sourcemaps';
import svgSprite from 'gulp-svg-sprite';
import webp from 'gulp-webp';
import { deleteAsync as del } from 'del';
import browserSynkActive from 'browser-sync';
const browserSynk = browserSynkActive.create();
const uglify = uglifyEs.default
import concat from 'gulp-concat';
import gulpIf from 'gulp-if'
import gulpPug from 'gulp-pug';
// import gulpInclude from 'gulp-include';



let prodTogle = false;

export const activeProde = (cb) => {
  prodTogle = true
  return cb()
}

export const clean = () => {
  return del(['dist'])
}

export const buildFont = () => {
return src('src/fonts/**/*')
.pipe(dest('dist/fonts'))
}

export const buildHtml = () => {
  return src('src/pages/pug/*.pug')
    .pipe(
      gulpPug()
    )
    .pipe(dest('./dist'))
    .pipe(browserSynk.stream());
}

export const buildStyles = () => {
  return src('src/styles/sass/*.scss')
    .pipe(gulpIf(!prodTogle, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.min.css'))
    .pipe(gulpIf(prodTogle, autoprefixers({
      cascade: false
    })))
    // .pipe(gulpIf(prodTogle, cleanCSS({
    //   level: 2
    // })))
    .pipe(gulpIf(!prodTogle, sourcemaps.write()))
    .pipe(dest('dist/style'))
    .pipe(browserSynk.stream())
};

export const buildSvgSprite = () => {
  const config = {
    mode: {
      stack: {
        sprite: '../sprite.svg'
      }    }
  }
  return src(['src/images/svg/**/*.svg'])
    .pipe(svgSprite(config))
    .pipe(dest('dist/images'))
}

export const buildImages = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.jpeg',
    'src/images/**/*.png',
    'src/images/*.svg',
  ])
    .pipe(image())
    .pipe(dest('dist/images'))
}

const buildWebps = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.jpeg',
    'src/images/**/*.png',
  ])
    .pipe(webp())
    .pipe(dest('dist/images'))
}

export const scripts = () => {
  return src([
    'src/js/components/plugins/*.js',
    'src/js/components/*.js',
    'src/js/*.js'
  ])
    .pipe(gulpIf(!prodTogle, sourcemaps.init()))
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
    .pipe(concat('app.js'))
    .pipe(gulpIf(!prodTogle, uglify().on('error', notify.onError())))
    .pipe(gulpIf(!prodTogle, sourcemaps.write()))
    .pipe(dest('dist/js'))
    .pipe(browserSynk.stream())
}



export const watchFiles = () => {
  browserSynk.init({
    server: {
      baseDir: 'dist'
    }
  })
}


watch('src/**/*.pug', buildHtml)
watch('src/styles/**/*.scss', buildStyles)
watch('src/images/svg/**/*.svg', buildSvgSprite)
watch('src/js/**/*.js', scripts)

export default series(activeProde, clean, parallel(buildHtml, buildFont, buildStyles, scripts, buildSvgSprite, buildImages, buildWebps), watchFiles)

// export imageBuilder series(buildImages, buildWebps)

// export default parallel(buildSvgSprite);
