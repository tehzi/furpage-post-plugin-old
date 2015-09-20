module.exports =
    coffee:
        'src/coffee/**/*.coffee': '.temp/js'
    cjsx:
        'src/coffee/**/*.cjsx': '.temp/js'
    temp:
        controller: '.temp/js/controller/Main.js'
        '.temp/js/**/*.js': 'dist/background.js'