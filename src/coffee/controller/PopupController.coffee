$ = require 'jquery'
Popup = require '../views/Popup'
URI = require 'urijs'
Controller = require './Controller'
_ = require 'underscore'

class PopupController extends Controller
    popupWrapper: null
    popup: null
    clientId: 5085818

    constructor: -> @initialize()

    initialize: =>
        super()
        @popupWrapper = $('.furpage-plugin__popup')
        if @popupWrapper.length
            @popup = Popup.initialize(@popupWrapper.get(0), @onAutorize, @onDelete)
        chrome.storage.local.get 'user_id', (s) =>
            {user_id} = s
            if _.isString(user_id)
                @popup.updateState
                    auth: id: user_id
                    isAuth: yes

    onAutorize: =>
        uri = new URI("https://oauth.vk.com/authorize")
        uri.addQuery
            client_id: @clientId
            scope: "pages,wall,groups,offline,friends"
            redirect_uri: "https://oauth.vk.com/blank.html"
            response_type: "token"
        chrome.tabs.create (url: String(uri), selected: yes), (tab) ->

    onDelete: =>
        chrome.storage.local.remove ['user_id'], =>
            @popup.updateState
                auth: id: {}
                isAuth: no

    afterAutorize: (userId) =>
        super(userId)

module.exports = PopupController