module.exports =
    coffee:
        'src/coffee/**/*.coffee': '.temp/js'
    cjsx:
        'src/coffee/**/*.cjsx': '.temp/js'
    temp:
        mask: '.temp/js/**/*.js'
        '.temp/js/controller/Main.js': 'dist/background.js'
        '.temp/js/controller/Controller.js': 'dist/bundle.js'
        # '.temp/js/controller/DAController.js': 'dist/da.js'
    manifest:
        'src/manifest/manifest.coffeeson': 'dist/manifest.json'
    images:
        'src/images/**/*.{png,jpe?g,gif}': 'dist'
    less:
        'src/less/**/*.less': 'dist/furpage-plugin.css'