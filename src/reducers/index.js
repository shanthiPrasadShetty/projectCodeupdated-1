import { createStore, combineReducers } from "redux";
import { CONSTANTS } from '../utils';
import { syncHistoryWithStore, routerReducer,  } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import loginReducer from './loginReducers';
import projectReducer from './projectReducers';
import userReducer from './UserReducers';
import organisationReducer from './OrganisationReducers';
import dashboard from './dashboard';

const appReducer= combineReducers({
    routing: routerReducer,
    form: formReducer,
    dashboard, 
    loginReducer,
    projectReducer,
    userReducer,
    organisationReducer
})

export default appReducer;
