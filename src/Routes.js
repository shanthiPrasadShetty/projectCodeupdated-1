import React, { Component } from "react";
import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
  Redirect,
  IndexRedirect,
} from "react-router";
import { 
  Login,
  Dashboard,
  App
} from './containers';
import { privileges }  from './utils/config';
import statusChange from "./containers/Dashboard/statusChange";
import levelChange from "./containers/Dashboard/levelChange";
import ResetLevel from './containers/Dashboard/resetOutput';
import DeletePro from '../src/containers/Dashboard/deleteProject';
import DeleteUser from '../src/containers/Dashboard/deleteUser';
import Taskstatic from "./containers/Dashboard/taskstatic";

function requireAuth(nextState, replace, callback) {
  const token = localStorage.getItem('accessToken');
  const userInfo = localStorage.getItem("loggedInUser")
  const userId = localStorage.getItem("userId")
  alert("userId from router")
  const organisation = JSON.parse(localStorage.getItem('organisation'));
  if(!token || !userInfo) {
    localStorage.clear()
    const orgName = nextState.params.orgname
    
    if(organisation !=null){     
        replace(`/org/${organisation.name}/login`);
    }else if(orgName != undefined) {
        replace(`/org/${orgName}/login`);   
    }
    else {
      replace(`/login`);   
    }
  }
  callback()
}


function checkForLoggedIn(nextState, replace, callback){
  let loggedInUser = localStorage.getItem('userId')
  if(!loggedInUser){
    replace(`/login`);
  }
  
  callback()
}

export default (props) => {
  return (
    <Router history={props.history}>
       <Route path="/" component={App} onEnter={checkForLoggedIn}>
          <Route path='/Dashboard' component={Dashboard} />
          <Route path='/status' component={statusChange} />
          <Route path='/level' component={levelChange} />
          <Route path='/reset' component={ResetLevel} />
          <Route path='/deletepro' component={DeletePro} />
          <Route path='/taskstatic' component={Taskstatic} />
          <Route path='/deleteuser' component={DeleteUser} />
     </Route>   

      
      <Route path='/login' component={Login} />
      <Route path='*' component={Login} />
      
      
      
    </Router>
  );
};
