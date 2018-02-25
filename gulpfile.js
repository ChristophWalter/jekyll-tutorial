const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');

const child = require('child_process');
const browserSync = require('browser-sync').create();

gulp.task('scss', () => {
    gulp.src('mysite/_sass/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 3 versions', '> 1%']))
        .pipe(cleanCSS())
        .pipe(gulp.dest('mysite/assets/'));
});

gulp.task('css', () => {
    gulp.src([
        'mysite/assets/vendor/bootstrap.min.css'
    ])
        .pipe(concat('vendor.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('mysite/assets'))
});

gulp.task('js', () => {
    gulp.src([
        'mysite/assets/vendor/jquery-3.2.1.slim.min.js',
        'mysite/assets/vendor/popper.min.js',
        'mysite/assets/vendor/bootstrap.min.js',
        'mysite/assets/js/scripts.js'
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify().on('error', console.log))
        .pipe(gulp.dest('mysite/assets'))
});

gulp.task('watchScss', () => {
    gulp.watch([
        'mysite/_sass/**/*'
    ], ['scss']);
});

gulp.task('watchCssJs', () => {
    gulp.watch([
        'mysite/assets/vendor/**/*',
        'mysite/assets/js/**/*'
    ], ['css','js']);
});


gulp.task('jekyll', () => {
    const jekyll = child.spawn('jekyll', ['build',
        '--source',
        'mysite',
        '--destination',
        'docs',
        '--baseurl',
        'jekyll-tutorial'
    ]);

    const jekyllLogger = (buffer) => {
        buffer.toString()
            .split(/\n/)
            .forEach((message) => gutil.log('Jekyll: ' + message));
    };

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('jekyll-watch', () => {
    const jekyll = child.spawn('jekyll', ['build',
        '--source',
        'mysite',
        '--destination',
        'docs',
        '--watch',
        '--incremental'
    ]);

    const jekyllLogger = (buffer) => {
        buffer.toString()
            .split(/\n/)
            .forEach((message) => gutil.log('Jekyll: ' + message));
    };

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', () => {
    browserSync.init({
        files: ['docs/**'],
        port: 4000,
        server: {
            baseDir: 'docs'
        },
        open: false
    }, (err, bs) => {
		bs.addMiddleware("*", (req, res) => {
			res.writeHead(302, {
				location: "/404.html"
			});
			res.end("Redirecting!");
		});
	});
});

gulp.task('styling', ['scss', 'css', 'js']);
gulp.task('styling-watch', ['scss', 'css', 'js', 'watchScss', 'watchCssJs']);
gulp.task('build', ['styling', 'jekyll']);
gulp.task('default', ['styling-watch', 'jekyll-watch', 'serve']);
