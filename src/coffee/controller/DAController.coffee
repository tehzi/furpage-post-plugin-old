$ = require 'jquery'
React = require 'react/addons'
BarDA = require '../views/BarDA'
URI = require 'urijs'
_ = require 'underscore'
Controller = require './Controller'

class DAController extends Controller
    $element: null
    url: "http://furrycard.net/api.php?method=isURL2&url=" + location.href

    constructor: ->
        @initialize()

    initialize: =>
        super()
        @$element = $('.dev-view-deviation:last')
        @unmountLastBar()
        @mountBar()

    onAfterMount: (component) =>
        @url = "http://furrycard.net/api.php?method=isURL2&url=" + location.href
        $.ajax(@url).done(@_callback)

    onAdd: =>
        uri = new URI("http://furrycard.net/api.php?method=push")
        uri.addQuery
            tags: "#фурри #Furry"
            url: window.location.href
            caption: document.title
            img_url: $('.dev-content-full:last').attr('src')
            user_id: @userId
        $.ajax String(uri.normalize())
         .done =>
            $.ajax(@url)
             .done(@_callback)

    unmountLastBar: => $('#plugin-element').remove()

    mountBar: =>
        if @$element.length
            @$element.after('<div id="plugin-element"></div>')
            @$bar = BarDA.initialize($('#plugin-element').get(0), @onAfterMount, @onAdd)
        else
            throw new Error 'Element not found, please rewrite plugin with new $element conteiner.'

    afterAutorize: (userId) =>
        super(userId)
        setTimeout((=>
            @$element = $('.dev-view-deviation:last')
            @unmountLastBar()
            @mountBar()
            if !_.isNull(@$bar)
                @_callback(@lastInfo)
        ), 1000)

    _callback: (r) =>
        r = JSON.parse(r) if _.isString r
        @lastInfo = r
        @$bar.updateState
            hasUserId:   !_.isNull(@userId)
            canAdd:      !!(r.base is '0' and r.queue is '0')
            isPublished: !!(r.base > 0)
            inQueue:     !!(r.base is '0' and r.queue > 0)

module.exports = DAController