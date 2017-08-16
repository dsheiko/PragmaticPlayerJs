const { join } = require( "path" );
module.exports = {
    entry: "./src/main.js",
    output: {
			path: join( __dirname ),
			filename: "pplayer.js"
    },

    module: {
			rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: [{
            loader: "babel-loader",
            options: {
              presets: [ "es2015" ],
              plugins: [ "transform-class-properties", "transform-object-rest-spread" ]
            }
          }]
        }
			]
		}
};