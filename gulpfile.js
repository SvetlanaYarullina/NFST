// services
const { src, series, parallel, lastRun, dest, watch } = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const del = require('del');
const debug = require('gulp-debug');
const server = require('browser-sync').create();
const fs = require('fs');

// styles
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const objectFitImages = require('postcss-object-fit-images');
const inlineSVG = require('postcss-inline-svg');
const mqpacker = require("css-mqpacker");

// html
const pug = require('gulp-pug');
const cached = require('gulp-cached');

// scripts
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

// images
const svgstore = require('gulp-svgstore');

// postCSS plugins options
const postCssPlugins = [
  autoprefixer({ grid: true }),
  inlineSVG(),
  objectFitImages(),
];

// -------------------------------
// paths
const SOURCE_PATH = 'source/';
const BUILD_PATH = 'build/';
const Paths = {
  styles: {
    src: `${SOURCE_PATH}sass/**/*.scss`,
    dest: `${BUILD_PATH}css/`,
    inputFile: `${SOURCE_PATH}sass/style.scss`,
    minifyFileName: 'style.min.css',
  },
  scripts: {
    src: `${SOURCE_PATH}js/**/*.js`,
    dest: `${BUILD_PATH}js/`,
    inputFile: `${SOURCE_PATH}js/main.js`,
    outputFileName: 'main.min.js',
    vendor: {
      src: `${SOURCE_PATH}js/vendor/**/*.js`,
      outputFileName: 'vendor.min.js',
    },
  },
  html: {
    src: `${SOURCE_PATH}pug/pages/*.pug`,
    srcWatch: `${SOURCE_PATH}pug/**/*.pug`,
    dest: BUILD_PATH,
  },
  images: {
    src: `${SOURCE_PATH}img/**/*.{jpg,png,gif,webp,svg}`,
    webpSrc: `${SOURCE_PATH}img/**/*.{png,jpg}`,
    dest: `${BUILD_PATH}img/`,
    spriteSrc: `${SOURCE_PATH}/img/svg-sprite/*.svg`,
    spriteFileName: 'sprite.svg',
  },
  fonts: {
    src: `${SOURCE_PATH}fonts/**/*.{woff,woff2}`,
    output: `${BUILD_PATH}fonts/`,
  },
  favicons: {
    src: `${SOURCE_PATH}favicons/*.{png,ico,svg}`,
    output: `${BUILD_PATH}favicons/`,
  },
  manifest: {
    src: `${SOURCE_PATH}favicons/*.webmanifest`,
    output: BUILD_PATH,
  },
  browserconfig: {
    src: `${SOURCE_PATH}favicons/browserconfig.xml`,
    output: BUILD_PATH,
  },
  video: {
    src: `${SOURCE_PATH}video/**/*.*`,
    output: `${BUILD_PATH}video/`,
  }
};

// -------------------------------

// compiles pug to html
const compilePug = () => {
  return src(Paths.html.src)
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(pug({ pretty: true }))
    .pipe(cached('pug'))
    .pipe(debug({ title: 'pug compiled:' }))
    .pipe(dest(BUILD_PATH));
};
exports.compilePug = compilePug;

// compiles scss to css and minifies
const compileCss = () => {
  return src(Paths.styles.inputFile)
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(sourcemap.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(postcss(postCssPlugins))
    .pipe(dest(Paths.styles.dest))
    .pipe(csso())
    .pipe(rename(Paths.styles.minifyFileName))
    .pipe(sourcemap.write('.'))
    .pipe(debug({ title: 'css compiled:' }))
    .pipe(dest(Paths.styles.dest))
    .pipe(server.stream());
};
exports.compileCss = compileCss;

// builds js files
const buildJs = () => {
  return src(Paths.scripts.inputFile)
    .pipe(webpackStream(webpackConfig))
    .pipe(dest(Paths.scripts.dest))
};
exports.buildJs = buildJs;

// copies images
const copyImg = () => {
  return src(Paths.images.src, { since: lastRun(copyImg) })
    .pipe(debug({ title: 'images copied:' }))
    .pipe(dest(Paths.images.dest));
};
exports.copyImg = copyImg;

// generates svg sprite
const generateSvgSprite = (cb) => {
  const svgPath = `${SOURCE_PATH}img/svg-sprite/`;

  if (fileExist(svgPath)) {
    return src(svgPath + '*.svg')
      .pipe(svgstore({ inlineSvg: true }))
      .pipe(rename('sprite_auto.svg'))
      .pipe(debug({ title: 'sprite generated' }))
      .pipe(dest(Paths.images.dest));
  }
  else {
    cb()
  }
};
exports.generateSvgSprite = generateSvgSprite;

// refreshes page
const refresh = (done) => {
  server.reload();
  done();
};
exports.refresh = refresh;

// cleans build dir
const cleanBuildDir = () => {
  return del('build');
};
exports.cleanBuildDir = cleanBuildDir;

// -------------------------------
// Assets

// copies fonts
const copyFonts = () => {
  return src(Paths.fonts.src)
    .pipe(dest(Paths.fonts.output));
};

// copies favicons
const copyFavicons = () => {
  return src(Paths.favicons.src)
    .pipe(dest(Paths.favicons.output));
};

// copies manifest and browserconfig
const copyConfigs = () => {
  return src([
    Paths.manifest.src,
    Paths.browserconfig.src,
  ])
    .pipe(dest(BUILD_PATH));
};

// copies videos
const copyVideos = () => {
  return (src(Paths.video.src))
    .pipe(dest(Paths.video.output));
};

// copies assets
// const copyAssets = parallel(
//   copyFonts, copyFavicons, copyConfigs, copyVideos
// );
const copyAssets = parallel(
  copyFonts, copyFavicons
);
exports.copyAssets = copyAssets;

// -------------------------------
// starts local server
const serve = () => {
  server.init({
    server: BUILD_PATH,
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  // pug watcher
  watch(Paths.html.srcWatch, { events: ['all'], delay: 100 }, series(
    compilePug,
    refresh,
  ));

  // scss watcher
  watch(Paths.styles.src, { events: ['all'], delay: 100 }, series(
    compileCss,
  ));

  // js watcher
  watch(Paths.scripts.src, { events: ['all'], delay: 100 }, series(
    buildJs,
    refresh,
  ));

  // images watcher
  watch(Paths.images.src, { events: ['all'], delay: 100 }, series(
    parallel(copyImg),
    generateSvgSprite,
  ))

  // svg sprite watcher
  watch(Paths.images.spriteSrc, { events: ['all'], delay: 100 }, series(
    generateSvgSprite,
    refresh,
  ));
};

exports.build = series(
  cleanBuildDir,
  parallel(copyImg, copyAssets, generateSvgSprite),
  parallel(compilePug),
  parallel(compileCss, buildJs),
);

exports.default = series(
  cleanBuildDir,
  parallel(copyImg, copyAssets, generateSvgSprite),
  parallel(compilePug),
  parallel(compileCss, buildJs),
  serve
);

/**
 * Проверка существования файла или папки
 * @param  {string} path      Путь до файла или папки
 * @return {boolean}
 */
function fileExist(filepath) {
  let flag = true;
  try {
    fs.accessSync(filepath, fs.F_OK);
  } catch (e) {
    flag = false;
  }
  return flag;
}
