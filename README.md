# gulp-cache-break

Append a timestamp to asset URLs in a web app.

## Usage

```
var cacheBreak = require('gulp-cache-break');

...

gulp.task('cacheBreak', function(callback){
    gulp.src('templates/header.html')
        .pipe(cacheBreak('assets/css/styles.css'))
        .pipe(cacheBreak('assets/js/scripts.js'))
        .pipe(gulp.dest('dist'));
})
```

## Changelog

### 0.2.1

* Added module require example

### 0.2.0

* Added ability to use optional foo.TIMESTAMP.js naming convention ([#1](https://github.com/benjamin-smith/gulp-cache-break/pull/1))

### 0.1.0

* First release

## Contributors

* [@benjamin-smith](https://github.com/benjamin-smith)
* [@rsanchez](https://github.com/rsanchez)
* [@santi6291](https://github.com/santi6291)

## Inspiration

* https://github.com/shakyShane/grunt-cache-breaker
* https://github.com/lazd/gulp-replace/

