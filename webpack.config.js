module.exports = {
    devtool: 'eval-source-map',
    entry: './src/js/diarydash.js',
    output: {
        path: './dist/js',
        filename: 'diarydash.bundle.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015','react','stage-1']
            }
        }]
    }
};