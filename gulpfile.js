var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

// all js files in the root directory, and in src folder
var jsFiles = ['*.js', 'src/**/*.js', 'public/js/*.js'];

// use jshint and jscs to check syntax on jsFiles
gulp.task('style', function() {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('inject', function() {
  var wiredep = require('wiredep').stream;
  var wireDepOptions = {
    bowerJson: require('./bower.json'),
    directory: './public/lib',
    ignorePath: '../../public'
  };

  var inject = require('gulp-inject');
  var injectSource = gulp.src(['./public/css/*.css', './public/js/*.js']);
  var injectOptions = {ignorePath: '/public'};

  return gulp.src('./src/views/*.ejs')
    .pipe(wiredep(wireDepOptions))
    .pipe(inject(injectSource, injectOptions))
    .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function() {
  var options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      'PORT': 7000
    },
    watch: jsFiles
  };

  return nodemon(options)
    .on('restart', function(en) {
      console.log(' .... restarting .... ');
    });
});
