var gulp = require('gulp');
var asar = require('gulp-asar');
var execSync = require('child_process').execSync;
var execAsync = require('child_process').exec;

gulp.task('repack', ['closeDiscord', 'asar', 'launchDiscord']);

gulp.task('asar', function() {
   gulp.src('app/**/*', {base: 'app/'})
   .pipe(asar('app.asar'))
   .pipe(gulp.dest('.'));
});

gulp.task('closeDiscord', function() {
    execSync('TASKKILL /F /IM discord.exe');
});

gulp.task('launchDiscord', function() {
    execAsync('start /b ../Discord.exe > NUL');
});

gulp.task('watch', function() {
    gulp.watch('app/inject/**/*.js', ['repack']);
});

gulp.task('default', ['repack', 'watch']);
