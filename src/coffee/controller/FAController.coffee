$ = require 'jquery'
BarFA = require '../views/BarFA'
URI = require 'urijs'
_ = require 'underscore'

class FAController
    $element: null
    $bar: null
    userId: "134314031"

    constructor: ->
        @$element = $ '#submission_page div.aligncenter.imgshad.p5t'
        @initialize()

    initialize: =>
        if @$element.length
            @$element.after '<div id="plugin-element"></div>'
            @$bar = BarFA.initialize $('#plugin-element').get(0), @onAfterMount, @onAdd
        else
            throw new Error 'Element not found, please rewrite plugin with new $element conteiner.'

    onAfterMount: (component) =>
        url = "https://furrycard.net/api.php?method=isURL2&url=" + location.href.replace /full/, 'view'
        $.ajax url
            .done @_callback

    onAdd: =>
        uri = new URI("https://furrycard.net/api.php?method=push")
        imgUrl = $('body').html()
                          .match(/var full_url\s*=\s*"(.+)";/)[1]
        imgUrl = "http:#{imgUrl}"
        tags = _.map($('.tags-row span.tags a'), (item) => "#" + $(item).text(); ).join(' ')
        uri.addQuery
            tags: URI.encode "#фурри #{tags}"
            url: window.location
            caption: URI.encode document.title
            img_url: imgUrl
            user_id: @userId
        $.ajax String(uri.normalize())
         .done =>
            url = "https://furrycard.net/api.php?method=isURL2&url=" + location.href.replace /full/, 'view'
            $.ajax url
             .done @_callback

    _callback: (r) =>
        r = JSON.parse(r) if _.isString r
        @$bar.updateState
            canAdd:      !!(r.base is '0' and r.queue is '0')
            isPublished: !!(r.base > 0)
            inQueue:     !!(r.base is '0' and r.queue > 0)

# $ -> new FAController

module.exports = FAController