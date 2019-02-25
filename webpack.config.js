'use strict';
module.exports = {
    entry: './src/index.js'
    , output: {
        filename: 'bundle.js'
    }
    , mode: 'development' //production
    , resolve:{
        modules:[ 'node_modules'
        ,'src'
        ,'.'
            ]
        , extensions: ['.js', '.jsx']
    }
    , devServer: {
        contentBase:'./dist'
    }

    ,module: {
        rules: [
            {
                test: /\.(js|jsx)$/
                ,loader: 'babel-loader'
                ,exclude: /(node_modules|bower_components)/
                , query: {
                    presets: ['es2015', 'stage-2', 'react']
                }
            }
        ]
    }
}