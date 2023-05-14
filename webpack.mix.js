const mix = require('laravel-mix')

mix.setPublicPath('dist')

mix.sass('assets/scss/game.scss', 'css/game.css')

mix.js([
    'assets/js/game.js',
], 'js/game.js')