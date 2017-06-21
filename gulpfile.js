const gulp = require('gulp');
const webpack = require('gulp-webpack');
const named = require('vinyl-named');
const map = require('vinyl-map');
const path = require('path');
const fs = require('fs');
let i = 0;

const wrapCode = (name, code) => `//META{"name":"p_${name}"}*//

/*@cc_on
@if (@_jscript)
	
${fs.readFileSync('ms_installer.js')}

@else @*/

${code}

/*@end @*/  

`;

gulp.task('copy-templates', () =>
    gulp.src('v2/*/plugin.js').pipe(map((code, filename) => {
        gulp.src('v1template.js')
            .pipe(gulp.dest(path.dirname(filename)));
        return code;
    }))
);


gulp.task('webpack', () =>
    gulp.src('v2/*/v1template.js')
        .pipe(named(file => file.dirname.split(path.sep).pop().replace(/\s+/g, '_').toLowerCase()))
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
        .pipe(map((code, filename) => wrapCode(path.basename(filename, '.plugin.js'), code.toString())))
        .pipe(gulp.dest('v1/')));

gulp.task('default', gulp.series('copy-templates', 'webpack'));