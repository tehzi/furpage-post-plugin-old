$ = require 'jquery'
Controller = require './controller/Controller'
DAController = require './controller/DAController'
FAController = require './controller/FAController'
PopupController = require './controller/PopupController'


$ ->
    new FAController if Controller.isFA()
    new DAController if Controller.isDA()
    new PopupController if Controller.isPopup()

module.exports = yes