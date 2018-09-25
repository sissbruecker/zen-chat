const path = require('path');

module.exports = {
    entry: './src/Zen.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'zen.js',
        library: 'Zen',
        libraryExport: 'default'
    }
};
