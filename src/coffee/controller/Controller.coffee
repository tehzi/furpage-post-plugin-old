$ = require 'jquery'
URI = require 'urijs'
_ = require 'underscore'

class Controller
    $bar: null
    userId: null
    lastInfo: null

    @isFA: -> new RegExp("htt(p|ps)://www.furaffinity.net/view/\\d+/").test(location.href)

    @isDA: -> new RegExp("(htt(p|ps)://\\S*\.deviantart\.com/art/\\S*)").test(location.href)

    @isPopup: -> !!$('.furpage-plugin__popup').length

    afterAutorize: (userId) =>
        if !_.isNull(@$bar)
            @userId = userId

    initialize: =>
        chrome.runtime.onMessage.addListener (m) =>
            {userId} = m
            @afterAutorize(userId) if !_.isUndefined(userId) and !_.isNull(userId)

module.exports = Controller

