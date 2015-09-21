React = require 'react/addons'
_ = require 'underscore'

class BarFA extends React.Component
    parent = null
    afterMount: null
    onAddCallback: null

    constructor: (props) ->
        super props
        @state =
            isLoad: yes
            canAdd: no
            isPublished: no
            inQueue: no
        _.extend @, props

    onAdd: => @props.onAddCallback()

    componentDidMount: => @afterMount(@) if _.isFunction @afterMount

    updateState: (state) =>
        state = _.extend
            isLoad: no
            canAdd: no
            isPublished: no
            inQueue: no,
            state
        @setState state

    render: =>
        cx = React.addons.classSet
        barClass = cx
            'furpage__fa': yes
            'furpage__fa__load':      @state.isLoad
            'furpage__fa__add':       @state.canAdd
            'furpage__fa__published': @state.isPublished
            'furpage__fa__queue':     @state.inQueue
        <div className={barClass} onClick={@state.canAdd && @onAdd}>
            {@state.isLoad &&      "# Загрука..."}
            {@state.canAdd &&      "+ Добавить в очередь"}
            {@state.isPublished && "++ Опубликовано"}
            {@state.inQueue &&     "- - - В очереди"}
        </div>

    @initialize: (parent, afterMount, onAddCallback) ->
        React.render <BarFA parent={parent} afterMount={afterMount} onAddCallback={onAddCallback}></BarFA>, parent

module.exports = BarFA