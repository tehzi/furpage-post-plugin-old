$ = require 'jquery'
BarFA = require '../views/BarFA'
URI = require 'urijs'
_ = require 'underscore'
Controller = require './Controller'

class FAController extends Controller
    $element: null
    $bar: null

    constructor: ->
        super()
        @$element = $('#submissionImg')
        @initialize()

    initialize: =>
        if @$element.length
            @$element.after '<div id="plugin-element"></div>'
            @$bar = BarFA.initialize($('#plugin-element').get(0), @onAfterMount, @onAdd, @onAutorize)
        else
            throw new Error 'Element not found, please rewrite plugin with new $element conteiner.'

    onAfterMount: (component) =>
        url = "http://furrycard.furries.ru/api.php?method=isURL2&url=" + location.href.replace /full/, 'view'
        $.ajax(url)
            .done(@_callback)

    onAdd: =>
        uri = new URI("http://furrycard.furries.ru/api.php?method=push")
        imgUrl = $('#submissionImg').attr('src')
        imgUrl = "http:#{imgUrl}"
        tags = _.map($('.tags-row span.tags a'), (item) => "#" + $(item).text(); ).join(' ')
        uri.addQuery
            tags: "#фурри #{tags}"
            url: window.location
            caption: document.title
            img_url: imgUrl
            user_id: @userId
        $.ajax String(uri.normalize())
         .done =>
            url = "http://furrycard.furries.ru/api.php?method=isURL2&url=" + location.href.replace(/full/, 'view')
            $.ajax(url)
             .done(@_callback)

    onAutorize: => @autorize()

    afterAutorize: (userId) =>
        super(userId)
        if !_.isNull(@$bar)
            @_callback(@lastInfo)

    _callback: (r) =>
        r = JSON.parse(r) if _.isString(r)
        @lastInfo = r
        @$bar.updateState
            hasUserId:   !_.isNull(@userId)
            canAdd:      !!(r.base is '0' and r.queue is '0')
            isPublished: !!(r.base > 0)
            inQueue:     !!(r.base is '0' and r.queue > 0)

module.exports = FAController