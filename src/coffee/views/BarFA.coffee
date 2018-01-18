React = require 'react/addons'
_ = require 'underscore'

class BarFA extends React.Component
    parent = null
    afterMount: null
    onAddCallback: null
    onAutorizeCallback: null

    constructor: (props) ->
        super props
        @state =
            isLoad: yes
            canAdd: no
            isPublished: no
            inQueue: no
            hasUserId: no
        _.extend(@, props)

    onAdd: => @props.onAddCallback() if _.isFunction(@props.onAddCallback)

    onAutorize: => @props.onAutorizeCallback() if _.isFunction(@props.onAutorizeCallback)

    componentDidMount: => @afterMount(@) if _.isFunction @afterMount

    updateState: (state) =>
        state = _.extend
            isLoad: no
            canAdd: no
            isPublished: no
            inQueue: no
            hasUserId: no
            state
        @setState state

    render: =>
        cx = React.addons.classSet
        barClass = cx
            'furpage__fa': yes
            'furpage__fa__autozation--bad': not @state.hasUserId
            'furpage__fa__load':      @state.hasUserId && @state.isLoad
            'furpage__fa__add':       @state.hasUserId && @state.canAdd
            'furpage__fa__published': @state.hasUserId && @state.isPublished
            'furpage__fa__queue':     @state.hasUserId && @state.inQueue
        <div className={barClass} onClick={ (=>
                                                @state.canAdd && @onAdd.apply(arguments)
                                                not @state.hasUserId && @onAutorize.apply(arguments))}>
            {not @state.hasUserId &&                   "[!] Вы не авторизованы"}
            {@state.hasUserId && @state.isLoad &&      "[#] Загрука..."}
            {@state.hasUserId && @state.canAdd &&      "[+] Добавить в очередь"}
            {@state.hasUserId && @state.isPublished && "[++] Опубликовано"}
            {@state.hasUserId && @state.inQueue &&     "[- - -] В очереди"}
        </div>

    @initialize: (parent, afterMount, onAddCallback, onAutorizeCallback) ->
        React.render <BarFA parent={parent}
                            afterMount={afterMount}
                            onAddCallback={onAddCallback}
                            onAutorizeCallback={onAutorizeCallback}></BarFA>, parent

module.exports = BarFA