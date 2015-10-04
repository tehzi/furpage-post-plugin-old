Plugin =   require '../components/Plugin'
PluginFA = require '../components/PluginFA'
PluginDA = require '../components/PluginDA'
URI = require 'urijs'
_ = require 'underscore'

class Main
    complete: no
    clientId: 5085818
    port: null

    constructor: ->
        if not (typeof chrome == 'object')
            throw new Error "Can't find chrome object"
        this.initialize()

    isFA: (url) => new RegExp("htt(p|ps)://www.furaffinity.net/view/\\d+/").test(url)

    isDA: (url) => new RegExp("(htt(p|ps)://\\S*\.deviantart\.com/art/\\S*)").test(url)

    isBlank: (url) => url.indexOf('oauth.vk.com/blank.html') > -1

    initialize: =>
        chrome.tabs.onUpdated.addListener @onTabUpdate
        chrome.pageAction.onClicked.addListener @onActionClick

    afterComplete: (tab) =>
        closeId = tab.id
        # Авторизация пользователей в системе
        if @isBlank(tab.url)
            blankUrl = new URI(tab.url)
            auth = URI.parseQuery(blankUrl.fragment())
            chrome.storage.local.set(auth, ->)
            chrome.tabs.query {}, (tabs) =>
                _.each tabs, (tab) =>
                    if @isFA(tab.url) || @isDA(tab.url)
                        chrome.tabs.sendMessage(tab.id, userId: auth.user_id, ->)
                        chrome.tabs.remove(closeId, ->)
        @sendAutorize(tab)

    #### каждый раз отправляем сообщения с авторизацией, если она есть
    sendAutorize: (tab) =>
        if @isDA(tab.url) || @isFA(tab.url)
            chrome.storage.local.get 'user_id', (r) =>
                chrome.tabs.sendMessage(tab.id, userId: r.user_id, ->) if r.user_id

    onTabUpdate: (tabId, changeInfo, tab) =>
        @onTabComplete tabId, changeInfo, tab if changeInfo.status is 'complete'
        @onTabLoading  tabId, changeInfo, tab if changeInfo.status is 'loading'

    onTabComplete: (tabId, changeInfo, tab) =>
        @complete = yes
        if @isFA(tab.url) || @isDA(tab.url)
            chrome.pageAction.show tab.id
        else
            chrome.pageAction.hide tab.id
        @afterComplete(tab)

    onTabLoading: (tabId, changeInfo, tab) =>
        @complete = no
        setTimeout (=> @sendAutorize(tab)), 2000

    onActionClick: (tab) =>

main = new Main

module.exports = Main