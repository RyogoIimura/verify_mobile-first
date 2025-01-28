const {
  src, dest, watch, series, parallel,
} = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const notifier = require('node-notifier');
const postcss = require('gulp-postcss');
const gulpCopy = require('gulp-copy')
const autoprefixer = require('autoprefixer');
const cssdeclsort = require('css-declaration-sorter');
const sassGlob = require('gulp-sass-glob');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
// const fibers = require('fibers');
const browserSync = require('browser-sync');
const rename = require('gulp-rename');
// const connectPhp = require('gulp-connect-php');
// sass.compiler = require('sass');

const minimist = require('minimist');

const options = minimist(process.argv.slice(2), {
  string: 'env',
  default: { env: 'development' },
});

const PROD = options.env === 'build';
const BREAKPOINT = 768;
const PROTOCOL = 'https';
const SERVER_NAME = 'www.dot-st.com';

const PRJ_NAME = "sp_test(ratio+vwPc)"
// PRJ_NAMEを書き換える
const DIR = PRJ_NAME;
const ASSET_DIR = PRJ_NAME;


const CSS_DIR = `/assets/css/`;
const JS_DIR = `/assets/js/`;
const IMG_DIR = `/assets/images/`;

const ROOT = './dist/';
const HOST_NAME = `${PROTOCOL}://${SERVER_NAME}`;
const CANONICAL_ROOT = `${HOST_NAME}/${DIR}`;
const INDEX_DIR = `${ROOT}/${DIR}`;

const errorHandler = (error) => {
  notifier.notify(
    {
      title: 'エラー発生！',
      message: error.message,
      sound: true,
    },
    () => {
      console.log(error.message);
    },
  );
};

const compilePug = (done) => {
  src(
    [
      'src/pug/**.pug',
      'src/pug/**/*.pug',
      'src/pug/**/**/*.pug',
      '!src/pug/_*/*.pug',
      '!src/pug/_*/**/*.pug',
      '!src/pug/**/_*/**.pug',
    ],
    { sourcemaps: PROD ? false : true },
  )
    .pipe(plumber({ errorHandler }))
    .pipe(
      pug({
        pretty: true,
        locals: {
          PROD,
          DIR,
          CSS_DIR: `${ASSET_DIR}${CSS_DIR}`,
          JS_DIR: `${ASSET_DIR}${JS_DIR}`,
          IMG_DIR: `/${ASSET_DIR}${IMG_DIR}`,
          BREAKPOINT,
          CANONICAL_ROOT,
          now: new Date(),
        },
      }),
    )
    // .pipe(rename(path => path.extname = '.php'))
    .pipe(dest(INDEX_DIR /* { sourcemaps: './sourcemaps'} */));
  done();
};


const compileSass = (done) => {
  const postcssPlugins = [
    autoprefixer({
      cascade: false,
    }),
    cssdeclsort({ order: 'alphabetical' /* smacss, concentric-css */ }),
  ];
  src([
    'src/scss/**/*.scss',
    '!src/scss/_*/**.scss',
    '!src/scss/_*/**/**.scss',
    '!src/scss/**/_*/**.scss',
  ], { sourcemaps: false })
    .pipe(plumber({ errorHandler }))
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'expanded',
      // outputStyle: 'compressed',
    }))
    .pipe(postcss(postcssPlugins))
    .pipe(gcmq())
    .pipe(cleanCSS({ rebase: false }))//コメントアウトでcssの圧縮をなくす
    .pipe(dest(`${ROOT}${ASSET_DIR}/${CSS_DIR}`) /* , { sourcemaps: './sourcemaps'} */);
  done(); // 終了宣言
};

const buildServer = (done) => {
  const PORT = 3000;

  // connectPhp.server({
  //   base: ROOT,
  //   port: PORT,
  // }, () => {
  //   browserSync.init({
  //     proxy: 'localhost:' + PORT,
  //     logLevel: 'silent',
  //     notify: false,
  //     startPath: DIR,
  //   })
  // })

  browserSync({
    files: ROOT+'/**/*',
    startPath: DIR,
    // reloadDelay: WATCH_INTERVAL,
    server: {
      baseDir: ROOT // ルートとなるディレクトリを指定
    }
  });

  done();
};

const browserReload = (done) => {
  browserSync.reload();
  done();
};

const watchFiles = () => {
  watch(['src/pug/**/*.pug'], series(compilePug, browserReload));
  // watch(['./scss/**/*.scss'], series(compileSass, browserStream));
  watch(['src/scss/**/*.scss','src/scss/**/*.sass'], series(compileSass, browserReload));
  watch(['src/js/'], series(browserReload));
};

if (PROD) {
  exports.default = series(
    parallel(compilePug, compileSass),
  );
} else {
  exports.default = series(
    parallel(compilePug, compileSass),
    parallel(buildServer, watchFiles),
  );
}
