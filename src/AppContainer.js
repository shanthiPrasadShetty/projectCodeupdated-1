import React, { Component } from "react";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Router, Route, browserHistory, hashHistory } from "react-router";
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppStore from "./reducers";
import Routes from './Routes';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#000000',
  },
  raisedButton: {
    textTransform: 'uppercase',
  },
  radioButton: {
    borderColor: '#546E7A',
    checkedColor: '#546E7A',
  },
  textField: {
    fontFamily: 'proxima-nova',
    marginTop: '0px',
  },
  fontFamily: 'proxima-nova, sans-serif',
});

const configureStore = (initialState = {}) => {
  const middleware = [routerMiddleware(browserHistory), thunk];
  const composeEnhancers =
    global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(applyMiddleware(...middleware));
  const store = createStore(AppStore, enhancer);
  return store;
}

const history = syncHistoryWithStore(browserHistory, configureStore())

export default class AppContainer extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={configureStore()}>
            <Routes history={history}/>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
