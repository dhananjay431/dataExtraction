const path = require("path");

module.exports = {
    mode: 'development',
    entry: "./src/index.js",
    externals: {
        jquery: 'jQuery',
        LeaderLine: 'LeaderLine'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",


        // The name of the library
        library: "dbPDF",
        // Allows the library to be used in different environments (Node, Browser, etc.)
        libraryTarget: "umd",
        // Fixes 'window is not defined' issues in Node environments
        globalObject: "this",
    },
};