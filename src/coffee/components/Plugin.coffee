class Plugin
    _plugin = null

    constructor: (plugin) ->
        _plugin = plugin

    exec: (id) =>
        chrome.tabs.insertCSS id, file: 'furpage-plugin.css'
        if _plugin.controller()
            chrome.tabs.executeScript id, file: _plugin.controller(), ->
                console.error chrome.runtime.lastError.message if chrome.runtime.lastError

    controller: => no

module.exports = Plugin