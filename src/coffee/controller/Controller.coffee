$ = require 'jquery'
DAController = require './DAController'
FAController = require './FAController'

class Controller
    @isFA: () => new RegExp("htt(p|ps)://www.furaffinity.net/view/\\d+/").test(location.href)

    @isDA: () => new RegExp("(htt(p|ps)://\\S*\.deviantart\.com/art/\\S*)").test(location.href)

$ ->
    new FAController if Controller.isFA()
    new DAController if Controller.isDA()

module.exports = Controller