$ = require 'jquery'
React = require 'react/addons'
BarDA = require '../views/BarDA'
URI = require 'urijs'
_ = require 'underscore'

class DAController
    $element: null
    $bar: null
    userId: "134314031"
    url: "http://furrycard.net/api.php?method=isURL2&url=" + location.href

    constructor: ->
        @initialize()

    initialize: =>
        @$element = $('.dev-view-deviation:last')
        @unmountLastBar()
        if @$element.length
            @$element.after '<div id="plugin-element"></div>'
            @$bar = BarDA.initialize $('#plugin-element').get(0), @onAfterMount, @onAdd
        else
            throw new Error 'Element not found, please rewrite plugin with new $element conteiner.'

    onAfterMount: (component) =>
        $.ajax @url
            .done @_callback

    onAdd: =>
        uri = new URI("https://furrycard.net/api.php?method=push")
        uri.addQuery
            tags: "#фурри #Furry"
            url: window.location
            caption: document.title
            img_url: $('.dev-content-full').attr('src')
            user_id: @userId
        $.ajax String(uri.normalize())
         .done =>
            $.ajax @url
             .done @_callback

    unmountLastBar: =>
        $('#plugin-element').remove()

    _callback: (r) =>
        r = JSON.parse(r) if _.isString r
        @$bar.updateState
            canAdd:      !!(r.base is '0' and r.queue is '0')
            isPublished: !!(r.base > 0)
            inQueue:     !!(r.base is '0' and r.queue > 0)

# $ -> new DAController

module.exports = DAController