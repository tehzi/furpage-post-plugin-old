React = require 'react/addons'
BarFA = require './BarFA'
_ = require 'underscore'

class BarDA extends React.Component
    parent = null
    afterMount: null
    onAddCallback: null
    faElement: null

    constructor: (props) ->
        super props
        _.extend @, props

    updateState: (state) =>
        if !_.isNull @refs.barFa
            @refs.barFa.updateState state

    componentDidMount: =>
        # console.log @parent

    render: =>
        cx = React.addons.classSet
        barClass = cx
            'furpage__da': yes
        <div className={barClass} >
            <BarFA {...@props} ref="barFa"></BarFA>
        </div>

    @initialize: (parent, afterMount, onAddCallback) ->
        React.render <BarDA parent={parent} afterMount={afterMount} onAddCallback={onAddCallback}></BarDA>, parent

module.exports = BarDA