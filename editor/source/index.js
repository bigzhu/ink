import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import App from './app'
import List from './components/list'
import Editor from './components/editor'
import Welcome from './components/welcome'
import { Router, Route, IndexRoute } from 'react-router'
import { syncReduxAndRouter } from 'redux-simple-router'
import history from './history'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(rootReducer)

if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers')
        store.replaceReducer(nextRootReducer)
    })
}

syncReduxAndRouter(history, store)

window.globalStore = store

ReactDom.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute components={{Welcome}}/>
                <Route path="/edit/:id" components={{Editor}}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)
