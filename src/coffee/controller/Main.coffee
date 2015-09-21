Plugin =   require '../components/Plugin'
PluginFA = require '../components/PluginFA'
PluginDA = require '../components/PluginDA'

class Main
    complete: no

    constructor: ->
        if not (typeof chrome == 'object')
            throw new Error "Can't find chrome object"
        this.initialize()

    isFA: (url) => new RegExp("htt(p|ps)://www.furaffinity.net/view/\\d+/").test url

    isDA: (url) => new RegExp("(htt(p|ps)://\\S*\.deviantart\.com/art/\\S*)").test url

    initialize: =>
        chrome.tabs.onUpdated.addListener @onTabUpdate

    afterComplete: (tab) =>
        plugin = new Plugin new PluginFA if @isFA(tab.url)
        plugin = new Plugin new PluginDA if @isDA(tab.url)
        if typeof plugin isnt 'undefined'
            plugin.exec tab.id

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

main = new Main

module.exports = Main