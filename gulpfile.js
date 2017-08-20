const gulp = require('gulp');
const gulpsync = require('gulp-sync')(gulp);
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const notify = require("gulp-notify");
const concat = require('gulp-concat');
const del = require('del');


// Clean the css prod folder
gulp.task('clean-prod-css', function () {
    return del([
        './public/css/*'
    ]);
});

// Clean the js prod folder
gulp.task('clean-prod-js', function () {
    return del([
        './public/js/*'
    ]);
});

// Clean the js prod folder
gulp.task('clean-prod-views', function () {
    return del([
        './public/views/*'
    ]);
});

// Clean the js prod folder
gulp.task("move-static-views", function () {
    return gulp.src([
        "./application/**/*.html"
    ], {base: "./application/"})
        .pipe(gulp.dest("./public/views/"));
});

gulp.task("move-font-awesome-fonts", function () {
    return gulp.src([
        "./node_modules/font-awesome/fonts/**/*"
    ], { base : "./node_modules/font-awesome/" })
        .pipe(gulp.dest("./public"));
});

gulp.task('move-views', gulpsync.sync([
    // sync
    'clean-prod-views',
    'move-static-views'
]));

// Compile custom less files
gulp.task('custom-css-files', function () {
    return gulp.src('./application/scss/style.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        })
            .on("error", notify.onError(function (error) {
                return "Error: " + error.message;
            })))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('./public/css'))
});


// Merge all Directives, Services and Controllers
gulp.task('custom-angular-application-files', function () {
    return gulp.src([
        './application/app.init.js',
        './application/app.config.js',
        './application/app.routes.js',
        './application/app.main.Controller.js',
        './application/security/*.js',
        './application/shared/*.js',
        './application/**/*.View.Model.js',
        './application/**/*.Domain.Model.js',
        './application/**/*.Domain.Model.Builder.js',
        './application/**/*.Domain.ModelBuilder.js',
        './application/**/*.Api.Model.js',
        './application/**/*.Api.Model.Builder.js',
        './application/**/*.Controller.js',
        './application/**/*.Service.js',
        './application/**/*.Directive.js'
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/js'))
});


let cssVendorFiles = [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css'
];

gulp.task('vendor-css-files', function () {
    return gulp.src(cssVendorFiles)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('./public/css'))
});
let jsVendorFiles = [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-route/angular-route.min.js',
    'node_modules/angular-cookies/angular-cookies.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/chart.js/dist/Chart.min.js',
    'node_modules/angular-chart.js/dist/angular-chart.min.js',
    'node_modules/lodash/lodash.min.js',
    'node_modules/localpkg-generic-helper/src/generic.String.Helper.js',
    'node_modules/localpkg-generic-helper/src/generic.Date.Helper.js',
    'node_modules/localpkg-generic-helper/src/generic.Object.Helper.js',
    'node_modules/localpkg-generic-validator/src/generic.Bool.Validator.Helper.js'
];

gulp.task('vendor-js-files', function () {
    return gulp.src(jsVendorFiles)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./public/js'))
});

gulp.task('watch', function () {
    /*    gulp.watch('src/semantic/!**!/!*.*', ['framework']);  */
    gulp.watch('./application/scss/**', gulpsync.sync([
        'clean-prod-css',
        'custom-css-files',
        'vendor-css-files'
    ]));
    gulp.watch('./application/**/*.js', gulpsync.sync([
        'clean-prod-js',
        'custom-angular-application-files',
        'vendor-js-files'
    ]));
    gulp.watch('./application/**/*.html', gulpsync.sync([
        'clean-prod-views',
        'move-views'
    ]));
});

gulp.task('default', gulpsync.sync([
    // sync
    'watch',
    'clean-prod-js',
    'clean-prod-css',
    'move-font-awesome-fonts',
    'move-views',
    'custom-angular-application-files',
    'custom-css-files',
    'vendor-js-files',
    'vendor-css-files'

]));