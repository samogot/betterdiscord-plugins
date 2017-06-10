const gulp = require('gulp');
const webpack = require('gulp-webpack');
const named = require('vinyl-named');
const map = require('vinyl-map');
const path = require('path');
const fs = require('fs');
let i = 0;

gulp.task('copy-templates', () =>
    gulp.src('v2/*/plugin.js').pipe(map((code, filename) => {
        gulp.src('v1template.js')
            .pipe(gulp.dest(path.dirname(filename)));
        return code;
    }))
);


gulp.task('webpack', () =>
    gulp.src('v2/*/v1template.js')
        .pipe(named(file => file.dirname.split('/').pop().replace(/\s+/g, '_').toLowerCase()))
        .pipe(webpack({
            output: {
                filename: '[name].plugin.js',
                libraryTarget: "var",
                library: "p_[name]"
            },
            externals: {
                '../modules/api': '{}',
                '../modules/utils': '{}',
            },
            module: {
                loaders: [
                    {
                        test: /\.json/,
                        loader: "json"
                    }
                ]
            }
        }))
        .pipe(map((code, filename) => `//META{"name":"p_${path.basename(filename, '.plugin.js')}"}*//\n` + code.toString()))
        .pipe(gulp.dest('v1/')));

gulp.task('default', gulp.series('copy-templates', 'webpack'));