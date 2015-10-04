React = require 'react/addons'
_ = require 'underscore'

class Popup extends React.Component
    onAutorizeCallback: null

    constructor: (props) ->
        super(props)
        @state =
            isInitialize: no
            isAuth: no
            auth: {}
        _.extend(@, props)

    updateState: (state) =>
        state = _.extend
            isInitialize: no
            isAuth: no
            state
        @setState state

    onAutorize: => @onAutorizeCallback() if _.isFunction(@onAutorizeCallback)

    render: =>
        cx = React.addons.classSet
        popupClass = cx
            'furpage-plugin__popup--box': yes
        <div className={popupClass}>
            {!@state.isAuth && <button onClick={@onAutorize}>Авторизоваться</button>}
            {@state.isAuth && <div>
                Авторизован как: <strong>{@state.auth.id}</strong>
                <br />
                <br />
                <button onClick={@props.onDelete}>Удалить авторизацию</button>
            </div>}
        </div>

    @initialize: (parent, onAutorizeCallback, onDelete) ->
        React.render <Popup parent={parent}
                            onAutorizeCallback={onAutorizeCallback}
                            onDelete={onDelete}></Popup>, parent

module.exports = Popup