module.exports = function(config) {
    config.set({

        basePath: '',
        frameworks: ['browserify', 'jasmine'],

        files: [
            'src/**/*.js',
            'test/**/*.js'
        ],

        exclude: [
            'src/lib/*.js',
        ],

        preprocessors: {
            'src/**/*.js': ['browserify'],
            'test/**/*.js': ['browserify'],
            'src/**/*.jsx': ['react']
        },

        browserify: {
            debug: true,
            transform: [ 'babelify' ]
        }

        // define reporters, port, logLevel, browsers etc.
    });
};