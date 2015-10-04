module.exports =
    coffee:
        'src/coffee/**/*.coffee': '.temp/js'
    cjsx:
        'src/coffee/**/*.cjsx': '.temp/js'
    temp:
        mask: '.temp/js/**/*.js'
        '.temp/js/controller/Main.js': 'dist/background.js'
        '.temp/js/init.js': 'dist/bundle.js'
    manifest:
        'src/manifest/manifest.coffeeson': 'dist/manifest.json'
    images:
        'src/images/**/*.{png,jpe?g,gif}': 'dist'
    less:
        'src/less/**/*.less': 'dist/css/furpage-plugin.css'
    jade:
        'src/jade/**/*.jade': 'dist'