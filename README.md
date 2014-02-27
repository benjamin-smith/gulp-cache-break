# gulp-cache-break

Append a timestamp to asset URLs in a web app.

## Usage

    gulp.task('cacheBreak', function(callback){
        gulp.src('templates/header.html')
            .pipe(cacheBreak('assets/css/styles.css'))
            .pipe(cacheBreak('assets/js/scripts.js'))
            .pipe(gulp.dest('dist'));
    })

## Credits

* https://github.com/shakyShane/grunt-cache-breaker
* https://github.com/lazd/gulp-replace/

## Changelog

### 0.1.0

* First release
