// Gulp init and plugin load

const gulp = require('gulp');
const gutil = require("gulp-util");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

var webpackConfig = require('./webpack.config.js');

// Gulp tasks

gulp.task('default', ['watch']);
gulp.task('build', function(callback) {
    // run webpack
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});
gulp.task('watch', function(callback) {
    webpackConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:8080", "webpack/hot/dev-server");
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
    var compiler = webpack(webpackConfig);
    var server = new WebpackDevServer(compiler, {
        contentBase: 'dist',
        hot: true
    });
    server.listen(8080);
});
